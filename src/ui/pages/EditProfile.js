import React, { useState } from "react";
import { firebaseApp } from "../../config/firebase.js";
import editUser from "../objects/editUser.js";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const onSubmit = () => {
    const uid = firebaseApp.auth().currentUser.uid;
    const data = {
      uid,
      firstName,
      lastName
    };
    console.log("submitting");
    const result = editUser(data);

    if (result === true) {
      console.log("user info edited");
    }
    if (result === false) {
      console.error("error");
    }
  };
  return (
    <div>
      <div>edit profile page</div>
      <input value={firstName} onChange={e => setFirstName(e.target.value)} />
      <input value={lastName} onChange={e => setLastName(e.target.value)} />
      <button onClick={() => onSubmit()}>submit</button>
    </div>
  );
}
