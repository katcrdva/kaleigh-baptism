/**
 * =====================================================
 * KALEIGH BAPTISM — RSVP  →  GOOGLE SHEETS
 * =====================================================
 *
 * ONE-TIME SETUP (about 5 minutes)
 *
 * 1. Go to https://sheets.google.com and create a NEW blank sheet.
 *    Name it something like "Kaleigh Baptism RSVPs".
 *
 * 2. In that sheet, click:  Extensions  →  Apps Script
 *
 * 3. Delete everything in the editor and paste this whole file in.
 *    Click the Save icon.
 *
 * 4. Click  Deploy  →  New deployment
 *      - Click the gear icon next to "Select type"  →  Web app
 *      - Description:    RSVP form
 *      - Execute as:     Me
 *      - Who has access: Anyone
 *    Click Deploy. Google will ask you to authorize — allow it
 *    (choose your account → Advanced → "Go to project" → Allow).
 *
 * 5. Copy the "Web app URL" (it ends in /exec).
 *
 * 6. Open script.js on your website and paste that URL here:
 *
 *      const RSVP_ENDPOINT = "PASTE_YOUR_..._URL_HERE";
 *
 * 7. Commit + push to GitHub. Done!
 *
 * IF YOU EDIT THIS FILE LATER:
 * Deploy → Manage deployments → pencil icon → Version: "New version"
 * → Deploy. (The URL stays the same.)
 *
 * The first RSVP creates the "RSVPs" tab and its header row
 * automatically.
 * =====================================================
 */

var SHEET_NAME = "RSVPs";
var TIMEZONE = "Asia/Manila";

var HEADERS = [
  "Timestamp",
  "Name",
  "Adults",
  "Children",
  "Total Guests",
  "Attendance",
  "Message / Blessing"
];

var ALLOWED_ATTENDANCE = [
  "Joyfully Accepts",
  "Regretfully Declines"
];


function doPost(e) {

  var lock = LockService.getScriptLock();

  try {

    // Prevents two guests from overwriting each other's row
    lock.waitLock(10000);

    var p = (e && e.parameter) ? e.parameter : {};

    var name = clean_(p.name, 100);
    var attendance = clean_(p.attendance, 40);
    var message = clean_(p.message, 500);

    var adults = toCount_(p.adults);
    var children = toCount_(p.children);

    if (!name) {
      return json_({ result: "error", error: "Name is required." });
    }

    if (ALLOWED_ATTENDANCE.indexOf(attendance) === -1) {
      return json_({ result: "error", error: "Attendance is required." });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
      name,
      adults,
      children,
      adults + children,
      attendance,
      message
    ]);

    return json_({ result: "success" });

  } catch (err) {

    return json_({ result: "error", error: String(err) });

  } finally {

    lock.releaseLock();

  }

}


// Opening the Web App URL in a browser shows this — handy for testing.
function doGet() {
  return json_({ result: "ok", message: "RSVP endpoint is running." });
}


/* ---------- helpers ---------- */

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// Trim, cap length, and stop a guest's text from being run as a
// spreadsheet formula (anything starting with = + - @).
function clean_(value, maxLength) {

  var text = String(value == null ? "" : value).trim();

  if (text.length > maxLength) {
    text = text.substring(0, maxLength);
  }

  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }

  return text;

}

function toCount_(value) {

  var n = parseInt(value, 10);

  if (isNaN(n) || n < 0) return 0;
  if (n > 20) return 20;

  return n;

}
