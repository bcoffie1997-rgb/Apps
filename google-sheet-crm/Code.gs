/**
 * MISSED CALL PROS — LIVE CRM
 *
 * Paste into your Google Sheet: Extensions → Apps Script. Then run "setup" once.
 * It builds 4 tabs: Leads, Activity Log, Dashboard, Settings.
 *
 * What updates by itself:
 *  - Date Added fills in when you type or paste a business name.
 *  - Tick "Contacted Today" → Last Contact = today, Touches +1, next follow-up set, logged in Activity Log.
 *  - Change Status → counts as a contact and is logged.
 *  - "Days Since…" and "Follow-Up Status" recalculate every day on their own.
 *  - Website form leads land in Leads automatically (after you deploy as a web app).
 *  - 8am email with today's follow-ups (optional — set NOTIFY_EMAIL).
 *
 * Safe to run "setup" again: it never deletes your leads.
 */

// Email for new website leads + the 8am follow-up list. Leave as is to turn emails off.
const NOTIFY_EMAIL = "you@example.com";
const TIMEZONE = "America/New_York";

const TAB = { leads: "Leads", log: "Activity Log", dash: "Dashboard", settings: "Settings" };

// ---- Leads columns (order matters; formulas reference these letters) ----
const COLS = [
  "Date Added",            // A  auto
  "Business Name",         // B
  "Contact Name",          // C
  "Phone",                 // D
  "Email",                 // E
  "Business Type",         // F  ▼
  "City",                  // G
  "Address",               // H
  "Has Website?",          // I  ▼
  "Source",                // J  ▼
  "Salesperson",           // K  ▼
  "Status",                // L  ▼
  "Plan",                  // M  ▼
  "✔ Contacted Today",     // N  checkbox
  "Next Follow-Up",        // O  date
  "Notes",                 // P
  "Preview Link",          // Q
  "Language",              // R  ▼
  "OK to Text",            // S  ▼
  "First Contact",         // T  auto
  "Last Contact",          // U  auto
  "Touches",               // V  auto
  "Days Since First Contact", // W formula
  "Days Since Last Contact",  // X formula
  "Follow-Up Status",      // Y  formula
  "Monthly Value",         // Z  formula
  "Days in Pipeline",      // AA formula
  "Last Updated",          // AB auto
];
const C = Object.fromEntries(COLS.map((h, i) => [h, i + 1]));
const FORMULA_COLS = [23, 24, 25, 26, 27];

const LISTS = {
  Status: ["New", "Contacted", "Preview Sent", "Meeting Set", "Proposal Sent", "Won", "Lost", "Not Interested"],
  Salespeople: ["Salesperson 1"],
  "Business Types": ["Barbershop", "Hair Salon", "Nail Salon", "Auto Repair", "Restaurant", "Contractor", "Cleaning", "Landscaping", "Other"],
  Sources: ["Door-to-door", "Website form", "Google Maps", "Referral", "Phone", "Social media", "Other"],
};
const PLANS = [["Basic", 147], ["Growth", 497], ["Busy", 997], ["Website Only", 0]];
const CLOSED = ["Won", "Lost", "Not Interested"];
const STATUS_COLORS = {
  "New": "#DCEBFF", "Contacted": "#FFF4C2", "Preview Sent": "#EADCFF", "Meeting Set": "#FFE0C2",
  "Proposal Sent": "#C9F2EC", "Won": "#B7F5D3", "Lost": "#E5E7EB", "Not Interested": "#E5E7EB",
};

// =====================================================================
// SETUP — run once (and again any time; it won't touch your data)
// =====================================================================
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.setSpreadsheetTimeZone(TIMEZONE);
  ss.setRecalculationInterval(SpreadsheetApp.RecalculationInterval.HOUR);

  const settings = buildSettings_(ss);
  const leads = buildLeads_(ss, settings);
  buildLog_(ss, settings);
  buildDashboard_(ss);

  // Remove the empty default tab.
  const s1 = ss.getSheetByName("Sheet1");
  if (s1 && s1.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s1);

  // Daily 8am follow-up email.
  ScriptApp.getProjectTriggers()
    .filter((t) => t.getHandlerFunction() === "dailyDigest")
    .forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger("dailyDigest").timeBased().atHour(8).everyDays(1).inTimezone(TIMEZONE).create();

  ss.setActiveSheet(leads);
  SpreadsheetApp.getActive().toast("CRM is ready. Add a business name in Leads to start.", "Missed Call Pros", 8);
}

