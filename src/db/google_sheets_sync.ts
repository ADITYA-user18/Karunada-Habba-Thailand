import { InvitationRequest } from "./local_db.js";

/**
 * Creates a new Google Spreadsheet for the RSVPs.
 * @returns The created spreadsheet ID and URL.
 */
export async function createGoogleSpreadsheet(accessToken: string, title: string): Promise<{ id: string; url: string }> {
  const response = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        title: title || "Karunada Habba RSVPs (Thailand 2026)",
      },
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to create Google Spreadsheet:", errorBody);
    throw new Error(`Google Sheets API Error: ${response.statusText} (${response.status})`);
  }

  const data = await response.json();
  return {
    id: data.spreadsheetId,
    url: data.spreadsheetUrl,
  };
}

/**
 * Synchronizes the complete list of invitations to the Google Sheet.
 * This overwrites the sheet from A1 to ensure full state sync and prevent duplicates.
 */
export async function syncInvitationsToSheet(
  spreadsheetId: string,
  accessToken: string,
  invitations: InvitationRequest[]
): Promise<{ success: boolean; count: number }> {
  // Define sheet headers
  const headers = [
    "Invitation ID",
    "Full Name",
    "Country Code",
    "Phone Number",
    "Email Address",
    "City & Country",
    "Number of Guests",
    "Profession",
    "Status",
    "Marketing Consent",
    "Created At",
  ];

  // Map invitations to rows
  const rows = invitations.map((inv) => [
    inv.id,
    inv.full_name,
    inv.country_code,
    inv.phone,
    inv.email,
    inv.city_country,
    inv.number_of_guests,
    inv.profession || "Not Specified",
    inv.invitation_status.toUpperCase(),
    inv.marketing_consent ? "YES" : "NO",
    inv.created_at,
  ]);

  // Combined values (headers + rows)
  const values = [headers, ...rows];

  // We write to the first sheet starting from cell A1
  // We'll use a dynamic range or just "A1" as the start cell.
  // Google Sheets API PUT to values endpoint will overwrite matching dimensions.
  const range = "A1";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`;

  // First, let's clear the sheet to remove any trailing records if the list shrank
  const clearUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:Z10000:clear`;
  try {
    await fetch(clearUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  } catch (clearErr) {
    console.warn("Could not clear Google Sheet before sync:", clearErr);
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Failed to update Google Sheet:", errorBody);
    throw new Error(`Google Sheets API Error: ${response.statusText} (${response.status})`);
  }

  return {
    success: true,
    count: invitations.length,
  };
}

/**
 * Appends a single new invitation row to the connected Google Sheet (if configured and token is active).
 */
export async function appendInvitationToSheet(
  spreadsheetId: string,
  accessToken: string,
  inv: InvitationRequest
): Promise<boolean> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:append?valueInputOption=USER_ENTERED`;
  const row = [
    inv.id,
    inv.full_name,
    inv.country_code,
    inv.phone,
    inv.email,
    inv.city_country,
    inv.number_of_guests,
    inv.profession || "Not Specified",
    inv.invitation_status.toUpperCase(),
    inv.marketing_consent ? "YES" : "NO",
    inv.created_at,
  ];

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [row],
      }),
    });
    return response.ok;
  } catch (err) {
    console.error("Error appending to Google Sheet:", err);
    return false;
  }
}
