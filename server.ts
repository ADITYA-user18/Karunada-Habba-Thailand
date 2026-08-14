import express from "express";
import path from "path";
import crypto from "crypto";
import dotenv from "dotenv";
import Razorpay from "razorpay";
import { createServer as createViteServer } from "vite";
import {
  addInvitationRequest,
  getInvitations,
  getSheetConfig,
  saveSheetConfig,
  saveInvitations,
} from "./src/db/local_db.js";
import {
  createGoogleSpreadsheet,
  syncInvitationsToSheet,
  appendInvitationToSheet,
} from "./src/db/google_sheets_sync.js";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for body parsing
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ==========================================
  // RAZORPAY PAYMENT ENDPOINTS
  // ==========================================

  // Step 1: Create Razorpay Order
  const handleCreateOrder = async (req: express.Request, res: express.Response) => {
    try {
      const { amount, currency = "INR", receipt } = req.body;

      const keyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      if (!keyId || !keySecret) {
        console.error("Razorpay credentials missing:", { keyId: !!keyId, keySecret: !!keySecret });
        return res.status(401).json({
          success: false,
          error: "Razorpay credentials are not configured on the server.",
        });
      }

      const parsedAmount = Number(amount);
      if (!parsedAmount || isNaN(parsedAmount) || parsedAmount < 100) {
        return res.status(400).json({
          success: false,
          error: "Amount must be a valid number and at least 100 paise (₹1).",
        });
      }

      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      });

      const options = {
        amount: Math.round(parsedAmount),
        currency: String(currency || "INR").toUpperCase(),
        receipt: receipt ? String(receipt) : `rcpt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);

      return res.status(200).json({
        success: true,
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: keyId,
      });
    } catch (error: any) {
      console.error("Error creating Razorpay order:", error);
      return res.status(500).json({
        success: false,
        error: error?.message || "Failed to create Razorpay order.",
      });
    }
  };

  app.post("/api/create-order", handleCreateOrder);
  app.post("/api/razorpay/create-order", handleCreateOrder);

  // Step 3: Verify Razorpay Payment Signature
  const handleVerifyPayment = async (req: express.Request, res: express.Response) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return res.status(400).json({
          success: false,
          error: "Missing required verification fields (razorpay_order_id, razorpay_payment_id, razorpay_signature).",
        });
      }

      const keySecret = process.env.RAZORPAY_KEY_SECRET;
      if (!keySecret) {
        return res.status(500).json({
          success: false,
          error: "Razorpay secret key is not configured on the server.",
        });
      }

      // HMAC-SHA256 algorithm: order_id + "|" + payment_id, KEY_SECRET
      const body = `${razorpay_order_id}|${razorpay_payment_id}`;
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(body)
        .digest("hex");

      if (expectedSignature === razorpay_signature) {
        console.log(`Payment verified successfully for Order ${razorpay_order_id}, Payment ${razorpay_payment_id}`);
        return res.status(200).json({
          success: true,
          message: "Payment signature verified successfully.",
          order_id: razorpay_order_id,
          payment_id: razorpay_payment_id,
        });
      } else {
        console.warn(`Payment signature mismatch for Order ${razorpay_order_id}`);
        return res.status(400).json({
          success: false,
          error: "Invalid payment signature. Verification failed.",
        });
      }
    } catch (error: any) {
      console.error("Error verifying Razorpay payment signature:", error);
      return res.status(500).json({
        success: false,
        error: error?.message || "Internal server error during verification.",
      });
    }
  };

  app.post("/api/verify-payment", handleVerifyPayment);
  app.post("/api/razorpay/verify-payment", handleVerifyPayment);

  // API Route for submitting invitation requests
  app.post("/api/invite", async (req, res) => {
    try {
      const {
        full_name,
        phone,
        country_code,
        email,
        city_country,
        number_of_guests,
        marketing_consent,
        profession,
      } = req.body;

      if (!full_name || !phone || !country_code || !email || !city_country) {
        return res.status(400).json({
          success: false,
          error: "All fields (Name, Phone, Email, City/Country) are required.",
        });
      }

      const result = addInvitationRequest({
        full_name: String(full_name).trim(),
        phone: String(phone).trim(),
        country_code: String(country_code).trim(),
        email: String(email).trim(),
        city_country: String(city_country).trim(),
        number_of_guests: Number(number_of_guests) || 1,
        marketing_consent: Boolean(marketing_consent),
        profession: profession ? String(profession).trim() : undefined,
      });

      if (result.success && result.data) {
        // Attempt to auto-sync if Google Sheet is configured
        const config = getSheetConfig();
        if (config.spreadsheetId && config.accessToken && config.autoSync) {
          try {
            await appendInvitationToSheet(config.spreadsheetId, config.accessToken, result.data);
          } catch (syncErr) {
            console.warn("Auto-append to Google Sheet failed. Token may be expired.", syncErr);
          }
        }
        return res.status(201).json({ success: true, data: result.data });
      } else {
        return res.status(400).json({ success: false, error: result.error });
      }
    } catch (error) {
      console.error("Error in /api/invite:", error);
      return res.status(500).json({
        success: false,
        error: "An internal server error occurred. Please try again.",
      });
    }
  });

  // Admin Endpoints for Google Sheets & RSVP Management
  app.get("/api/admin/sheet-config", (req, res) => {
    const config = getSheetConfig();
    res.json(config);
  });

  app.post("/api/admin/sheet-config", async (req, res) => {
    const { spreadsheetId, accessToken, autoSync } = req.body;
    const currentConfig = getSheetConfig();
    const newConfig = {
      spreadsheetId: spreadsheetId !== undefined ? String(spreadsheetId).trim() : currentConfig.spreadsheetId,
      accessToken: accessToken !== undefined ? String(accessToken).trim() : currentConfig.accessToken,
      autoSync: autoSync !== undefined ? Boolean(autoSync) : currentConfig.autoSync,
      lastSyncedAt: currentConfig.lastSyncedAt,
    };

    saveSheetConfig(newConfig);

    // If a spreadsheetId and accessToken are provided, do an immediate sync of existing RSVPs
    if (newConfig.spreadsheetId && newConfig.accessToken) {
      try {
        const invitations = getInvitations();
        await syncInvitationsToSheet(newConfig.spreadsheetId, newConfig.accessToken, invitations);
        newConfig.lastSyncedAt = new Date().toISOString();
        saveSheetConfig(newConfig);
        return res.json({ success: true, message: "Sheet config updated and synchronized successfully.", config: newConfig });
      } catch (err: any) {
        return res.json({
          success: true,
          message: "Sheet config saved, but initial sync failed (token may be invalid/expired).",
          error: err.message,
          config: newConfig,
        });
      }
    }

    res.json({ success: true, config: newConfig });
  });

  app.post("/api/admin/create-sheet", async (req, res) => {
    const { accessToken, title } = req.body;
    if (!accessToken) {
      return res.status(400).json({ success: false, error: "OAuth access token is required." });
    }

    try {
      // 1. Create spreadsheet via Google API
      const sheetTitle = title || "Karunada Habba RSVPs (Thailand 2026)";
      const sheet = await createGoogleSpreadsheet(accessToken, sheetTitle);

      // 2. Sync all existing invitations
      const invitations = getInvitations();
      await syncInvitationsToSheet(sheet.id, accessToken, invitations);

      // 3. Save config
      const newConfig = {
        spreadsheetId: sheet.id,
        accessToken: accessToken,
        autoSync: true,
        lastSyncedAt: new Date().toISOString(),
      };
      saveSheetConfig(newConfig);

      res.status(201).json({
        success: true,
        spreadsheetId: sheet.id,
        spreadsheetUrl: sheet.url,
        message: `Successfully created sheet "${sheetTitle}" and synchronized ${invitations.length} entries.`,
      });
    } catch (err: any) {
      console.error("Failed to create and sync sheet:", err);
      res.status(500).json({ success: false, error: err.message || "Failed to create Google Sheet." });
    }
  });

  app.post("/api/admin/sync", async (req, res) => {
    const { accessToken } = req.body;
    const config = getSheetConfig();
    const token = accessToken || config.accessToken;

    if (!config.spreadsheetId) {
      return res.status(400).json({ success: false, error: "No connected Google Sheet found." });
    }
    if (!token) {
      return res.status(400).json({ success: false, error: "Please log in with Google to sync." });
    }

    try {
      const invitations = getInvitations();
      await syncInvitationsToSheet(config.spreadsheetId, token, invitations);

      // Update config lastSyncedAt and token
      config.lastSyncedAt = new Date().toISOString();
      if (accessToken) {
        config.accessToken = accessToken;
      }
      saveSheetConfig(config);

      res.json({ success: true, count: invitations.length, lastSyncedAt: config.lastSyncedAt });
    } catch (err: any) {
      console.error("Failed to sync sheet:", err);
      res.status(500).json({ success: false, error: err.message || "Sync failed. Your session may have expired." });
    }
  });

  app.get("/api/admin/invitations", (req, res) => {
    const invitations = getInvitations();
    res.json(invitations);
  });

  app.post("/api/admin/invitations/:id/status", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "confirmed", "declined"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status value." });
    }

    const invitations = getInvitations();
    const index = invitations.findIndex((inv) => inv.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: "Invitation request not found." });
    }

    invitations[index].invitation_status = status;
    const saveSuccess = saveInvitations(invitations);

    if (saveSuccess) {
      // Optional background sync if token is saved and sheet is linked
      const config = getSheetConfig();
      if (config.spreadsheetId && config.accessToken) {
        try {
          await syncInvitationsToSheet(config.spreadsheetId, config.accessToken, invitations);
          config.lastSyncedAt = new Date().toISOString();
          saveSheetConfig(config);
        } catch (err) {
          console.warn("Background sheet sync failed on status update:", err);
        }
      }
      res.json({ success: true, data: invitations[index] });
    } else {
      res.status(500).json({ success: false, error: "Failed to update status." });
    }
  });

  app.delete("/api/admin/invitations/:id", async (req, res) => {
    const { id } = req.params;
    const invitations = getInvitations();
    const index = invitations.findIndex((inv) => inv.id === id);

    if (index === -1) {
      return res.status(404).json({ success: false, error: "Invitation request not found." });
    }

    invitations.splice(index, 1);
    const saveSuccess = saveInvitations(invitations);

    if (saveSuccess) {
      // Optional background sync if token is saved and sheet is linked
      const config = getSheetConfig();
      if (config.spreadsheetId && config.accessToken) {
        try {
          await syncInvitationsToSheet(config.spreadsheetId, config.accessToken, invitations);
          config.lastSyncedAt = new Date().toISOString();
          saveSheetConfig(config);
        } catch (err) {
          console.warn("Background sheet sync failed on deletion:", err);
        }
      }
      res.json({ success: true, message: "Invitation request deleted successfully." });
    } else {
      res.status(500).json({ success: false, error: "Failed to delete request." });
    }
  });

  // Serve PDF Itinerary at /itinerary and /itinerary.pdf
  const handleServeItineraryPdf = (req: express.Request, res: express.Response) => {
    const pdfPath = path.join(process.cwd(), "src", "assets", "Karunaada_Habba_Complete_Package.pdf");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline; filename=Karunaada_Habba_Complete_Package.pdf");
    return res.sendFile(pdfPath);
  };

  app.get("/itinerary", handleServeItineraryPdf);
  app.get("/itinerary.pdf", handleServeItineraryPdf);
  app.get("/rajyotsava.com/itinerary", handleServeItineraryPdf);

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Vite development middleware vs Static Production files
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
