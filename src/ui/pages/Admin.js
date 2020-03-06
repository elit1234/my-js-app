import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Table } from "semantic-ui-react";

import { logAdminAction, isAdmin, verifySnapshot } from "../../config/funcs";

import Chip from "@material-ui/core/Chip";

import HighlightOff from "@material-ui/icons/HighlightOff";

import CircularProgress from "@material-ui/core/CircularProgress";

import ArrowBack from "@material-ui/icons/ArrowBack";
import People from "@material-ui/icons/People";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";

import { useHistory } from "react-router-dom";



import { userRef, logsRef } from "../../config/firebase";

import "./Admin.css";

export default function Admin() {
  const history = useHistory();
  const [activePage, setActivePage] = useState(0);
  const [listofUsers, setListOfUsers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [drawerWidth, setDrawerWidth] = useState(180);
  const [amAdmin, setAmAdmin] = useState(false);
  const [logsData, setLogsData] = useState({});
  const urlActivePage = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

  const vsnap = verifySnapshot();
  if(vsnap !== true)  history.push('/');

  useEffect(() => {
    if(urlActivePage === '1') {
      listUsers();      
    }
    else if(urlActivePage === '2') {
      listAdmins();
    }
    else if(urlActivePage === '3') {
      listLogs();
    }
    if(isAdmin() === true) setAmAdmin(true);
  else {
    history.push("/login");
    setAmAdmin(false);
  }
  }, [])

  useEffect(() => {
    logAdminAction(activePage);
    if(activePage === 3) {
      loadLogs();
    }
  }, [activePage])


  function loadLogs() {
    
    logsRef.once("value", snap => {
      return setLogsData(snap.val());
    });
  }
  

  

  
  const useStyles = makeStyles(theme => ({
    root: {
      display: "flex"
    },
    appBar: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.default,
      padding: theme.spacing(3)
    }
  }));

  function goBack() {
    history.push("/");
  }

  function openEditUser(props) {
    history.push(`/profile/${props}`);
  }

  async function listUsers() {
    setActivePage(1);
    userRef.once("value", snap => {
        return setListOfUsers(snap.val());
      });
      setIsLoading(false);
  }
  function listAdmins() {
    if (activePage !== 2) {
      setActivePage(2);
    } else if (activePage !== 0) setActivePage(0);
  }

  function listLogs() {
    if (activePage !== 3) {
      setActivePage(3);
    } else if (activePage !== 0) setActivePage(0);
  }

  function toggleSidebar() {
    if (drawerWidth > 0) {
      setDrawerWidth(0);
    } else setDrawerWidth(180);
  }

  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <ArrowBack onClick={() => goBack()} />
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => listUsers()}
              selected={activePage === 1 ? true : false}
            >
              <ListItemIcon>
                <People />
              </ListItemIcon>
              <ListItemText primary={"List Users"} />
            </ListItem>
            <ListItem
              button
              onClick={() => listAdmins()}
              selected={activePage === 2 ? true : false}
            >
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary={"List Admins"} />
            </ListItem>

            <ListItem
              button
              onClick={() => listLogs()}
              selected={activePage === 3 ? true : false}
            >
              <ListItemIcon>
                <SupervisorAccount />
              </ListItemIcon>
              <ListItemText primary={"Logs"} />
            </ListItem>

            

            <Divider />
            <ListItem button onClick={() => toggleSidebar()} selected>
              <ListItemIcon>
                <HighlightOff />
              </ListItemIcon>
              <ListItemText primary={"Close sidebar"} />
            </ListItem>
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {drawerWidth === 0 && (
            <Chip
              label="Open sidebar"
              component="a"
              clickable
              onClick={() => toggleSidebar()}
              className="opensidebar-chip"
            />
          )}
          {activePage === 1 && (
            <div>
              <Table fixed unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Email</Table.HeaderCell>

                    <Table.HeaderCell>First Name</Table.HeaderCell>
                    <Table.HeaderCell>Last Name</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {isLoading && (
                    <Table.Row>
                      <Table.Cell />
                      <Table.Cell>
                        <CircularProgress />
                      </Table.Cell>
                    </Table.Row>
                  )}
                  {listofUsers && (
                    <>
                      {Object.keys(listofUsers).map(function(key, index) {
                        console.log(key);
                        return (
                          <Table.Row
                            key={key}
                            onClick={() => openEditUser(key)}
                          >
                            <Table.Cell>{listofUsers[key].email}</Table.Cell>
                            <Table.Cell>
                              {listofUsers[key].firstName}
                            </Table.Cell>
                            <Table.Cell>{listofUsers[key].lastName}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </>
                  )}
                </Table.Body>
              </Table>
              <Typography paragraph />
            </div>
          )}
          {activePage === 2 && (
            <Typography paragraph>
              Consequat mauris nunc congue nisi vitae suscipit. Fringilla est
              ullamcorper eget nulla facilisi etiam dignissim diam. Pulvinar
              elementum integer enim neque volutpat ac tincidunt. Ornare
              suspendisse sed nisi lacus sed viverra tellus. Purus sit amet
              volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
              Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt
              ornare massa eget egestas purus viverra accumsan in. In hendrerit
              gravida rutrum quisque non tellus orci ac. Pellentesque nec nam
              aliquam sem et tortor. Habitant morbi tristique senectus et.
              Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
              aenean euismod elementum nisi quis eleifend. Commodo viverra
              maecenas accumsan lacus vel facilisis. Nulla posuere sollicitudin
              aliquam ultrices sagittis orci a.
            </Typography>
          )}
          {activePage === 3 && (
            <>
            <div>list logs</div>
            <Table striped fixed unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>
                      User Email
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                      Details
                      </Table.HeaderCell>  
                      <Table.HeaderCell>
                      Time
                      </Table.HeaderCell>  
                      <Table.HeaderCell>
                        Date
                      </Table.HeaderCell>
                </Table.Row>

              </Table.Header>
              <Table.Body>
              {Object.keys(logsData).map(function(key, index) {
                  return (
                    <Table.Row key={key}>
                      <Table.Cell>
                        {logsData[key].myEmail}
                      </Table.Cell>
                      <Table.Cell>
                        {logsData[key].details}
                      </Table.Cell>
                      <Table.Cell>
                        {logsData[key].time}
                      </Table.Cell>
                      <Table.Cell>
                        {logsData[key].date}
                      </Table.Cell>
                    </Table.Row>
                  )
                  })}


              </Table.Body>

              </Table>
              </>
          )}
        </main>
      </div>
    </>
  );
}
