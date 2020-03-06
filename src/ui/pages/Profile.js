import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Input,
  Button,
  Select,
  MenuItem
} from "@material-ui/core";

import ArrowBack from "@material-ui/icons/ArrowBack";

import Navigation from "../Navigation";

import editUser from "../objects/editUser";
import { firebaseApp, userRef } from "../../config/firebase.js";
import { logAdminAction } from "../../config/funcs";

import { useHistory } from "react-router-dom";

export default function Profile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [myEmail, setMyEmail] = useState("");
  const [myAdmin, setMyAdmin] = useState(0);
  const [myUID, setMyUID] = useState("");

  const [editingEmail, setEditingEmail] = useState("");
  const [editingAdmin, setEditingAdmin] = useState(0);

  const history = useHistory();
  const { match } = props;

  const editingUser = match.params.editingUser;


  

  async function loadUserData() {
    if (!editingUser) {
      userRef.once("value", snap => {
        const list = Object.entries(snap.val());
        list.map((index, key) => {
          firebaseApp.auth().onAuthStateChanged(function(user) {
            if(user) {
              if(user.uid === index[0]) {
                setMyUID(user.uid);
                setMyAdmin(index[1].admin);
                setMyEmail(index[1].email);
                setFirstName(index[1].firstName);
                setLastName(index[1].lastName);
              }
            }})
          return 1;
        });
      });
    } else {
      logAdminAction(3, "Viewed users account", editingUser)
      userRef.once("value", snap => {
        const list = Object.entries(snap.val());
        list.map((index, key) => {
          const uid = firebaseApp.auth().currentUser.uid;
          if (index[0] === editingUser) {
            console.log(index[1]);
            setFirstName(index[1].firstName);
            setLastName(index[1].lastName);
            setEditingAdmin(index[1].admin);
            setEditingEmail(index[1].email);
          }
          if (uid === index[0]) {
            setMyUID(uid);
            setMyAdmin(index[1].admin);
            setMyEmail(index[1].email);
            setFirstName(index[1].firstName);
            setLastName(index[1].lastName);
          }
          return 1;
        });
      });
    }
  }
  /*
   */
  useEffect(() => {
    loadUserData();
  }, []);

  function updateUser() {
    const data = {
      editingUser: !editingUser ? -1 : editingUser,
      uid: editingUser,
      myUID,
      firstName,
      lastName,
      email: !editingUser ? myEmail : editingEmail,
      admin: !editingUser ? myAdmin : editingAdmin
    };

    editUser(data);
  }
  
  return (
    <>
      {!editingUser && <Navigation mainpage="Profile" />}
      {editingUser && (
        <Navigation mainpage={`Viewing ${firstName} ${lastName}`} />
      )}
      <Paper elevation={10}>
      <ArrowBack onClick={() => history.push("/admin/1")} />
        <form>
          <Grid
            container
            spacing={3}
            alignItems="flex-end"
            style={{ padding: "2px" }}
          >
            <Grid item lg={2} />
            <Grid item sm={5} xs={12} lg={4}>
              <Input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                placeholder="First Name"
                fullWidth
              />
            </Grid>
            <Grid item sm={6} xs={12} lg={4}>
              <Input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                placeholder="Last Name"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid
            container
            spacing={3}
            alignItems="flex-end"
            style={{ padding: "2px" }}
          >
            <Grid item lg={2} />
            {myAdmin > 0 && (
              <Grid item sm={5} xs={12} lg={4}>
                <Select
                  value={myAdmin}
                  onChange={
                    editingUser
                      ? e => setMyAdmin(e.target.value)
                      : e => setEditingAdmin(e.target.value)
                  }
                  fullWidth
                  style={{ textAlign: "center" }}
                >
                  <MenuItem value={1}>Level 1</MenuItem>
                  <MenuItem value={2}>Level 2</MenuItem>
                  <MenuItem value={3}>Level 3</MenuItem>
                </Select>
              </Grid>
            )}
            {myAdmin < 1 && <div>not admin</div>}
          </Grid>

          <Grid container>
            <Grid item xs={4} />
            <Grid item xs={4} style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={() => updateUser()}
                size="large"
                fullWidth
              >
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </>
  );
}
