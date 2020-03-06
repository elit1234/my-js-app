import React, { useState } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Link, useLocation, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  CssBaseline
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import { firebaseApp } from "../config/firebase.js";

import { isAdmin } from "../config/funcs";

export default function Navigation(props) {
  let myLocation = useLocation().pathname;

  
  const amAdmin = isAdmin();

  const history = useHistory();
  const [darkMode, setDarkMode] = useState(false);
  const isLoggedIn = firebaseApp.auth().currentUser === null ? false : true;

  if (!isLoggedIn) {
    switch (myLocation) {
      case "/": {
        break;
      }
      case "/about": {
        break;
      }
      case "/logout": {
        break;
      }
      case "/login": {
        break;
      }
      case "/signup": {
        break;
      }
      default: {
        if (!amAdmin) history.push("/");
        break;
      }
    }
  }

  let MenuItems = [];

  if (isLoggedIn && !amAdmin) {
    MenuItems = [
      { id: 1, name: "Home", url: "/" },
      { id: 2, name: "About", url: "/about" },
      { id: 3, name: "Random Joke", url: "/randomjoke" },
      { id: 4, name: "NBA Stats", url: "/nba" },
      { id: 5, name: "Profile", url: "/profile" },
      { id: 6, name: "Logout", url: "/logout" }
    ];
  } else if (isLoggedIn && amAdmin) {
    MenuItems = [
      { id: 1, name: "Home", url: "/" },
      { id: 2, name: "About", url: "/about" },
      { id: 3, name: "Random Joke", url: "/randomjoke" },
      { id: 4, name: "NBA Stats", url: "/nba" },
      { id: 5, name: "Profile", url: "/profile" },
      { id: 6, name: "Admin", url: "/admin" },
      { id: 7, name: "Logout", url: "/logout" }
    ];
  } else {
    MenuItems = [
      { id: 1, name: "Home", url: "/" },
      { id: 2, name: "About", url: "/about" },
      { id: 1, name: "Login", url: "/login" },
      { id: 2, name: "Sign Up", url: "/signup" }
    ];
  }

  let styles = {
    nav: {
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      textAlign: "center"
    },
    navItem: {
      flex: 1,
      alignItems: "center",
      padding: 10,
      cursor: "default"
    },
    navItemActive: {
      flex: 1,
      alignItems: "center",
      paddingBottom: 10,
      cursor: "default",
      fontSize: 20,
      color: "red"
    },
    wrapper: {
      flex: 1,
      backgroundColor: "#F5FCFF",
      width: "100%"
    },
    appbar: {
      height: "10%"
    },
    appbartitle: {
      margin: "0 0 10px"
    },
    appbarlink: {
      textDecoration: "none",
      color: "black"
    },
    drawerlistitem: {
      width: 180,
      textAlign: "center",
      minWidth: "100%"
    }
  };

  const [sideDrawer, setSideDrawer] = useState(false);

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          primary: { main: "#2979FF" }
        }
      }),
    [darkMode]
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <div style={styles.nav}>
          <div style={styles.wrapper}>
            <AppBar position="static" style={styles.appbar}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setSideDrawer(!sideDrawer)}
                >
                  <MenuIcon />
                </IconButton>
                <Typography style={styles.appbartitle} variant="h6">
                  {props.mainpage}
                </Typography>
              </Toolbar>
            </AppBar>

            <Drawer
              open={sideDrawer}
              onClose={() => setSideDrawer(!sideDrawer)}
              style={styles.sidedrawer}
              width="75%"
            >
              <div role="presentation">
                <List>
                  {isLoggedIn && (
                    <ListItem button>
                      <ListItemText>
                        <Typography>
                          Welcome, {firebaseApp.auth().currentUser.email}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  )}
                  {MenuItems.map((item, key) => {
                    return (
                      <Link to={item.url} style={styles.appbarlink} key={key}>
                        <ListItem
                          button
                          selected={myLocation === item.url}
                          style={styles.drawerlistitem}
                        >
                          <ListItemText>
                            <Typography style={styles.drawerlistitem}>
                              {item.name}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      </Link>
                    );
                  })}
                </List>
              </div>
            </Drawer>
          </div>
        </div>
      </ThemeProvider>
    </React.Fragment>
  );
}
