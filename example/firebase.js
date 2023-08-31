// Import the functions you need from the SDKs you need
const { initializeApp } =require("firebase/app");
const { getFunctions, httpsCallable,connectFunctionsEmulator } =require( "firebase/functions");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
const html=`<html break-after="always" style="font: Verdana;"><head></head><body><table width="100%" border="0" style="border-collapse: collapse;"><tbody><tr><td rowspan="3" align="left"><img height="70px"></td><td align="right" color="#000000" style="font-size: 60px;">Cotización</td></tr><tr><td align="right">Fecha 26/08/2023</td></tr></tbody></table><br><table width="100%" style="border-collapse: collapse;"><tbody><tr><td align="left" width="50%">Grupo Gutalvo SA de CV</td><td align="right">(SFR) GABRIELA LOPEZ PUGA </td></tr><tr><td align="left">Comonfort #444, Col Centro. Leon, Guanajuato</td><td align="right">Francisco I. Madero #355 Purisima del&nbsp;Rincón,&nbsp;centro</td></tr><tr><td align="left">477 713 48 15</td></tr></tbody></table><br><br><table border="0" width="100%" style="border-collapse: collapse;"><thead><tr style="background: #eee;"><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> ARTICULO </strong></td><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> UNIDADES </strong></td><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> PRECIO U </strong></td><td align="right" word-wrap="break-word"><strong style="font-size: 17px !important;"> TOTAL </strong></td></tr></thead><tbody><tr style="border-bottom: 1px solid #ddd;"><td style="font-size: 16px !important;" align="left">TT 4x2 150mts 1P</td><td align="center" style="font-size: 16px !important;">2</td><td align="center" style="font-size: 16px !important;">$346.81</td><td style="font-size: 16px !important;" align="right">$693.62</td></tr><tr><td colspan="2"></td><td border="0" align="right" style="font-weight: bold">TOTAL</td><td border="0" align="right" style="font-weight: bold">$693.62</td></tr><tr><td style="font-size: 20px; font-weight: bold;">Condiciones de cotización</td></tr><tr><td><div>-&nbsp;Se&nbsp;requiere&nbsp;orden&nbsp;de&nbsp;compra.<br>-&nbsp;Tiempo&nbsp;de&nbsp;entrega&nbsp;de&nbsp;8&nbsp;a&nbsp;12&nbsp;días&nbsp;hábiles&nbsp;(según&nbsp;disponibilidad&nbsp;en&nbsp;<br>&nbsp;existencias).<br>-&nbsp;Precios&nbsp;sujetos&nbsp;a&nbsp;cambio,&nbsp;sin&nbsp;previo&nbsp;aviso.&nbsp;<br>-&nbsp;El&nbsp;cliente&nbsp;acepta&nbsp;un&nbsp;10%&nbsp;+-&nbsp;de&nbsp;produccion&nbsp;en&nbsp;pedidos&nbsp;especiales</div></td></tr></tbody></table></body></html>`

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFx6Unb0l216gQ2NUkmNNqBh5bjJimWxQ",
  authDomain: "html-to-pdf-base64-developo.firebaseapp.com",
  projectId: "html-to-pdf-base64-developo",
  storageBucket: "html-to-pdf-base64-developo.appspot.com",
  messagingSenderId: "909244211020",
  appId: "1:909244211020:web:f425e623ae9176f4adb9e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);
const ReturnPdfFromHtml = httpsCallable(functions, 'ReturnPdfFromHtml');
const base64_html=btoa(html)
ReturnPdfFromHtml({html: base64_html })
  .then((result) => {
    // Read result of the Cloud Function.
    /** @type {any} */
    const data = result.data;
    const sanitizedMessage = data;
    console.log(sanitizedMessage)
  })
  .catch((error) => {
    // Getting the Error details.
    const code = error.code;
    const message = error.message;
    const details = error.details;
    console.log(code,message)
    // ...
  }); 