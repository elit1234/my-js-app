import { firebaseApp, logsRef, userRef } from "./firebase";


export const logAdminAction = (type, details = "", otherUID = -1) => {
  //type list
  /*
  1) - List all users
  2) List a specific user

  */

 var currentdate = new Date(); 
 var time = currentdate.getHours() + ":"  
       + currentdate.getMinutes() + ":"
       + currentdate.getSeconds();
 var date = currentdate.getDate() + "/"
       + (currentdate.getMonth()+1)  + "/"
       + currentdate.getFullYear();

  

  switch(type) {
    case 1: {
      firebaseApp.auth().onAuthStateChanged(function(user) {
        if(user) {
          const myUID = user.uid;
          const myEmail = user.email;
          var details = `viewed all users`;
          
          var getMyIP = fetch('https://api.ipify.org/?format=json')
            .then(blob => blob.json())
            .then(data => {
              const myIP = data.ip;
              logsRef.push({
                uid: myUID,
                otherUID,
                date,
                time,
                type,
                details,
                myIP,
                myEmail
              })
            });  
        }
      })
      break;
      
    }
    case 2: {
      console.log('viewed all admins');
      break;
    }
    case 3: {
      firebaseApp.auth().onAuthStateChanged(function(user) {
        if(user) {
          const myUID = user.uid;
          const myEmail = user.email;

          var getMyIP = fetch('https://api.ipify.org/?format=json')
            .then(blob => blob.json())
            .then(data => {
              const myIP = data.ip;
              logsRef.push({
                uid: myUID,
                otherUID,
                date,
                time,
                type,
                details,
                myIP,
                myEmail
              })
            });  

        }
      })

    }
    default: {}
  }
}

export const verifySnapshot = () => {
  let snapshot = localStorage.getItem("snapshot");
  if (snapshot) {
    firebaseApp.auth().onAuthStateChanged(function(user) {
      if(user) {
        userRef.child(user.uid).once("value", snapshot => {
          localStorage.removeItem("snapshot");
          console.log('verifying');
          console.log(snapshot);
          localStorage.setItem("snapshot", JSON.stringify(snapshot.val()));

        });

      }
    }) 
  }
}

export const isAdmin = () => {
  let snapshot = localStorage.getItem("snapshot");
  if (snapshot) {
    const parsed = JSON.parse(snapshot);
    console.log(parsed)
    if (parsed.admin > 0) {
      return true;
    }
    else {
      return false;
    }
  }
  else return false;
}


