"use strict";
const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const fs = require("fs");

let data = null;

// If modifying these scopes, delete token.json.
const SCOPES = [
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

// Load client secrets from a local file.
if (data == null) {
  fs.readFile("credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), execute);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this url:", authUrl);

  oAuth2Client.getToken("", (err, token) => {
    if (err) return console.error("Error retrieving access token", err);
    oAuth2Client.setCredentials(token);
    // Store the token to disk for later program executions
    fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
      if (err) return console.error(err);
      console.log("Token stored to", TOKEN_PATH);
    });
    callback(oAuth2Client);
  });
}

function execute(auth) {
  const sheets = google.sheets({ version: "v4", auth });
  return sheets.spreadsheets
    .get({
      spreadsheetId: "1MoVx8Df8oPFRPRgAb6xpZ9wmh_bInZaRxs2Zj_dFR7U",
      includeGridData: true,
      ranges: ["A:A", "B:B", "C:C", "G:G", "H:H"],
    })
    .then(
      function (response) {
        // Handle the results here (response.result has the parsed body).
        data = parse(response.data);
        console.log("Data Loaded.");
      },
      function (err) {
        console.error("Execute error", err);
      }
    );
}

function parse(sheet) {
  const res = [];
  // sheet.sheets[0].data[0].rowData.forEach((row) => { sheet.json
  //   res.push({
  //     company: row.values[0].userEnteredValue.stringValue,
  //     hiring: row.values[1].userEnteredValue.stringValue,
  //   });
  // });

  for (let i = 1; i < sheet.sheets[0].data[0].rowData.length - 1; i++) {
    if (
      !sheet.sheets[0].data[0].rowData[i].values[0].userEnteredValue ||
      sheet.sheets[0].data[2].rowData[i].values === undefined
    ) {
      continue;
    }
    res.push({
      company:
        sheet.sheets[0].data[0].rowData[i].values[0].userEnteredValue &&
        sheet.sheets[0].data[0].rowData[i].values[0].userEnteredValue
          .stringValue,
      cancelled:
        sheet.sheets[0].data[1].rowData[i].values[0].userEnteredValue &&
        sheet.sheets[0].data[1].rowData[i].values[0].userEnteredValue
          .stringValue,
      notes:
        sheet.sheets[0].data[2].rowData[i].values[0].userEnteredValue &&
        sheet.sheets[0].data[2].rowData[i].values[0].userEnteredValue
          .stringValue,
      imgLink:
        sheet.sheets[0].data[3].rowData[i].values[0].userEnteredValue &&
        sheet.sheets[0].data[3].rowData[i].values[0].userEnteredValue
          .stringValue,
      location:
        sheet.sheets[0].data[4].rowData[i].values[0].userEnteredValue &&
        sheet.sheets[0].data[4].rowData[i].values[0].userEnteredValue
          .stringValue,
    });
  }

  return res;
}

router.get("/getData", async (req, res) => {
  try {
    res.json(data);
  } catch (e) {
    console.log(e);
    res.status(e.code || 500).json({ error: e });
  }
});

const constructorMethod = (app) => {
  app.use(router);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
