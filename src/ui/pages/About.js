import React, { useState, useEffect, useRef } from "react";
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemText,
  Fade,
  Button,
  Card,
  CardContent,
  Hidden
} from "@material-ui/core";

import Navigation from "../Navigation";

import "./styles.css";

export default function About() {
  let styles = {
    titletext: {
      textAlign: "center",
      fontWeight: "bold"
    },
    listtext: {
      textAlign: "center"
    },
    list: {
      minWidth: "100%"
    }
  };

  let listofAbouts = [
    {
      id: 1,
      name: "First About Service",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Etiam sit amet nisl purus in mollis nunc sed id. Pretium lectus quam id leo in vitae turpis massa. Eleifend quam adipiscing vitae proin sagittis nisl rhoncus mattis. Malesuada nunc vel risus commodo viverra maecenas accumsan lacus vel. Tellus at urna condimentum mattis pellentesque id. Nec ullamcorper sit amet risus nullam eget felis. In metus vulputate eu scelerisque felis. Nisl condimentum id venenatis a condimentum vitae sapien pellentesque. Viverra orci sagittis eu volutpat odio facilisis. Suspendisse sed nisi lacus sed viverra tellus in. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi. Pharetra diam sit amet nisl suscipit adipiscing bibendum est. Faucibus interdum posuere lorem ipsum dolor sit. Consectetur lorem donec massa sapien faucibus. Ullamcorper dignissim cras tincidunt lobortis. Aliquam id diam maecenas ultricies mi eget. Morbi tristique senectus et netus et malesuada fames ac. Commodo viverra maecenas accumsan lacus vel facilisis volutpat. In est ante in nibh mauris. Elementum eu facilisis sed odio morbi. Adipiscing elit ut aliquam purus. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Magna fermentum iaculis eu non diam phasellus vestibulum lorem. Urna id volutpat lacus laoreet non curabitur gravida arcu. Sed lectus vestibulum mattis ullamcorper velit sed. Sed blandit libero volutpat sed cras ornare arcu dui. Semper feugiat nibh sed pulvinar. Amet consectetur adipiscing elit pellentesque habitant morbi tristique senectus."
    },
    {
      id: 2,
      name: "Second About Service",
      description: "We do this 'second about service' "
    },
    {
      id: 3,
      name: "Third About Service",
      description: "We do this 'third about service' "
    }
  ];

  const [openList, setOpenList] = useState("empty");
  const txt1 = useRef(null);
  function handleListClick(props) {
    if (props.id === openList.id) setOpenList("empty");
    else setOpenList(props);
  }
  useEffect(() => {
    if (txt1.current !== null) {
      window.scrollTo({
        behaviour: "smooth",
        top: txt1.current.offsetTop
      });
    }
  });

  return (
    <>
      <Navigation mainpage="About" />
      <Paper elevation={10}>
        <Typography variant="h6" style={styles.titletext}>
          About
          <Grid container>
            <Grid item xs={12} md={6}>
              <List style={styles.list}>
                {listofAbouts.map((item, key) => {
                  return (
                    <ListItem
                      button
                      style={styles.listtext}
                      key={key}
                      selected={openList.name === item.name}
                      onClick={() => handleListClick(item)}
                    >
                      <ListItemText>
                        <Typography variant="h6">{item.name}</Typography>
                      </ListItemText>
                    </ListItem>
                  );
                })}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              {openList !== "empty" && (
                <>
                  <Card variant="elevation">
                    <CardContent>
                      <Fade in={true} timeout={1500}>
                        <Typography variant="subtitle2">
                          <div disabled ref={txt1} tabIndex="-1">
                            <Paper
                              style={{ height: "250px", overflow: "scroll" }}
                            >
                              {openList.description}
                            </Paper>
                          </div>
                        </Typography>
                      </Fade>
                      <div>
                        <Button variant="contained" color="secondary">
                          <Typography
                            variant="button"
                            onClick={() => setOpenList("empty")}
                          >
                            Close
                          </Typography>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
              {openList === "empty" && (
                <Hidden smDown>
                  <Typography variant="h6">Select a service</Typography>
                </Hidden>
              )}
            </Grid>
          </Grid>
        </Typography>
      </Paper>
    </>
  );
}
