import React, { useState, useEffect } from "react";
import { Typography, Button } from "@material-ui/core";

import Navigation from "../Navigation";

import { useHistory } from "react-router-dom";
import { firebaseApp } from "../../config/firebase.js";

import "./styles.css";
export default function RandomJoke() {
  const [isLoaded, setLoaded] = useState(false);
  const [jokeData, setJokeData] = useState({});
  const history = useHistory();

  if (firebaseApp.auth().currentUser === null) {
    history.push("/login");
  }

  async function fetchMyAPI() {
    setLoaded(false);
    let response = await fetch("https://icanhazdadjoke.com/slack");
    response = await response.json();
    setJokeData(response);
    setLoaded(true);
  }

  useEffect(() => {
    fetchMyAPI();
  }, []);

  return (
    <>
      <Navigation mainpage="RandomJoke" />

      <Typography variant="h6">Random Dad Joke</Typography>
      {isLoaded && <div>{jokeData.attachments[0].text}</div>}
      {!isLoaded && <div>loading...</div>}
      {isLoaded && (
        <Button variant="contained" onClick={() => fetchMyAPI()}>
          New one
        </Button>
      )}
    </>
  );
}
