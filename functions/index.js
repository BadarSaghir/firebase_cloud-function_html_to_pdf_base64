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
setGlobalOptions({ maxInstances: 10,memory:"4GiB"});
// const {  jsPDF } = require("jspdf")
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

/**
 * base64 encoded html
 */
exports.ReturnPdfFromHtml = onCall(async(request) => {
  if (!request.auth) return({status:false, code:401, message:"Not signed in" })
  let base64_html = "";
 if (request?.data.html) {
    base64_html = request.data.html;
  } else {
   
    return({status:false, code:401, message:"Please send html" })  }

  const html = Buffer.from(base64_html,"base64").toString();// base64_html

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
    return({status:true, code:200, message: buffer.toString("base64") })  

  } catch (e) {
    
    return({status:true, code:201, message: e.toString() })  

  }
  // ...
});