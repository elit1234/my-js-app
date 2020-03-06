import React from "react";

import { userRef } from "../../config/firebase.js";

import { useHistory } from "react-router-dom";

export default ({ uid = -1, myUID, firstName, lastName, email, admin }) => {
  let cont = true;
  const history = useHistory();
  if (uid === -1) {
    userRef
      .child(myUID)
      .once("value", snap => {
        if (admin > snap.val().admin) {
          console.log("invalid");
          if (snap.val().admin !== 3) cont = false;
          return false;
        }
      })
      .then(e => {
        if (cont === true && uid === -1) {
          return userRef
            .child(myUID)
            .set({
              firstName,
              lastName,
              email,
              admin
            })
            .then(data => {
              return true;
            })
            .catch(() => {
              return false;
            });
        }
      });
  } else {
    console.log("updating another user");
    userRef
      .child(uid)
      .once("value", snap => {
        if (admin > snap.val().admin) {
          console.log("invalid");
          if (snap.val().admin !== 3) cont = false;
          return false;
        }
      })
      .then(e => {
        return userRef
          .child(uid)
          .set({
            firstName,
            lastName,
            email,
            admin
          })
          .then(data => {
            return true;
            history.push("/admin");
          })
          .catch(() => {
            return false;
          });
      });
  }
};
