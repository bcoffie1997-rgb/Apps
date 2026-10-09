/**
 * MISSED CALL PROS — Google Sheet CRM
 * Paste this into Extensions → Apps Script in your leads Google Sheet.
 * Every website form submission becomes a new row, and you get an email.
 */

// 1) Put the email address that should get a message for every new lead:
const NOTIFY_EMAIL = "you@example.com";

// 2) Name of the tab where leads go (created automatically if missing):
const SHEET_NAME = "Leads";

const HEADERS = [
  "Date", "Status", "Name", "Business", "Phone", "Email", "Plan",
  "Message", "Language", "Page", "OK to text", "Follow-up date", "Notes",
];
const STATUSES = ["New", "Contacted", "Preview sent", "Meeting set", "Won", "Lost"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents);
    const sheet = getSheet_();
    const when = new Date();
    sheet.appendRow([
      when,
      "New",
      d.name || "",
      d.businessName || "",
      d.phone ? "'" + d.phone : "",
      d.email || "",
      d.plan || "",
      d.message || "",
      d.lang === "es" ? "Spanish" : "English",
      d.page || "",
      d.smsConsent ? "Yes" : "No",
      "",
      "",
    ]);

    if (NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf("@") > 0 && NOTIFY_EMAIL !== "you@example.com") {
      const lines = [
        "New lead from missedcallpros.com",
        "",
        "Name: " + (d.name || ""),
        "Business: " + (d.businessName || ""),
        "Phone: " + (d.phone || ""),
        "Email: " + (d.email || ""),
        "Plan: " + (d.plan || ""),
        "Language: " + (d.lang === "es" ? "Spanish" : "English"),
        "OK to text: " + (d.smsConsent ? "Yes" : "No"),
        "Page: " + (d.page || ""),
        "",
        "Message:",
        d.message || "(none)",
        "",
        "Open your sheet: " + SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      ];
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "🔔 New lead: " + (d.businessName || d.name || "website form"),
        body: lines.join("\n"),
        replyTo: d.email || NOTIFY_EMAIL,
      });
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

// Visit the web app URL in a browser to check it's running.
function doGet() {
  return json_({ ok: true, message: "Missed Call Pros lead catcher is running." });
}

// Run this once from the editor (▶ Run) to set up the sheet and approve permissions.
function setup() {
  getSheet_();
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#0B0D12").setFontColor("#FFFFFF");
    sheet.setFrozenRows(1);
    sheet.getRange("A:A").setNumberFormat("mmm d, yyyy h:mm am/pm");
    sheet.getRange("L:L").setNumberFormat("mmm d, yyyy");
    const rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
    sheet.getRange(2, 2, 1000, 1).setDataValidation(rule);
    sheet.setColumnWidths(1, HEADERS.length, 140);
    sheet.setColumnWidth(8, 280);
    sheet.setColumnWidth(13, 280);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
