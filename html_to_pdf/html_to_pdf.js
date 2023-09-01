import {jsPDF} from "jspdf"

async function generate_pdf(html){
    var doc = new jsPDF('p','mm',[297, 210]);          
 
    doc.html(html);
    
    const blob=doc.output("blob");
    const base64Html=await blobToBase64(blob)
    return base64Html;
}



const blobToBase64 = (blob) => {
    return new Promise((resolve, _) => {
      // do a request to the blob uri
  
      // response has a method called .blob() to get the blob file
  
      // instantiate a file reader
      const fileReader = new FileReader();
  
      // read the file
      fileReader.readAsDataURL(blob);
  
      fileReader.onloadend = function(){
        resolve(fileReader.result); // Here is the base64 string
      }
    });
  };