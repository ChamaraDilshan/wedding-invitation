// Paste this into the Apps Script editor bound to your Google Sheet
// (Extensions > Apps Script), then deploy it as a Web App.
// See the README for the full step-by-step.

const SHEET_NAME = 'RSVPs';
const SUMMARY_SHEET_NAME = 'Summary';

// Optional lightweight safeguard: set this to any private string, and set the
// same value as RSVP_SECRET in src/data/config.js, so the endpoint rejects
// requests that don't include it. Leave both blank to skip this.
const SHARED_SECRET = '';

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Status', 'Name', 'Guests', 'Greeting']);
  }
  return sheet;
}

function getSummarySheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SUMMARY_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SUMMARY_SHEET_NAME);
  }
  return sheet;
}

// Recomputes the cumulative summary from every row in the RSVPs sheet and
// writes it to the Summary sheet. Called after every new submission.
function updateSummary_() {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  const [, ...body] = rows; // drop header row

  let totalResponses = 0;
  let attendingYes = 0;
  let attendingNo = 0;
  let totalGuests = 0;
  let messagesLeft = 0;

  body.forEach(([, status, , guests, greeting]) => {
    if (!status) return; // skip blank rows
    totalResponses += 1;
    if (status === 'yes') {
      attendingYes += 1;
      totalGuests += Number(guests) || 0;
    } else if (status === 'no') {
      attendingNo += 1;
    }
    if (greeting && String(greeting).trim().length > 0) {
      messagesLeft += 1;
    }
  });

  const summarySheet = getSummarySheet_();
  summarySheet.clear();
  summarySheet.appendRow(['Metric', 'Value']);
  summarySheet.appendRow(['Total responses', totalResponses]);
  summarySheet.appendRow(['Attending (Yes)', attendingYes]);
  summarySheet.appendRow(['Not attending (No)', attendingNo]);
  summarySheet.appendRow(['Total guests (from Yes responses)', totalGuests]);
  summarySheet.appendRow(['Messages left', messagesLeft]);
  summarySheet.appendRow(['Last updated', new Date().toISOString()]);
  summarySheet.autoResizeColumns(1, 2);
}

// Handles the RSVP form submission (POST), appends a row, and refreshes
// the cumulative summary.
// Do not click Run on this function in the editor — there is no request
// body then, so e is undefined. Use manuallyRefreshSummary instead, or
// submit the RSVP form on the website after deploying as a Web App.
function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService
      .createTextOutput(JSON.stringify({
        ok: false,
        error: 'No POST body. Deploy as a Web App and submit the RSVP form; to refresh the Summary tab, run manuallyRefreshSummary.',
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const data = JSON.parse(e.postData.contents);

  if (SHARED_SECRET && data.secret !== SHARED_SECRET) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: 'unauthorized' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const sheet = getSheet_();
  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.status || '',
    data.name || '',
    data.guests || 0,
    data.greeting || '',
  ]);

  updateSummary_();

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Returns all RSVPs as JSON for the greetings loop (GET).
function doGet(e) {
  const sheet = getSheet_();
  const rows = sheet.getDataRange().getValues();
  const [header, ...body] = rows;

  const result = body.map((row) => {
    const entry = {};
    header.forEach((key, i) => {
      entry[String(key).toLowerCase()] = row[i];
    });
    return entry;
  });

  return ContentService
    .createTextOutput(JSON.stringify(result))
    .setMimeType(ContentService.MimeType.JSON);
}

// Run this once manually from the Apps Script editor (select this function,
// click Run) if you already have existing RSVPs and want the Summary sheet
// created/refreshed right away, without waiting for the next submission.
function manuallyRefreshSummary() {
  updateSummary_();
}
