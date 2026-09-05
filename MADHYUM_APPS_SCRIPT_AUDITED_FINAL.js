/*******************************************************
 * MADHYUM GROUP
 * Inquiry Management System
 *
 * Backend:
 * Google Apps Script + Google Sheets
 *******************************************************/

const SHEET_NAME = "INQUIRIES";
const VISITORS_SHEET_NAME = "VISITORS";
const MAX_DETAILS_LENGTH = 5000;
const MAX_SOURCE_LENGTH = 200;
const MAX_TEXT_LENGTH = 500;

function doGet(e) {
  try {
    const action = e && e.parameter ? cleanValue(e.parameter.action) : "";
    let result;

    if (action === "stats") {
      result = getHomepageStats(e);
    } else {
      result = {
        success: true,
        message: "MADHYUM Inquiry System API is running."
      };
    }

    const callback =
      e && e.parameter && e.parameter.callback
        ? cleanValue(e.parameter.callback)
        : "";

    if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      const jsonData =
        result && typeof result.getContent === "function"
          ? JSON.parse(result.getContent())
          : result;

      return ContentService
        .createTextOutput(
          callback + "(" + JSON.stringify(jsonData) + ");"
        )
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }

    if (result && typeof result.getContent === "function") {
      return result;
    }

    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}

function getHomepageStats(e) {
  try {
    const visitorId =
      e && e.parameter && e.parameter.visitorId
        ? cleanValue(e.parameter.visitorId)
        : "";

    if (visitorId && visitorId.length <= 200) {
      const visitorSheet = getVisitorsSheet();
      const lock = LockService.getScriptLock();
      lock.waitLock(10000);

      try {
        const lastRow = visitorSheet.getLastRow();
        let existingVisitor = false;

        if (lastRow >= 2) {
          const visitorIds = visitorSheet
            .getRange(2, 1, lastRow - 1, 1)
            .getValues()
            .flat();

          existingVisitor = visitorIds.some(function(id) {
            return id && id.toString() === visitorId;
          });
        }

        if (!existingVisitor) {
          const now = new Date();
          visitorSheet.appendRow([
            visitorId,
            Utilities.formatDate(
              now,
              Session.getScriptTimeZone(),
              "dd/MM/yyyy HH:mm:ss"
            )
          ]);
        }
      } finally {
        lock.releaseLock();
      }
    }

    const visitorSheet = getVisitorsSheet();
    const visitorLastRow = visitorSheet.getLastRow();
    let visitorCount = 0;

    if (visitorLastRow >= 2) {
      const visitorIds = visitorSheet
        .getRange(2, 1, visitorLastRow - 1, 1)
        .getValues()
        .flat();

      visitorCount = visitorIds.filter(function(id) {
        return id !== null && id !== undefined && id.toString().trim() !== "";
      }).length;
    }

    const inquirySheet = getInquirySheet();
    const inquiryLastRow = inquirySheet.getLastRow();
    let inquiryCount = 0;

    if (inquiryLastRow >= 2) {
      const inquiryIds = inquirySheet
        .getRange(2, 1, inquiryLastRow - 1, 1)
        .getValues()
        .flat();

      inquiryCount = inquiryIds.filter(function(id) {
        return id !== null && id !== undefined && id.toString().trim() !== "";
      }).length;
    }

    return jsonResponse({
      success: true,
      visitors: visitorCount,
      inquiries: inquiryCount
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}

function getVisitorsSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(VISITORS_SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(VISITORS_SHEET_NAME);
    sheet.getRange(1, 1, 1, 2).setValues([
      ["Visitor ID", "First Seen"]
    ]);
  }

  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    const sheet = getInquirySheet();
    const data = parseInquiryRequest(e);

    validateInquiry(data);

    lock.waitLock(10000);

    try {
      const inquiryId = generateInquiryId(sheet);
      const now = new Date();

      const date = Utilities.formatDate(
        now,
        Session.getScriptTimeZone(),
        "dd/MM/yyyy"
      );

      const time = Utilities.formatDate(
        now,
        Session.getScriptTimeZone(),
        "HH:mm:ss"
      );

      const lastUpdated = Utilities.formatDate(
        now,
        Session.getScriptTimeZone(),
        "dd/MM/yyyy HH:mm:ss"
      );

      const name = cleanValue(data.name).slice(0, MAX_TEXT_LENGTH);
      const mobile = cleanValue(data.mobile).slice(0, 50);
      const email = cleanValue(data.email).slice(0, 254);
      const requirement = cleanValue(data.requirement).slice(0, MAX_TEXT_LENGTH);
      const details = cleanValue(data.details).slice(0, MAX_DETAILS_LENGTH);
      const source = cleanValue(data.source).slice(0, MAX_SOURCE_LENGTH);

      sheet.appendRow([
        inquiryId,
        date,
        time,
        name,
        mobile,
        email,
        requirement,
        details,
        source,
        "NEW",
        "",
        "",
        "",
        lastUpdated
      ]);

      return jsonResponse({
        success: true,
        message: "Inquiry successfully received.",
        inquiryId: inquiryId
      });

    } finally {
      lock.releaseLock();
    }

  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.message
    });
  }
}

function parseInquiryRequest(e) {
  if (!e) {
    throw new Error("Invalid request.");
  }

  if (e.postData && e.postData.contents) {
    const raw = e.postData.contents.toString().trim();

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          return parsed;
        }
      } catch (_) {
        // Not JSON; try normal form parameters next.
      }
    }
  }

  if (e.parameter) {
    return {
      name: e.parameter.name || "",
      mobile: e.parameter.mobile || "",
      email: e.parameter.email || "",
      requirement: e.parameter.requirement || "",
      details: e.parameter.details || "",
      source: e.parameter.source || ""
    };
  }

  throw new Error("No inquiry data was received.");
}

function validateInquiry(data) {
  const name = cleanValue(data.name);
  const mobile = cleanValue(data.mobile);
  const requirement = cleanValue(data.requirement);
  const email = cleanValue(data.email);

  if (name.length < 2) {
    throw new Error("Name is required.");
  }

  if (requirement.length < 2) {
    throw new Error("Requirement is required.");
  }

  const digitCount = (mobile.match(/\d/g) || []).length;
  if (digitCount < 7 || digitCount > 15) {
    throw new Error("Please provide a valid mobile number.");
  }

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please provide a valid email address.");
  }
}

function getInquirySheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    throw new Error('Sheet "' + SHEET_NAME + '" was not found.');
  }

  return sheet;
}

function generateInquiryId(sheet) {
  const today = new Date();

  const datePart = Utilities.formatDate(
    today,
    Session.getScriptTimeZone(),
    "yyyyMMdd"
  );

  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return "INQ-" + datePart + "-0001";
  }

  const ids = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .getValues()
    .flat();

  let highestNumber = 0;

  ids.forEach(function(id) {
    if (!id) return;

    const parts = id.toString().trim().split("-");

    if (parts.length < 3 || parts[1] !== datePart) return;

    const numberPart = parseInt(parts[2], 10);

    if (!isNaN(numberPart) && numberPart > highestNumber) {
      highestNumber = numberPart;
    }
  });

  return "INQ-" +
    datePart +
    "-" +
    String(highestNumber + 1).padStart(4, "0");
}

function cleanValue(value) {
  if (value === undefined || value === null) {
    return "";
  }

  return value.toString().trim();
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
