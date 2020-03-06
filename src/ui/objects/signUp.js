import { firebaseApp, userRef } from "../../config/firebase.js";





export default (email, password, firstName, lastName, history) => {
  console.log("signing up");
  if (!firstName || !lastName) {
    console.log("fail");
    return false;
  }
  firebaseApp
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(data => {
      userRef.child(data.user.uid).set({
        firstName,
        lastName,
        email,
        admin: 0
      });
      history.push("/");
    })

    .catch(err => {
      console.log(err);
      console.log("error : " + err);
      return err;
    });
};
