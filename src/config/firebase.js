import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBg7KLemZVeta3HjcXPyt7ih0DlFXxaDiI",
  authDomain: "facebook-clone-77433.firebaseapp.com",
  databaseURL: "https://facebook-clone-77433.firebaseio.com",
  projectId: "facebook-clone-77433",
  storageBucket: "facebook-clone-77433.appspot.com",
  messagingSenderId: "873782989208",
  appId: "1:873782989208:web:602b4bf602fff699281bed"
};

export const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const userRef = firebaseApp.database().ref("users");

export const postRef = firebaseApp.database().ref("posts");

export const logsRef = firebaseApp.database().ref("logs");
