import { firebaseApp, userRef } from "../../config/firebase.js";

export default async function signIn(email, password) {
  console.log("signing in");
  let errors = [];
  await firebaseApp
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((data) => {
      userRef.child(data.user.uid).once("value", snapshot => {
        localStorage.removeItem("snapshot");
       // console.log(snapshot.val());
        localStorage.setItem("snapshot", JSON.stringify(snapshot.val()));
        firebaseApp
          .auth()
          .currentUser.getIdToken(true);

      });
    })
    .catch(err => {
     errors = err;
      return false;
    });
    if(errors.length < 1)
      return true;
    
    else return errors;
}
