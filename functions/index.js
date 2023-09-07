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
  setGlobalOptions({ maxInstances: 10,memory:"1GiB"});
  const options=[
    "--allow-running-insecure-content",
    "--autoplay-policy=user-gesture-required",
    "--disable-component-update",
    "--disable-domain-reliability",
    "--disable-features=AudioServiceOutOfProcess,IsolateOrigins,site-per-process",
    "--disable-print-preview",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-setuid-sandbox",
    "--disable-site-isolation-trials",
    "--disable-speech-api",
    "--disable-web-security",
    "--disk-cache-size=33554432",
    "--enable-features=SharedArrayBuffer",
    "--hide-scrollbars",
    "--ignore-gpu-blocklist",
    "--in-process-gpu",
    "--mute-audio",
    "--no-default-browser-check",
    "--no-pings",
    "--no-sandbox",
    "--no-zygote",
    "--use-gl=swiftshader",
    "--window-size=1920,1080",
  ];
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
      args: options,
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
