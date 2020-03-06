import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Button,
  Snackbar,
  Input
} from "@material-ui/core";


import { firebaseApp } from "../../config/firebase";

import signUp from "../objects/signUp.js";

import { useHistory } from "react-router-dom";

import "./LoginStyles.css";

import Navigation from "../Navigation";
export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(true);


  const history = useHistory();

  if (firebaseApp.auth().currentUser !== null) {
    window.location.href = "/";
  }
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("enter key pressed");
        submitSignUpForm();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  function submitSignUpForm() {
    if (username && password) {
      console.log("signing up");
      signUp(
        username,
        password,
        "Test firstname",
        "test lastname",
        history
        
      );
    } else console.log("error");

  }

  function handleSnackbarClose() {
    return setSnackbarOpen(false);
  }

  return (
    <>
      <Navigation mainpage="Sign Up" />

      <React.Fragment>
        <div className="dialogStyle">
          <Paper>
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
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Email"
                    fullWidth
                  />
                </Grid>
                <Grid item sm={6} xs={12} lg={4}>
                  <Input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </form>
            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={() => submitSignUpForm()}
                type="submit"
                >
                  Login
              </Button>
              
            </Grid>
          </Paper>
          <Snackbar
            open={snackbarOpen}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left"
            }}
            onClose={handleSnackbarClose}
            autoHideDuration={6000}
            message="(DEMO) username & password: test"
          />
        </div>
      </React.Fragment>

    </>
  );
}
