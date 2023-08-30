# HTML to PDF Conversion using Puppeteer in Firebase Cloud Function

This repository contains code for a Firebase Cloud Function that converts HTML content into a PDF document using Puppeteer, and returns the PDF content in base64 encoding. It also includes a client-side script to send the HTML content to the Cloud Function and receive the generated PDF.

## Prerequisites

- Node.js and npm installed on your local machine.
- Firebase project set up.

## Setup

1. Clone this repository to your local machine
2. Install dependencies using the following command:

   ```
   npm install
   ```
3. Deploy the Firebase Cloud Function using the Firebase CLI:

   ```
   firebase deploy --only functions
   ```

## Client-side Script

The client-side script (`getPdf.js`) sends a POST request with the base64-encoded HTML content to the Firebase Cloud Function and handles the received PDF content.

## Firebase Cloud Function

The Firebase Cloud Function (`index.js`) receives the base64-encoded HTML content, uses Puppeteer to convert it to a PDF, and returns the PDF content in base64 encoding.

## Usage

1. Replace the `http://127.0.0.1:5001/to-do-daily-43d6e/us-central1/htmlBase64ToPdfBase64` URL in the client-side script (`getPdf.js`) with the URL of your deployed Firebase Cloud Function.
2. Update the HTML content in the `const html` variable in the client-side script (`getPdf.js`) with the HTML content you want to convert to PDF.
3. Run the client-side script using the following command: node getPdf.js

This will send a POST request to the Firebase Cloud Function, receive the PDF content, and save it as `result_binary.pdf`.

## Notes

- The Puppeteer library is used to control a headless Chrome browser for generating PDFs from HTML content.
- The Firebase Cloud Function listens for POST requests, processes the HTML content, and returns the PDF in base64 encoding.
- Make sure to handle errors and edge cases appropriately in production code.

Feel free to modify and customize the code to fit your specific requirements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
