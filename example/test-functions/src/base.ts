import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";


const REACT_APP_FIREBASE_KEY="AIzaSyBFx6Unb0l216gQ2NUkmNNqBh5bjJimWxQ"
const REACT_APP_FIREBASE_DOMAIN="html-to-pdf-base64-developo.firebaseapp.com"
const REACT_APP_FIREBASE_PROJECT_ID="html-to-pdf-base64-developo"
const REACT_APP_FIREBASE_SENDER_ID="909244211020"
const REACT_APP_FIREBASE_APP_ID="1:909244211020:web:f425e623ae9176f4adb9e9"


const app = firebase.initializeApp({
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: REACT_APP_FIREBASE_DOMAIN,
  projectId: REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: REACT_APP_FIREBASE_SENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
});
export const auth= getAuth(app)
export const fnc=getFunctions(app);
// const functions = getFunctions(app);
// export {functions};
export default app;