const html=`<html break-after="always" style="font: Verdana;"><table width="100%" border="0" style="border-collapse: collapse;"><tr><td rowspan="3" align="left"><img height="70px"></td><td align="right" color="#000000" style="font-size: 60px;">Cotización</td></tr><tr><td align="right">Fecha 26/08/2023</td></tr></table><br><table width="100%" style="border-collapse: collapse;"><tr><td align="left" width="50%">Grupo Gutalvo SA de CV</td><td align="right">(SFR) GABRIELA LOPEZ PUGA </td></tr><tr><td align="left">Comonfort #444, Col Centro. Leon, Guanajuato</td><td align="right">Francisco I. Madero #355 Purisima del&nbsp;Rincón,&nbsp;centro</td></tr><tr><td align="left">477 713 48 15</td></tr></table><br><br><table border="0" width="100%" style="border-collapse: collapse;"><thead><tr style="background: #eee;"><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> ARTICULO </strong></td><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> UNIDADES </strong></td><td align="center" word-wrap="break-word"><strong style="font-size: 17px !important;"> PRECIO U </strong></td><td align="right" word-wrap="break-word"><strong style="font-size: 17px !important;"> TOTAL </strong></td></tr></thead><tbody><tr style="border-bottom: 1px solid #ddd;"><td style="font-size: 16px !important;" align="left">TT 4x2 150mts 1P</td><td align="center" style="font-size: 16px !important;">2</td><td align="center" style="font-size: 16px !important;">$346.81</td><td style="font-size: 16px !important;" align="right">$693.62</td></tr><tr><td colspan="2"></td><td border="0" align="right" style="font-weight: bold">TOTAL</td><td border="0" align="right" style="font-weight: bold">$693.62</td></tr><tr><td style="font-size: 20px; font-weight: bold;">Condiciones de cotización</td></tr><tr><td><div>-&nbsp;Se&nbsp;requiere&nbsp;orden&nbsp;de&nbsp;compra.<br>-&nbsp;Tiempo&nbsp;de&nbsp;entrega&nbsp;de&nbsp;8&nbsp;a&nbsp;12&nbsp;días&nbsp;hábiles&nbsp;(según&nbsp;disponibilidad&nbsp;en&nbsp;<br>&nbsp;existencias).<br>-&nbsp;Precios&nbsp;sujetos&nbsp;a&nbsp;cambio,&nbsp;sin&nbsp;previo&nbsp;aviso.&nbsp;<br>-&nbsp;El&nbsp;cliente&nbsp;acepta&nbsp;un&nbsp;10%&nbsp;+-&nbsp;de&nbsp;produccion&nbsp;en&nbsp;pedidos&nbsp;especiales</div></td></tr></tbody></table></html>`
const base64_html=btoa(html)
const fs = require("fs")
const body = {
  base64_html:base64_html
};

(async () => {
    const rawResponse = await fetch('http://127.0.0.1:5001/to-do-daily-43d6e/us-central1/htmlBase64ToPdfBase64', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const content = await rawResponse.json();
    const bin=atob(content.file)
    fs.writeFile('result_binary.pdf', bin, 'binary', error => {
        if (error) {
            throw error;
        } else {
            console.log('binary saved!');
        }
    });
    console.log(content);
  })();