function buildSettings_(ss) {
  const sh = getOrCreate_(ss, TAB.settings);
  if (sh.getRange("A1").getValue() === "") {
    const headers = ["Status", "Salespeople", "Business Types", "Sources", "Plan", "Monthly $", "", "Setting", "Value"];
    sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    const write = (col, arr) => sh.getRange(2, col, arr.length, 1).setValues(arr.map((v) => [v]));
    write(1, LISTS.Status);
    write(2, LISTS.Salespeople);
    write(3, LISTS["Business Types"]);
    write(4, LISTS.Sources);
    sh.getRange(2, 5, PLANS.length, 2).setValues(PLANS);
    sh.getRange(2, 8, 1, 2).setValues([["Days until next follow-up", 3]]);
    sh.getRange("A1:I1").setFontWeight("bold").setBackground("#0B0D12").setFontColor("#FFFFFF");
    sh.setFrozenRows(1);
    sh.setColumnWidths(1, 9, 160);
    sh.getRange("F2:F20").setNumberFormat("$#,##0");
    sh.getRange("H4").setValue("Add your salespeople in column B. Dropdowns update automatically.")
      .setFontColor("#6B7280").setFontStyle("italic");
  }
  sh.setTabColor("#9CA3AF");
  return sh;
}

function buildLeads_(ss, settings) {
  const sh = getOrCreate_(ss, TAB.leads);
  ensureRows_(sh, 1000);
  ensureCols_(sh, COLS.length);

  // Headers (plain + live formulas that fill the whole column)
  sh.getRange(1, 1, 1, COLS.length).setValues([COLS]);
  const f = {
    23: '={"Days Since First Contact";ARRAYFORMULA(IF(T2:T="","",TODAY()-INT(T2:T)))}',
    24: '={"Days Since Last Contact";ARRAYFORMULA(IF(U2:U="","",TODAY()-INT(U2:U)))}',
    25: '={"Follow-Up Status";ARRAYFORMULA(IF(B2:B="","",IF(REGEXMATCH(L2:L,"^(Won|Lost|Not Interested)$"),"Closed",IF(O2:O="","No date set",IF(INT(O2:O)<TODAY(),"OVERDUE",IF(INT(O2:O)=TODAY(),"Due today","Upcoming"))))))}',
    26: '={"Monthly Value";ARRAYFORMULA(IF(M2:M="","",IFERROR(VLOOKUP(M2:M,Settings!$E$2:$F$20,2,FALSE),"")))}',
    27: '={"Days in Pipeline";ARRAYFORMULA(IF(A2:A="","",TODAY()-INT(A2:A)))}',
  };
  Object.entries(f).forEach(([col, formula]) => sh.getRange(1, Number(col)).setFormula(formula));

  // Header look
  sh.setFrozenRows(1);
  sh.setFrozenColumns(2);
  sh.getRange(1, 1, 1, COLS.length).setFontWeight("bold").setFontColor("#FFFFFF").setBackground("#0B0D12")
    .setWrap(true).setVerticalAlignment("middle");
  sh.getRange(1, C["First Contact"], 1, 9).setBackground("#1F2937"); // auto/formula columns: darker
  sh.getRange(1, C["✔ Contacted Today"]).setBackground("#22E58B").setFontColor("#0B0D12");
  sh.setRowHeight(1, 44);

  // Widths
  const widths = [110, 190, 140, 120, 180, 120, 120, 200, 100, 120, 120, 125, 105, 95, 115, 260, 160, 90, 80, 110, 110, 70, 95, 95, 115, 90, 85, 140];
  widths.forEach((w, i) => sh.setColumnWidth(i + 1, w));

  // Formats
  const n = sh.getMaxRows() - 1;
  sh.getRange(2, C["Date Added"], n, 1).setNumberFormat("mmm d, yyyy");
  sh.getRange(2, C["Phone"], n, 1).setNumberFormat("@");
  sh.getRange(2, C["Next Follow-Up"], n, 1).setNumberFormat("ddd mmm d");
  sh.getRange(2, C["First Contact"], n, 2).setNumberFormat("mmm d, yyyy");
  sh.getRange(2, C["Monthly Value"], n, 1).setNumberFormat("$#,##0");
  sh.getRange(2, C["Last Updated"], n, 1).setNumberFormat("mmm d, h:mm am/pm");
  sh.getRange(2, C["Touches"], n, 1).setHorizontalAlignment("center");
  sh.getRange(2, 23, n, 5).setHorizontalAlignment("center");
  sh.getRange(2, C["Notes"], n, 1).setWrap(true);

  // Dropdowns + checkbox + date picker
  const list = (col) => SpreadsheetApp.newDataValidation().requireValueInRange(settings.getRange(2, col, 30, 1), true).setAllowInvalid(true).build();
  const fixed = (vals) => SpreadsheetApp.newDataValidation().requireValueInList(vals, true).setAllowInvalid(true).build();
  sh.getRange(2, C["Status"], n, 1).setDataValidation(list(1));
  sh.getRange(2, C["Salesperson"], n, 1).setDataValidation(list(2));
  sh.getRange(2, C["Business Type"], n, 1).setDataValidation(list(3));
  sh.getRange(2, C["Source"], n, 1).setDataValidation(list(4));
  sh.getRange(2, C["Plan"], n, 1).setDataValidation(list(5));
  sh.getRange(2, C["Has Website?"], n, 1).setDataValidation(fixed(["No website", "Outdated", "Has one"]));
  sh.getRange(2, C["Language"], n, 1).setDataValidation(fixed(["English", "Spanish"]));
  sh.getRange(2, C["OK to Text"], n, 1).setDataValidation(fixed(["Yes", "No"]));
  sh.getRange(2, C["✔ Contacted Today"], n, 1).insertCheckboxes();
  sh.getRange(2, C["Next Follow-Up"], n, 1).setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(true).build());

  // Colors that change on their own
  const rules = [];
  const statusRange = sh.getRange(2, C["Status"], n, 1);
  Object.entries(STATUS_COLORS).forEach(([status, color]) =>
    rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo(status).setBackground(color).setRanges([statusRange]).build()));
  const fu = sh.getRange(2, C["Follow-Up Status"], n, 1);
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("OVERDUE").setBackground("#FECACA").setFontColor("#991B1B").setBold(true).setRanges([fu]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Due today").setBackground("#FDE68A").setFontColor("#92400E").setBold(true).setRanges([fu]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenTextEqualTo("Closed").setFontColor("#9CA3AF").setRanges([fu]).build());
  const since = sh.getRange(2, C["Days Since Last Contact"], n, 1);
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberGreaterThanOrEqualTo(7).setBackground("#FECACA").setFontColor("#991B1B").setRanges([since]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule().whenNumberBetween(3, 6).setBackground("#FEF3C7").setRanges([since]).build());
  // Whole row goes grey when the deal is closed
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=OR($L2="Lost",$L2="Not Interested")').setFontColor("#9CA3AF").setRanges([sh.getRange(2, 1, n, 19)]).build());
  rules.push(SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$L2="Won"').setBackground("#F0FDF4").setRanges([sh.getRange(2, 1, n, 13)]).build());
  sh.setConditionalFormatRules(rules);

  // Warn before anyone types over automatic columns
  sh.getProtections(SpreadsheetApp.ProtectionType.RANGE).forEach((p) => p.getDescription() === "auto" && p.remove());
  const prot = sh.getRange(1, 23, sh.getMaxRows(), 5).protect().setDescription("auto");
  prot.setWarningOnly(true);

  sh.setTabColor("#22E58B");
  return sh;
}

function buildLog_(ss, settings) {
  const sh = getOrCreate_(ss, TAB.log);
  ensureRows_(sh, 2000);
  if (sh.getRange("A1").getValue() === "") {
    sh.getRange(1, 1, 1, 5).setValues([["Date", "Business Name", "Salesperson", "Type", "Notes"]]);
  }
  sh.getRange("A1:E1").setFontWeight("bold").setBackground("#0B0D12").setFontColor("#FFFFFF");
  sh.setFrozenRows(1);
  [130, 200, 130, 130, 420].forEach((w, i) => sh.setColumnWidth(i + 1, w));
  const n = sh.getMaxRows() - 1;
  sh.getRange(2, 1, n, 1).setNumberFormat("mmm d, yyyy h:mm am/pm");
  sh.getRange(2, 5, n, 1).setWrap(true);
  const leads = ss.getSheetByName(TAB.leads);
  sh.getRange(2, 2, n, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(leads.getRange("B2:B"), true).setAllowInvalid(true).build());
  sh.getRange(2, 3, n, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInRange(settings.getRange("B2:B31"), true).setAllowInvalid(true).build());
  sh.getRange(2, 4, n, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(["Visit", "Call", "Text", "Email", "Meeting", "Status change", "Website form"], true).setAllowInvalid(true).build());
  sh.setTabColor("#60A5FA");
}

function buildDashboard_(ss) {
  const sh = getOrCreate_(ss, TAB.dash);
  sh.clear();
  sh.clearConditionalFormatRules();
  ensureCols_(sh, 12);
  ensureRows_(sh, 120);
  sh.setHiddenGridlines(true);
  sh.setColumnWidths(1, 12, 120);
  sh.setColumnWidth(1, 190);

  sh.getRange("A1").setValue("Missed Call Pros — Sales Dashboard").setFontSize(18).setFontWeight("bold");
  sh.getRange("A2").setFormula('="Live · updated "&TEXT(NOW(),"ddd mmm d, h:mm am/pm")').setFontColor("#6B7280");

  // KPI tiles
  const kpis = [
    ["Total Leads", '=COUNTA(Leads!B2:B)', "0"],
    ["Added This Week", '=COUNTIFS(Leads!A2:A,">="&(TODAY()-WEEKDAY(TODAY(),2)+1))', "0"],
    ["Due Today", '=COUNTIF(Leads!Y2:Y,"Due today")', "0"],
    ["Overdue", '=COUNTIF(Leads!Y2:Y,"OVERDUE")', "0"],
    ["Contacted (7 days)", '=COUNTIFS(Leads!U2:U,">="&(TODAY()-6))', "0"],
    ["Won Clients", '=COUNTIF(Leads!L2:L,"Won")', "0"],
    ["Monthly Recurring", '=SUMIFS(Leads!Z2:Z,Leads!L2:L,"Won")', "$#,##0"],
    ["Open Pipeline /mo", '=SUMIFS(Leads!Z2:Z,Leads!L2:L,"<>Won",Leads!L2:L,"<>Lost",Leads!L2:L,"<>Not Interested",Leads!B2:B,"<>")', "$#,##0"],
    ["Win Rate", '=IFERROR(COUNTIF(Leads!L2:L,"Won")/(COUNTIF(Leads!L2:L,"Won")+COUNTIF(Leads!L2:L,"Lost")+COUNTIF(Leads!L2:L,"Not Interested")),0)', "0%"],
  ];
  kpis.forEach(([label, formula, fmt], i) => {
    const col = i + 1 + (i >= 0 ? 0 : 0);
    sh.getRange(4, col).setValue(label).setFontSize(9).setFontColor("#6B7280").setFontWeight("bold").setWrap(true);
    sh.getRange(5, col).setFormula(formula).setNumberFormat(fmt).setFontSize(22).setFontWeight("bold");
  });
  sh.getRange(4, 1, 2, kpis.length).setBackground("#F5F6F8").setHorizontalAlignment("left");
  sh.getRange(5, 4).setFontColor("#B91C1C");
  sh.getRange(5, 3).setFontColor("#B45309");
  sh.getRange(5, 7).setFontColor("#047857");
  sh.setRowHeight(5, 44);

  // Pipeline by status
  section_(sh, "A8", "Pipeline by status");
  sh.getRange("A9:B9").setValues([["Status", "Leads"]]);
  sh.getRange("A10").setFormula('=FILTER(Settings!A2:A30,Settings!A2:A30<>"")');
  sh.getRange("B10").setFormula('=ARRAYFORMULA(IF(A10:A30="","",COUNTIF(Leads!L2:L,A10:A30)))');

  // By salesperson
  section_(sh, "D8", "By salesperson");
  sh.getRange("D9:H9").setValues([["Salesperson", "Leads", "Contacted (7 days)", "Overdue", "Won"]]);
  sh.getRange("D10").setFormula('=FILTER(Settings!B2:B30,Settings!B2:B30<>"")');
  sh.getRange("E10").setFormula('=ARRAYFORMULA(IF(D10:D30="","",COUNTIF(Leads!K2:K,D10:D30)))');
  sh.getRange("F10").setFormula('=ARRAYFORMULA(IF(D10:D30="","",COUNTIFS(Leads!K2:K,D10:D30,Leads!U2:U,">="&(TODAY()-6))))');
  sh.getRange("G10").setFormula('=ARRAYFORMULA(IF(D10:D30="","",COUNTIFS(Leads!K2:K,D10:D30,Leads!Y2:Y,"OVERDUE")))');
  sh.getRange("H10").setFormula('=ARRAYFORMULA(IF(D10:D30="","",COUNTIFS(Leads!K2:K,D10:D30,Leads!L2:L,"Won")))');

  // Follow-ups
  section_(sh, "A33", "Call these today (overdue first)");
  sh.getRange("A34:F34").setValues([["Business", "Phone", "Salesperson", "Status", "Follow-Up", "Days Since Contact"]]);
  sh.getRange("A35").setFormula('=IFERROR(SORT(FILTER({Leads!B2:B,Leads!D2:D,Leads!K2:K,Leads!L2:L,Leads!O2:O,Leads!X2:X},(Leads!Y2:Y="OVERDUE")+(Leads!Y2:Y="Due today")),5,TRUE),"Nothing due today")');
  sh.getRange("E35:E80").setNumberFormat("ddd mmm d");

  // Going cold
  section_(sh, "H33", "Going cold (7+ days, still open)");
  sh.getRange("H34:K34").setValues([["Business", "Phone", "Salesperson", "Days Since Contact"]]);
  sh.getRange("H35").setFormula('=IFERROR(SORT(FILTER({Leads!B2:B,Leads!D2:D,Leads!K2:K,Leads!X2:X},Leads!X2:X>=7,Leads!Y2:Y<>"Closed",Leads!B2:B<>""),4,FALSE),"No cold leads")');

  [["A9:B9"], ["D9:H9"], ["A34:F34"], ["H34:K34"]].forEach(([r]) =>
    sh.getRange(r).setFontWeight("bold").setBackground("#0B0D12").setFontColor("#FFFFFF"));
  sh.setTabColor("#0B0D12");
  ss.setActiveSheet(sh);
  ss.moveActiveSheet(1);
}

// =====================================================================
// LIVE UPDATES — runs automatically whenever someone edits the sheet
// =====================================================================
function onEdit(e) {
  if (!e || !e.range) return;
  const sh = e.range.getSheet();
  const name = sh.getName();
  if (name === TAB.leads) return onLeadsEdit_(e, sh);
  if (name === TAB.log) return onLogEdit_(e, sh);
}

function onLeadsEdit_(e, sh) {
  const r = e.range;
  const firstRow = Math.max(2, r.getRow());
  const lastRow = r.getLastRow();
  if (lastRow < 2) return;
  const c1 = r.getColumn();
  const c2 = r.getLastColumn();
  const touched = (col) => col >= c1 && col <= c2;
  const now = new Date();
  const width = COLS.length;
  const rows = sh.getRange(firstRow, 1, lastRow - firstRow + 1, width).getValues();
  const followDays = followUpDays_();
  const logRows = [];
  // Bulk columns are written in one go at the end (fast for big pastes).
  const added = rows.map((row) => [row[C["Date Added"] - 1]]);
  const status = rows.map((row) => [row[C["Status"] - 1]]);
  const updated = rows.map((row) => [row[C["Last Updated"] - 1]]);

  rows.forEach((row, i) => {
    const rowNum = firstRow + i;
    const v = (h) => row[C[h] - 1];
    const set = (h, val) => sh.getRange(rowNum, C[h]).setValue(val);
    if (!v("Business Name")) return;

    if (!v("Date Added")) added[i][0] = now;
    if (!v("Status")) status[i][0] = "New";
    updated[i][0] = now;

    let contacted = false;
    let note = "";
    if (touched(C["✔ Contacted Today"]) && v("✔ Contacted Today") === true) {
      contacted = true;
      note = "Contacted";
      set("✔ Contacted Today", false);
      if (!v("Status") || v("Status") === "New") status[i][0] = "Contacted";
    }
    if (touched(C["Status"]) && r.getNumRows() === 1 && e.oldValue !== e.value && v("Status") && v("Status") !== "New") {
      contacted = true;
      note = "Status → " + v("Status");
    }

    if (contacted) {
      const today = startOfDay_(now);
      set("Last Contact", today);
      if (!v("First Contact")) set("First Contact", today);
      set("Touches", (Number(v("Touches")) || 0) + 1);
      const fu = v("Next Follow-Up");
      if (CLOSED.indexOf(v("Status")) === -1 && (!fu || startOfDay_(new Date(fu)) <= today)) {
        set("Next Follow-Up", addDays_(today, followDays));
      }
      logRows.push([now, v("Business Name"), v("Salesperson"), note.indexOf("Status") === 0 ? "Status change" : "Visit", note + (v("Notes") ? " — " + v("Notes") : "")]);
    }
  });

  const n = rows.length;
  sh.getRange(firstRow, C["Date Added"], n, 1).setValues(added);
  sh.getRange(firstRow, C["Status"], n, 1).setValues(status);
  sh.getRange(firstRow, C["Last Updated"], n, 1).setValues(updated);
  if (logRows.length) appendLog_(logRows);
}

// Someone typed a contact into Activity Log by hand → update that lead.
function onLogEdit_(e, sh) {
  const row = e.range.getRow();
  if (row < 2 || e.range.getNumRows() > 1) return;
  const vals = sh.getRange(row, 1, 1, 5).getValues()[0];
  if (!vals[1] || !vals[3]) return;
  if (!vals[0]) sh.getRange(row, 1).setValue(new Date());
  if (e.range.getColumn() !== 4 && e.range.getColumn() !== 2) return;

  const leads = SpreadsheetApp.getActive().getSheetByName(TAB.leads);
  const last = lastDataRow_(leads);
  if (last < 2) return;
  const names = leads.getRange(2, C["Business Name"], last - 1, 1).getValues().map((r) => String(r[0]).trim().toLowerCase());
  const idx = names.indexOf(String(vals[1]).trim().toLowerCase());
  if (idx === -1) return;
  const rowNum = idx + 2;
  const today = startOfDay_(new Date());
  const get = (h) => leads.getRange(rowNum, C[h]).getValue();
  leads.getRange(rowNum, C["Last Contact"]).setValue(today);
  if (!get("First Contact")) leads.getRange(rowNum, C["First Contact"]).setValue(today);
  leads.getRange(rowNum, C["Touches"]).setValue((Number(get("Touches")) || 0) + 1);
  if (get("Status") === "New" || !get("Status")) leads.getRange(rowNum, C["Status"]).setValue("Contacted");
  const fu = get("Next Follow-Up");
  if (CLOSED.indexOf(get("Status")) === -1 && (!fu || startOfDay_(new Date(fu)) <= today)) {
    leads.getRange(rowNum, C["Next Follow-Up"]).setValue(addDays_(today, followUpDays_()));
  }
  leads.getRange(rowNum, C["Last Updated"]).setValue(new Date());
}

// =====================================================================
// WEBSITE FORM → new lead (deploy as Web app, see README)
// =====================================================================
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    const d = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(TAB.leads);
    if (!sh) { setup(); sh = ss.getSheetByName(TAB.leads); }
    const now = new Date();
    const row = new Array(22).fill("");
    row[C["Date Added"] - 1] = now;
    row[C["Business Name"] - 1] = d.businessName || d.name || "Website lead";
    row[C["Contact Name"] - 1] = d.name || "";
    row[C["Phone"] - 1] = d.phone || "";
    row[C["Email"] - 1] = d.email || "";
    row[C["Source"] - 1] = "Website form";
    row[C["Status"] - 1] = "New";
    row[C["Plan"] - 1] = planName_(d.plan);
    row[C["✔ Contacted Today"] - 1] = false;
    row[C["Next Follow-Up"] - 1] = startOfDay_(now); // reply the same day
    row[C["Notes"] - 1] = [d.message, d.plan && !planName_(d.plan) ? "Interested in: " + d.plan : "", d.page ? "Form: " + d.page : ""].filter(Boolean).join(" · ");
    row[C["Language"] - 1] = d.lang === "es" ? "Spanish" : "English";
    row[C["OK to Text"] - 1] = d.smsConsent ? "Yes" : "No";
    const r = lastDataRow_(sh) + 1;
    sh.getRange(r, 1, 1, 22).setValues([row]);
    sh.getRange(r, C["Last Updated"]).setValue(now);
    appendLog_([[now, row[1], "", "Website form", "Submitted the website form" + (d.message ? ": " + d.message : "")]]);

    if (emailOn_()) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: "🔔 New lead: " + row[1],
        body: [
          "New lead from missedcallpros.com", "",
          "Business: " + row[1], "Name: " + (d.name || ""), "Phone: " + (d.phone || ""), "Email: " + (d.email || ""),
          "Plan: " + (d.plan || ""), "Language: " + row[C["Language"] - 1], "OK to text: " + row[C["OK to Text"] - 1], "",
          "Message: " + (d.message || "(none)"), "", "Open the CRM: " + ss.getUrl(),
        ].join("\n"),
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

function doGet() {
  return json_({ ok: true, message: "Missed Call Pros CRM is running." });
}

// =====================================================================
// 8AM EMAIL — today's follow-ups
// =====================================================================
function dailyDigest() {
  if (!emailOn_()) return;
  const ss = SpreadsheetApp.getActive();
  const sh = ss.getSheetByName(TAB.leads);
  const last = lastDataRow_(sh);
  if (last < 2) return;
  const data = sh.getRange(2, 1, last - 1, COLS.length).getValues();
  const pick = (status) => data.filter((r) => r[C["Follow-Up Status"] - 1] === status);
  const line = (r) => "• " + r[C["Business Name"] - 1] + " — " + (r[C["Phone"] - 1] || "no phone") +
    " (" + (r[C["Salesperson"] - 1] || "unassigned") + ", " + r[C["Status"] - 1] + ", last contact " +
    (r[C["Days Since Last Contact"] - 1] === "" ? "never" : r[C["Days Since Last Contact"] - 1] + " days ago") + ")";
  const overdue = pick("OVERDUE");
  const today = pick("Due today");
  if (!overdue.length && !today.length) return;
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: "📋 Follow-ups today: " + (overdue.length + today.length),
    body: [
      overdue.length ? "OVERDUE (" + overdue.length + ")\n" + overdue.map(line).join("\n") : "",
      today.length ? "DUE TODAY (" + today.length + ")\n" + today.map(line).join("\n") : "",
      "", "Open the CRM: " + ss.getUrl(),
    ].filter(Boolean).join("\n\n"),
  });
}

