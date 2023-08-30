const fs=require("fs")
const html=`<html break-after="always" style="font: Verdana;"><head></head><body>hello</body></html>`
const base64_html=btoa(html)
console.log(base64_html)
const URL="https://htmlbase64topdfbase64-d3fceiuqua-uc.a.run.app";
// const fs = require("fs")
const body = {
  base64_html:base64_html
};
// const URL="http://127.0.0.1:5001/html-to-pdf-base64-developo/us-central1/htmlBase64ToPdfBase64"

const main=  async() => {
  try {
    const rawResponse = await fetch(URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const content = await rawResponse.json();
    console.log(content)
    const bin=atob(content.file)
    fs.writeFile('result_binary.pdf', bin, 'binary', error => {
        if (error) {
            throw error;
        } else {
            console.log('binary saved!');
        }
    });
    console.log(content);
    
  } catch (error) {
    console.log("ERROR",error)
  }
 
  };

main()