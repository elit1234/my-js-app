import { firebaseApp } from "../../config/firebase.js";

export default function signOut(history) {
  console.log("signing out");
  firebaseApp
    .auth()
    .signOut()
    .then(function() {
      history.push("/login");
      localStorage.removeItem("snapshot")
    })
    .catch(function(error) {
      return console.error(error);
    });

  return true;
}
