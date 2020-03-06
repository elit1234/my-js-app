import nba from "nba";

import React, { useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Grid,
  Tabs,
  Tab,
  Snackbar
} from "@material-ui/core";

import { Table } from "semantic-ui-react";

import Navigation from "../Navigation";

import { Redirect } from "react-router-dom";

import { firebaseApp } from "../../config/firebase.js";

import "./nbastyles.css";

import Data from "./objects/data/full_schedule.json";
import "./styles.css";
export default function NBAPage() {
  const [clickedMonth, setClickedMonth] = useState(false);
  const [listOfGames, setListOfGames] = useState({});
  const [selectedGame, setSelectedGame] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const myData = Data.lscd;

  if (firebaseApp.auth().currentUser === null) return <Redirect to="/login" />;

  function handlePlayerRowClick(props) {
    const name = `${props.fn} ${props.ln}`;
    const data = nba.findPlayer(name);
    return console.log(data);
  }

  function handleSnackbarClose() {
    return setSnackbarOpen(false);
  }

  function handleMonthClick(props) {
    setSelectedGame("");
    setListOfGames(props);
  }

  async function fetchBoxScore(props) {
    console.log("clicked");
    const proxyURL = "https://cors-anywhere.herokuapp.com/",
      testURL = `https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/scores/gamedetail/${props}_gamedetail.json`;

    await fetch(proxyURL + testURL)
      .then(blob => blob.json())
      .then(data => {
        console.log(data);
        setSelectedGame(data);
        return data;
      })
      .catch(e => {
        setSnackbarOpen(true);
        return e;
      });
  }

  async function handleGameRowClick(props) {
    const clickedGame = props.gid;
    setSelectedGame();
    await fetchBoxScore(clickedGame);
  }

  return (
    <>
      <Navigation mainpage="NBA" />

      <Typography variant="h6">NBA page</Typography>
      <Grid container>
        <Grid item xs={12}>
          {!clickedMonth && (
            <Typography variant="subtitle1">Pick a month</Typography>
          )}
          <Tabs
            value={clickedMonth}
            onChange={(event, newValue) => {
              setClickedMonth(newValue);
            }}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
          >
            {myData.map((index, key) => {
              return (
                <Tab
                  label={index.mscd.mon}
                  key={key}
                  onClick={() => handleMonthClick(index)}
                />
              );
            })}
          </Tabs>
        </Grid>
        {myData && (
          <>
            {listOfGames && !selectedGame && (
              <>
                <Snackbar
                  open={snackbarOpen}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left"
                  }}
                  onClose={handleSnackbarClose}
                  autoHideDuration={2000}
                  message="This game is not available!"
                />
                <Table striped fixed unstackable>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Away Team</Table.HeaderCell>
                      <Table.HeaderCell>Home Team</Table.HeaderCell>
                      <Table.HeaderCell>Game Score</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {listOfGames.mscd &&
                      listOfGames.mscd.g.map((index, key) => {
                        return (
                          <Table.Row
                            key={key}
                            onClick={() => handleGameRowClick(index)}
                          >
                            <Table.Cell>
                              {index.v.tc} {index.v.tn}
                            </Table.Cell>
                            <Table.Cell>
                              {index.h.tc} {index.h.tn}
                            </Table.Cell>

                            
                            <Table.Cell>{index.gdte}</Table.Cell>
                          </Table.Row>
                        );
                      })}
                  </Table.Body>
                </Table>
              </>
            )}
            {selectedGame && (
              <>
                {console.log(selectedGame)}
                <Grid item md={1} />
                <Grid item xs={12} md={10}>
                  <Paper elevation={3} className="bosxcore-top">
                    <Grid item xs={12}>
                      <Button color="primary" onClick={() => setSelectedGame()}>
                        Back to month
                      </Button>
                      <div className="boxscore-title">
                        <Typography variant="h6">
                          {selectedGame.g.vls.tn} @ {selectedGame.g.hls.tn} on{" "}
                          {selectedGame.g.gdte}
                        </Typography>
                      </div>
                    </Grid>
                    <Grid container className="boxscore-teamscores">
                      <Grid item xs={6} className="boxscore-teamscore">
                        <div>
                          {selectedGame.g.hls.tn} score:{" "}
                          {selectedGame.g.lpla.hs}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-homescore">
                        <div>
                          {selectedGame.g.vls.tn} score:{" "}
                          {selectedGame.g.lpla.vs}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-teamscore">
                        <div>
                          {selectedGame.g.hls.tn} FGM/FGA:{" "}
                          {selectedGame.g.hls.tstsg.fgm}/
                          {selectedGame.g.hls.tstsg.fga}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-homescore">
                        <div>
                          {selectedGame.g.vls.tn} FGM/FGA:{" "}
                          {selectedGame.g.vls.tstsg.fgm}/
                          {selectedGame.g.vls.tstsg.fga}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-teamscore">
                        <div>
                          {selectedGame.g.hls.tn} 3PM/3PA:{" "}
                          {selectedGame.g.hls.tstsg.tpm}/
                          {selectedGame.g.hls.tstsg.tpa}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-homescore">
                        <div>
                          {selectedGame.g.vls.tn} 3PM/3PA:{" "}
                          {selectedGame.g.vls.tstsg.tpm}/
                          {selectedGame.g.vls.tstsg.tpa}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-teamscore">
                        <div>
                          {selectedGame.g.hls.tn} Assists:{" "}
                          {selectedGame.g.hls.tstsg.ast}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-homescore">
                        <div>
                          {selectedGame.g.vls.tn} Assists:{" "}
                          {selectedGame.g.vls.tstsg.ast}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-teamscore">
                        <div>
                          {selectedGame.g.hls.tn} Rebounds:{" "}
                          {selectedGame.g.hls.tstsg.reb}
                        </div>
                      </Grid>
                      <Grid item xs={6} className="boxscore-homescore">
                        <div>
                          {selectedGame.g.vls.tn} Rebounds:{" "}
                          {selectedGame.g.vls.tstsg.reb}
                        </div>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Tabs
                    value={tabValue}
                    onChange={(event, newValue) => {
                      setTabValue(newValue);
                    }}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label={selectedGame.g.vls.tn + " (Home)"} />
                    <Tab label={selectedGame.g.hls.tn + " (Away)"} />
                  </Tabs>
                </Grid>
                {tabValue === 0 && (
                  <>
                    <div style={{ minWidth: "100%", overflowX: "scroll" }}>
                      <Table
                        sortable
                        unstackable
                        striped
                        style={{ overFlow: "scroll" }}
                      >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>MIN</Table.HeaderCell>
                            <Table.HeaderCell>PTS</Table.HeaderCell>
                            <Table.HeaderCell>REB</Table.HeaderCell>
                            <Table.HeaderCell>ASST</Table.HeaderCell>
                            <Table.HeaderCell>BLK</Table.HeaderCell>
                            <Table.HeaderCell>STL</Table.HeaderCell>
                            <Table.HeaderCell>FGM/FGA</Table.HeaderCell>
                            <Table.HeaderCell>3PM/3PA</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {selectedGame.g.vls.pstsg.map((index, key) => {
                            return (
                              <Table.Row
                                key={key}
                                onClick={() => handlePlayerRowClick(index)}
                              >
                                <Table.Cell>
                                  {index.fn} {index.ln}
                                </Table.Cell>
                                <Table.Cell>{index.min}</Table.Cell>
                                <Table.Cell>{index.pts}</Table.Cell>
                                <Table.Cell>{index.reb}</Table.Cell>
                                <Table.Cell>{index.ast}</Table.Cell>
                                <Table.Cell>{index.blk}</Table.Cell>
                                <Table.Cell>{index.stl}</Table.Cell>
                                <Table.Cell>
                                  {index.fgm}/{index.fga}
                                </Table.Cell>
                                <Table.Cell>
                                  {index.tpm}/{index.tpa}
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
                    </div>
                  </>
                )}
                {tabValue === 1 && (
                  <>
                    <div style={{ minWidth: "100%", overflowX: "scroll" }}>
                      <Table
                        sortable
                        unstackable
                        striped
                        style={{ overFlow: "scroll" }}
                      >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>MIN</Table.HeaderCell>
                            <Table.HeaderCell>PTS</Table.HeaderCell>
                            <Table.HeaderCell>REB</Table.HeaderCell>
                            <Table.HeaderCell>ASST</Table.HeaderCell>
                            <Table.HeaderCell>BLK</Table.HeaderCell>
                            <Table.HeaderCell>STL</Table.HeaderCell>
                            <Table.HeaderCell>FGM/FGA</Table.HeaderCell>
                            <Table.HeaderCell>3PM/3PA</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {selectedGame.g.hls.pstsg.map((index, key) => {
                            return (
                              <Table.Row
                                key={key}
                                onClick={() => handlePlayerRowClick(index)}
                              >
                                <Table.Cell>
                                  {index.fn} {index.ln}
                                </Table.Cell>
                                <Table.Cell>{index.min}</Table.Cell>
                                <Table.Cell>{index.pts}</Table.Cell>
                                <Table.Cell>{index.reb}</Table.Cell>
                                <Table.Cell>{index.ast}</Table.Cell>
                                <Table.Cell>{index.blk}</Table.Cell>
                                <Table.Cell>{index.stl}</Table.Cell>
                                <Table.Cell>
                                  {index.fgm}/{index.fga}
                                </Table.Cell>
                                <Table.Cell>
                                  {index.tpm}/{index.tpa}
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
                    </div>
                  </>
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
}
