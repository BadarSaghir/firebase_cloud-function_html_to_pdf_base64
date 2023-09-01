import {jsPDF} from "jspdf"

import html2canvas from "html2canvas"

//   "html2canvas": "^1.4.1",
// "jspdf": "^2.5.1"


export async function exportImage(html:HTMLElement) {
    var doc = new jsPDF("p", "mm", "a4");
    const canvas= await html2canvas(html, { scale: 1 })
      var x = canvas.toDataURL("image/jpeg", 1);
      doc.addImage(x, "JPEG", 30, 30, 148, 150);
     
     return doc.output("datauristring").split(";")[2].split(",")[1]
  
  }
// const blobToBase64 = (blob:Blob) => {
//     return new Promise((resolve:(value:string)=>void, _) => {
//       // do a request to the blob uri
  
//       // response has a method called .blob() to get the blob file
  
//       // instantiate a file reader
//       const fileReader = new FileReader();
  
//       // read the file
//       fileReader.readAsDataURL(blob);
  
//       fileReader.onloadend = function(){
//         resolve(fileReader.result as string); // Here is the base64 string
//       }
//     });
//   };

