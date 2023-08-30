/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */


const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const puppeteer = require('puppeteer');

// const {  jsPDF } = require("jspdf");
// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.htmlBase64ToPdfBase64 = onRequest(async(request, response) => {
  var browser = await puppeteer.launch({ headless:"new",args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  if(request.method !== "POST"){
    response.status(400).json({status:'Please send a POST request'});
    return;
  }
  if(!request.body.base64_html){
    response.status(400).json({status:'Missing a require argument base64_html'});
    return;
  }
  const html=atob(request.body.base64_html);
 


  try {

    const page = await browser.newPage();
    await page.setContent(html)


    const buffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            left: '0px',
            top: '0px',
            right: '0px',
            bottom: '0px'
        }
    })




    response.json({type:"pdf",encoding:"base64",
    file:buffer.toString("base64")});
    browser.close()
return


} catch (e) {
    response.status(500).json({status:e.toString()});
    browser.close()
    return
}



});
