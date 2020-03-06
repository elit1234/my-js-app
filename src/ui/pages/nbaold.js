import _ from "lodash";

import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Tabs,
  Tab
} from "@material-ui/core";

import { Table as STable } from "semantic-ui-react";

import * as MyData from "./objects/data";

import Navigation from "../Navigation";

import "./nbastyles.css";

import Data from "./objects/data/full_schedule.json";
import { FirstGame, SecondGame } from "./objects/data";
import "./styles.css";
export default function NBA() {
  const [clickedMonth, setClickedMonth] = useState(false);
  const [listOfGames, setListOfGames] = useState({});
  const [selectedGame, setSelectedGame] = useState();
  const myData = Data.lscd;

  const [tabValue, setTabValue] = useState(0);

  const [sorted, setSorted] = useState("");
  const [sortedDirection, setSortedDirection] = useState("ascending");
  function handleSort(props) {
    console.log(props);
    console.log("sorted state: " + sorted);
    setSorted(props);
    console.log("new sorted state: " + sorted);
  }

  function handleMonthClick(props) {
    console.log("handleMonthClick");

    setSelectedGame("");
    setListOfGames(props.mscd.g);
    setClickedMonth(props);
  }

  async function fetchBoxScore(props) {
    console.log("fetching");

    console.log(props);
    const filePath = `./objects/data/${props}_gamedetail.json`;
    const dataFile = await import(filePath);

    await console.log(dataFile);
    setSelectedGame(dataFile);
  }
  function handleGameRowClick(props) {
    const clickedGame = props.gid;
    //console.log(clickedGame);
    if (clickedGame === FirstGame.g.gid) {
      console.log("firstGame");
      setSelectedGame(FirstGame);
    } else if (clickedGame === SecondGame.g.gid) {
      console.log("secondgame");
      setSelectedGame(SecondGame);
    } else {
      setSelectedGame();
      //console.log("unsupported game gid " + clickedGame);
      let url =
        "https://data.nba.com/data/10s/v2015/json/mobile_teams/nba/2019/scores/gamedetail/" +
        clickedGame +
        "_gamedetail.json";
      fetchBoxScore(clickedGame);
      //console.log(url);
    }
  }
  //console.log(FirstGame);
  //console.log(SecondGame);

  console.log(tabValue);

  return (
    <>
      <Navigation mainpage="NBA" />

      <Typography variant="h6">NBA page</Typography>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1">Pick a month</Typography>

          {myData.map((index, key) => {
            return (
              <Button
                disabled={
                  clickedMonth && clickedMonth.mscd.mon === index.mscd.mon
                    ? true
                    : false
                }
                variant="contained"
                color="primary"
                key={key}
                onClick={() => handleMonthClick(index)}
              >
                <Typography variant="button" key={key}>
                  {index.mscd.mon}{" "}
                </Typography>
              </Button>
            );
          })}
        </Grid>
        {myData && (
          <>
            {listOfGames && !selectedGame && (
              <>
                <TableContainer component={Paper}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Home Team</TableCell>
                        <TableCell>Away Team</TableCell>
                        <TableCell>Game Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {listOfGames.length > 0 &&
                        listOfGames.map((index, key) => {
                          return (
                            <TableRow
                              key={key}
                              onClick={() => handleGameRowClick(index)}
                            >
                              <TableCell>
                                {index.h.tc} {index.h.tn}
                              </TableCell>

                              <TableCell>
                                {index.v.tc} {index.v.tn}
                              </TableCell>
                              <TableCell>{index.gdte}</TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}

            {selectedGame && (
              <>
                {console.log(selectedGame)}
                <Grid item md={1} />
                <Grid item xs={12} md={10}>
                  <Paper elevation={3}>
                    <Grid item xs={12}>
                      <Button color="primary" onClick={() => setSelectedGame()}>
                        Back to month
                      </Button>
                      <div className="boxscore-title">
                        <Typography variant="h6">
                          {selectedGame.g.hls.tn} @ {selectedGame.g.vls.tn} on{" "}
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
                    <Tab label="Home" />
                    <Tab label="Away" />
                  </Tabs>
                </Grid>
                {tabValue === 0 && (
                  <>
                    <STable sortable celled fixed>
                      <STable.Header>
                        <STable.Row>
                          <STable.HeaderCell onClick={() => handleSort("name")}>
                            Name
                          </STable.HeaderCell>
                          <STable.HeaderCell
                            sorted={"descending"}
                            onClick={() => handleSort("minutes")}
                          >
                            Minutes
                          </STable.HeaderCell>
                        </STable.Row>
                      </STable.Header>
                      <STable.Body>
                        {selectedGame.g.vls.pstsg.map((index, key) => {
                          return (
                            <STable.Row key={key}>
                              <STable.Cell>
                                {index.fn} {index.ln}
                              </STable.Cell>
                              <STable.Cell sorted={"ascending"}>
                                {index.min}
                              </STable.Cell>
                            </STable.Row>
                          );
                        })}
                      </STable.Body>
                    </STable>
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table size="small">
                          <TableHead>
                            <TableRow>
                              <TableCell>
                                <TableSortLabel active={true}>
                                  Name
                                </TableSortLabel>
                              </TableCell>
                              <TableCell>Minutes</TableCell>
                              <TableCell>Points</TableCell>
                              <TableCell>Assists</TableCell>
                              <TableCell>Rebounds</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {selectedGame.g.vls.pstsg.map((index, key) => {
                              return (
                                <TableRow>
                                  <TableCell>
                                    {index.fn} {index.ln}
                                  </TableCell>
                                  <TableCell>{index.min}</TableCell>
                                  <TableCell>{index.pts}</TableCell>
                                  <TableCell>{index.ast}</TableCell>
                                  <TableCell>{index.reb}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </>
                )}
                {tabValue === 1 && (
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Minutes</TableCell>
                            <TableCell>Points</TableCell>
                            <TableCell>Assists</TableCell>
                            <TableCell>Rebounds</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedGame.g.hls.pstsg.map((index, key) => {
                            return (
                              <TableRow>
                                <TableCell>
                                  {index.fn} {index.ln}
                                </TableCell>
                                <TableCell>{index.min}</TableCell>
                                <TableCell>{index.pts}</TableCell>
                                <TableCell>{index.ast}</TableCell>
                                <TableCell>{index.reb}</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                )}
              </>
            )}
          </>
        )}
      </Grid>
    </>
  );
}
