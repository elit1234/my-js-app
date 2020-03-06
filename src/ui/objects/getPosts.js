import { postRef } from "../../config/firebase.js";

export default () => {
  console.log("getting posts");
  postRef.once("value", snap => {
    return snap.val();
  });
};
