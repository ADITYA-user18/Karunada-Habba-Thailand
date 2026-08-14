import fs from "fs";
import path from "path";

export interface InvitationRequest {
  id: string;
  full_name: string;
  phone: string;
  country_code: string;
  email: string;
  city_country: string;
  number_of_guests: number;
  invitation_status: "pending" | "confirmed" | "declined";
  marketing_consent: boolean;
  created_at: string;
  profession?: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "invitations.json");

// Ensure data directory and file exist
function initializeDb() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ invitation_requests: [] }, null, 2), "utf-8");
  }
}

export function getInvitations(): InvitationRequest[] {
  initializeDb();
  try {
    const rawData = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(rawData);
    return parsed.invitation_requests || [];
  } catch (error) {
    console.error("Error reading database:", error);
    return [];
  }
}

export function saveInvitations(invitations: InvitationRequest[]): boolean {
  initializeDb();
  try {
    const data = { invitation_requests: invitations };
    // Atomic write to prevent file corruption
    const tempFile = `${DB_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf-8");
    fs.renameSync(tempFile, DB_FILE);
    return true;
  } catch (error) {
    console.error("Error writing database:", error);
    return false;
  }
}

export function addInvitationRequest(
  request: Omit<InvitationRequest, "id" | "invitation_status" | "created_at">
): { success: boolean; data?: InvitationRequest; error?: string } {
  const invitations = getInvitations();

  // Validate fields
  if (!request.full_name || request.full_name.trim().length < 2) {
    return { success: false, error: "Full Name must be at least 2 characters." };
  }
  if (!request.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(request.email)) {
    return { success: false, error: "A valid Email Address is required." };
  }
  if (!request.phone || request.phone.trim().length < 5) {
    return { success: false, error: "A valid Phone Number is required." };
  }
  if (!request.city_country || request.city_country.trim().length < 2) {
    return { success: false, error: "City/Country must be specified." };
  }
  if (request.number_of_guests < 1 || request.number_of_guests > 10) {
    return { success: false, error: "Number of guests must be between 1 and 10." };
  }

  // Prevent spam/duplicate entries within a brief window or exact duplicates
  const emailLower = request.email.toLowerCase().trim();
  const phoneNormalized = request.phone.replace(/[\s\-\(\)]/g, "");
  
  const isDuplicate = invitations.some(
    (inv) =>
      inv.email.toLowerCase().trim() === emailLower &&
      inv.phone.replace(/[\s\-\(\)]/g, "") === phoneNormalized
  );

  if (isDuplicate) {
    return {
      success: false,
      error: "An invitation request with this email and phone number has already been received.",
    };
  }

  const newRequest: InvitationRequest = {
    ...request,
    id: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    invitation_status: "pending",
    created_at: new Date().toISOString(),
  };

  invitations.push(newRequest);
  const success = saveInvitations(invitations);

  if (success) {
    return { success: true, data: newRequest };
  } else {
    return { success: false, error: "Database save failed. Please try again." };
  }
}

export interface SheetConfig {
  spreadsheetId: string;
  accessToken: string | null;
  autoSync: boolean;
  lastSyncedAt: string | null;
}

const CONFIG_FILE = path.join(DATA_DIR, "sheet_config.json");

export function getSheetConfig(): SheetConfig {
  initializeDb();
  if (!fs.existsSync(CONFIG_FILE)) {
    return {
      spreadsheetId: "",
      accessToken: null,
      autoSync: false,
      lastSyncedAt: null,
    };
  }
  try {
    const rawData = fs.readFileSync(CONFIG_FILE, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Error reading sheet config:", error);
    return {
      spreadsheetId: "",
      accessToken: null,
      autoSync: false,
      lastSyncedAt: null,
    };
  }
}

export function saveSheetConfig(config: SheetConfig): boolean {
  initializeDb();
  try {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), "utf-8");
    return true;
  } catch (error) {
    console.error("Error saving sheet config:", error);
    return false;
  }
}

