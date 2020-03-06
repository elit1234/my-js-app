import { postRef } from "../../config/firebase.js";

export default (uid, content) => {
  console.log("adding post");
  postRef.push({
    createdBy: uid,
    content
  });
};
