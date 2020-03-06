import React from "react";
import "./styles.css";

import MyBrowserRouter from "./ui/MyBrowserRouter";

export default function App() {
  return (
    <>
      <div style={styles.container}>
        <MyBrowserRouter />
      </div>
    </>
  );
}

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh"
  }
};
