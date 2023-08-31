/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const { onRequest,onCall } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const puppeteer = require("puppeteer");
const functions = require("firebase-functions");

const { setGlobalOptions } = require("firebase-functions/v2");
setGlobalOptions({ maxInstances: 10 });
// const {  jsPDF } = require("jspdf");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.htmlBase64ToPdfBase64 = onRequest(async (request, response) => {


//   if (request.method !== "POST") {
//     response.status(400).json({ status: "Please send a POST request" });
//     return { status: "Please send a POST request" };
//   }
//   let base64_html = "";
//   if (request?.body.base64_html) {
//     base64_html = request.body.base64_html;
//   } else if (request?.data.base64_html) {
//     base64_html = request.data.base64_html;
//   } else {
//     response
//       .status(400)
//       .json({ status: "Missing a require argument base64_html" });
//     return { status: "Please send a POST request" };
//   }

//   const html = atob(base64_html);

//   try {  
//     var browser = await puppeteer.launch({
//     headless: "new",
//     args: ["--no-sandbox", "--disable-setuid-sandbox"],
//   });
//     const page = await browser.newPage();
//     await page.setContent(html);

//     const buffer = await page.pdf({
//       format: "A4",
//       printBackground: true,
//       margin: {
//         left: "0px",
//         top: "0px",
//         right: "0px",
//         bottom: "0px",
//       },
//     });

//     response
//       .status(200)
//       .json({
//         type: "pdf",
//         encoding: "base64",
//         file: buffer.toString("base64"),
//       });
//     await browser.close();
//     return { type: "pdf", encoding: "base64", file: buffer.toString("base64") };
//   } catch (e) {
//     response.status(500).json({ status: e.toString() });
//     return {
//       status: e.toString(),
//     };
//   }
// });

exports.htmlBase64ToPdfBase64Callable = onCall(async(request) => {
  let base64_html = "";
 if (request?.data.base64_html) {
    base64_html = request.data.base64_html;
  } else {
   
    return { status: "Please send a POST request" };
  }

  const html = Buffer.from(base64_html,"base64").toString();

  try {  
    var browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
    const page = await browser.newPage();
    await page.setContent(html);

    const buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        left: "0px",
        top: "0px",
        right: "0px",
        bottom: "0px",
      },
    });

  
    await browser.close();
    return { type: "pdf", encoding: "base64", file: buffer.toString("base64") };
  } catch (e) {
    
    return {
      status: e.toString(),
    };
  }
  // ...
});