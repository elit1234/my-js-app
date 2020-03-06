import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Paper,
  Grid,
  Button,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Input
} from "@material-ui/core";


import { useHistory } from "react-router-dom";

import { firebaseApp } from "../../config/firebase";

import signIn from "../objects/signIn.js";

import "./LoginStyles.css";

import Navigation from "../Navigation";
export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(true);
  const [SnackbarMessage, setSnackbarMessage] = useState("")

  const [isLoading, setLoading] = useState(false);

  if (firebaseApp.auth().currentUser !== null) {
    window.location.href = "/";
  }
  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("enter key pressed");
        submitLoginForm();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  async function submitLoginForm() {
    if (username && password) {
      setLoading(true);
     await signIn(username, password).then(function(data) {
      setSnackbarOpen(true);
      setSnackbarMessage("")
      if(data === true) {
        setSnackbarMessage(`Welcome, ${username}`);
        setTimeout(() => {
          history.push("/");
          
        }, 1000)
      }
      else {
        setSnackbarMessage("Error logging in");
      }
      setLoading(false);
     });

      
    } else {
      setSnackbarOpen(true);
      setSnackbarMessage("Enter a valid email and password")
    }
  }

  function handleSnackbarClose() {
    return setSnackbarOpen(false);
  }

  return (
    <>
      <Navigation mainpage="Login" />

      <React.Fragment>
        <div className="dialogStyle">
          <Paper>
            {snackbarOpen && (
                     <Snackbar
                     open={snackbarOpen}
                     anchorOrigin={{
                       vertical: "bottom",
                       horizontal: "left"
                     }}
                     onClose={handleSnackbarClose}
                     autoHideDuration={2000}
                     message={SnackbarMessage}
                   />
            )}
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
                    type="email"
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

              <Grid item lg={2} />
              <Grid item xs={12} sm={6} lg={4}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12} sm={5}>
                <Button
                  disableFocusRipple
                  disableRipple
                  style={{ textTransform: "none", textAlign: "right" }}
                  variant="text"
                  color="primary"
                >
                  Forgot password ?
                </Button>
              </Grid>
            </form>
            {isLoading && (
             <div style={{ textAlign: "center", justifyContent: "center" }}>
              <Grid>
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              </Grid>
            </div>
            )}
            <Grid container justify="center" style={{ marginTop: "10px" }}>
              <Button
                variant="outlined"
                color="primary"
                style={{ textTransform: "none" }}
                onClick={() => submitLoginForm()}
                type="submit"
                >
                  Login
                </Button>
            </Grid>
          </Paper>
   
        </div>
      </React.Fragment>
      
    </>
  );
}
