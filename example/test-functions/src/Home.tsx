import React, { useState } from "react";
import app,{fnc} from "./base";
import { getFunctions, httpsCallable } from "firebase/functions";
const html=`<html break-after="always" style="font: Verdana;"><head></head><body><table width="100%" border="0" style="border-collapse: collapse;"><tbody><tr><td rowspan="3" align="left"><img height="70px"></td><td align="right" color="#000000" style="font-size: 60px;">Cotización</td></tr><tr><td align="right">Fecha 26/08/2023</td></tr></tbody></table><br><table width="100%" style="border-collapse: collapse;"><tbody><tr><td align="left" width="50%">Grupo Gutalvo SA de CV</td><td align="right">(SFR) GABRIELA LOPEZ PUGA </td></tr><tr><td align="left">Comonfort #444, Col Centro. Leon, Guanajuato</td><td align="right">Francisco I. Madero #355 Purisima del&nbsp;Rincón,&nbsp;centro</td></tr><tr><td align="left">477 713 48 15</td></tr></tbody></table><br><br><table border="0" width="100%" style="border-collapse: collapse;"><thead><tr style="background: #eee;"><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> ARTICULO </strong></td><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> UNIDADES </strong></td><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> PRECIO U </strong></td><td align="right" word-wrap="break-word"><strong style="font-size: 17px !important;"> TOTAL </strong></td></tr></thead><tbody><tr style="border-bottom: 1px solid #ddd;"><td style="font-size: 16px !important;" align="left">TT 4x2 150mts 1P</td><td align="center" style="font-size: 16px !important;">2</td><td align="center" style="font-size: 16px !important;">$346.81</td><td style="font-size: 16px !important;" align="right">$693.62</td></tr><tr><td colspan="2"></td><td border="0" align="right" style="font-weight: bold">TOTAL</td><td border="0" align="right" style="font-weight: bold">$693.62</td></tr><tr><td style="font-size: 20px; font-weight: bold;">Condiciones de cotización</td></tr><tr><td><div>-&nbsp;Se&nbsp;requiere&nbsp;orden&nbsp;de&nbsp;compra.<br>-&nbsp;Tiempo&nbsp;de&nbsp;entrega&nbsp;de&nbsp;8&nbsp;a&nbsp;12&nbsp;días&nbsp;hábiles&nbsp;(según&nbsp;disponibilidad&nbsp;en&nbsp;<br>&nbsp;existencias).<br>-&nbsp;Precios&nbsp;sujetos&nbsp;a&nbsp;cambio,&nbsp;sin&nbsp;previo&nbsp;aviso.&nbsp;<br>-&nbsp;El&nbsp;cliente&nbsp;acepta&nbsp;un&nbsp;10%&nbsp;+-&nbsp;de&nbsp;produccion&nbsp;en&nbsp;pedidos&nbsp;especiales</div></td></tr></tbody></table></body></html>`

/**
 * Renders the home page.
 * Includes a button that triggers a cloud function to convert an HTML string to a PDF file.
 */
const Home = () => {
  const [lhref,setLhref]=useState("")
  /**
   * Handles the click event of the "pdf" button.
   * Calls a cloud function to convert the HTML string to a PDF file.
   */
  function handleClick() {
    const ReturnPdfFromHtml = httpsCallable(fnc, 'ReturnPdfFromHtml');
    const base64_html = btoa(html)
    
    ReturnPdfFromHtml({ html: base64_html })
      .then((result) => {
        const data = result.data;
        const sanitizedMessage = data as {message:string};
        setLhref(`data:application/pdf;base64,${sanitizedMessage.message}`);
downloadPDF(sanitizedMessage.message)
        console.log("sucess",sanitizedMessage);
      })
      .catch((error) => {
        const code = error.code;
        const message = error.message;
        const details = error.details;
        // Display the error message to the user
        console.log(`Error: ${message}`);
      }); 
  }
  
  function downloadPDF(pdf) {
    const linkSource = `data:application/pdf;base64,${pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = "abc.pdf";
    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();}

  return (
    <>
      <h1>Home</h1>
      <button onClick={(e) => { e.preventDefault(); handleClick(); }}>pdf</button>
    { lhref&&<a href={lhref}>Download</a>}
    </>
  );
};

export default Home;