// =====================================================================
// helpers
// =====================================================================
function appendLog_(rows) {
  const log = SpreadsheetApp.getActive().getSheetByName(TAB.log);
  if (!log) return;
  let r = 1;
  const colA = log.getRange("B:B").getValues();
  for (let i = colA.length - 1; i >= 0; i--) if (colA[i][0] !== "") { r = i + 1; break; }
  log.getRange(r + 1, 1, rows.length, 5).setValues(rows);
}

function lastDataRow_(sh) {
  const vals = sh.getRange(1, C["Business Name"], sh.getMaxRows(), 1).getValues();
  for (let i = vals.length - 1; i >= 0; i--) if (vals[i][0] !== "") return i + 1;
  return 1;
}

function planName_(label) {
  const s = String(label || "").toLowerCase();
  if (s.indexOf("basic") > -1 || s.indexOf("básico") > -1) return "Basic";
  if (s.indexOf("growth") > -1 || s.indexOf("crecimiento") > -1) return "Growth";
  if (s.indexOf("busy") > -1 || s.indexOf("ocupado") > -1) return "Busy";
  if (s.indexOf("website only") > -1 || s.indexOf("solo la página") > -1) return "Website Only";
  return "";
}

function followUpDays_() {
  const s = SpreadsheetApp.getActive().getSheetByName(TAB.settings);
  const v = s ? Number(s.getRange("I2").getValue()) : 3;
  return v > 0 ? v : 3;
}

function emailOn_() {
  return NOTIFY_EMAIL && NOTIFY_EMAIL.indexOf("@") > 0 && NOTIFY_EMAIL !== "you@example.com";
}

function startOfDay_(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function addDays_(d, n) {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

function getOrCreate_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function ensureRows_(sh, n) {
  if (sh.getMaxRows() < n) sh.insertRowsAfter(sh.getMaxRows(), n - sh.getMaxRows());
}

function ensureCols_(sh, n) {
  if (sh.getMaxColumns() < n) sh.insertColumnsAfter(sh.getMaxColumns(), n - sh.getMaxColumns());
}

function section_(sh, a1, title) {
  sh.getRange(a1).setValue(title).setFontSize(12).setFontWeight("bold");
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
