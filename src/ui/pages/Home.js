import React from "react";
import { Paper } from "@material-ui/core";
import "./styles.css";

import Navigation from "../Navigation";


export default function Home() {
  return (
    <>
      <Navigation mainpage="Home" />
      <Paper elevation={10}>
      </Paper>
    </>
  );
}
