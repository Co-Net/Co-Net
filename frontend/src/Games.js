import React, { Component, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./App.css";
import leaguePhoto from "./leaguePhoto.jpg";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AddGames from "./AddGames";

export default function Games(props) {
  const [gameLibrary, setGameLibrary] = useState([]);
  const [rawLibrary, setRawLibrary] = useState([]);
  const [gameAdded, setGameAdded] = useState(false);

  useEffect(() => {
    // Get game library of user
    if (!props.username) return;
    axios.get(`http://localhost:3001/users/${props.username}`).then((json) => {
      if (json.data.games) {
        const library = json.data.games;
        setRawLibrary(library);
        var gameCards = [];
        // Create a game card component for each game in the library
        let promArr = library.map(async function (eGame) {
          const json = await axios.get(
            `http://localhost:3001/games/id/${eGame.gameID}`
          );
          const partyJson = await axios.get(`http://localhost:3001/party`);
          if (json.data.success && partyJson.data.success) {
            // Go through all active parties and check if game (eGame) is being played
            // If yes, grab the num of players playing that game
            // If not being played, set to 0
            const parties = partyJson.data.partyObj;
            let playersPlaying = 0;
            // Grab parties playing the game
            let partiesPlaying = parties.filter(
              (p) => p["gameID"] === eGame.gameID
            );
            partiesPlaying.forEach((partyPlaying) => {
              // Get num of players and accumulate them
              playersPlaying =
                playersPlaying + partyPlaying.partyMembers.length + 1;
            });
            const url = json.data.gameObj.url;
            var appID = url.search("/app/");
            if (appID !== -1) {
              var begin = url.substring(appID + 5);
              var end = begin.indexOf("/");
              appID = begin.substring(0, end);
              // Base: steamcdn-a.akamaihd.net/steam/apps/{app_id}/header.jpg
              var imageURL = `https://steamcdn-a.akamaihd.net/steam/apps/${appID}/header.jpg`;
              const cmp = (
                <Grid item xs={4} key={eGame.gameID}>
                  <img className="photos" src={imageURL} />
                  <Typography style={gameTitle}>
                    <Link href={`/game/${eGame.gameID}`}>{eGame.name}</Link>
                  </Typography>
                  <div style={{ display: "inline-flex" }}>
                    <Brightness1Icon
                      style={
                        playersPlaying == 0
                          ? { color: "FF3200", marginTop: "4" }
                          : { color: "#26AD00", marginTop: "4" }
                      }
                    ></Brightness1Icon>
                    <Typography style={gameDesc}>
                      {playersPlaying == 1
                        ? "1 player "
                        : playersPlaying + " players "}
                      playing now{" "}
                    </Typography>
                  </div>
                </Grid>
              );
              return cmp;
            }
          } else {
            console.log("Something went wrong while retrieving game library");
          }
        });

        Promise.all(promArr)
          .then((res) => {
            res.forEach((cmp) => {
              gameCards.push(cmp);
            });
            setGameLibrary(gameCards);
          })
          .catch(function (err) {
            console.log("ERROR");
            console.log(err);
          });
      }
    });
  }, [props.username, gameAdded]);

  const titleStyle = {
    marginBottom: 20,
    color: "#535353",
  };

  const gameTitle = {
    color: "black",
    marginTop: 20,
    marginLeft: 8,
  };
  const gameDesc = {
    color: "#535353",
    marginTop: 5,
    marginLeft: 8,
  };

  return (
    <div className="content">
      <Grid container spacing={3}>
        <Typography style={titleStyle} align="Left" variant="h6" component="h2">
          {props.title}
        </Typography>
        {props.isCurrentUser ? (
          <AddGames library={rawLibrary} onGameAdd={() => setGameAdded(true)} username={props.username}></AddGames>
        ) : null}
      </Grid>
      <Grid container spacing={3}>
        {gameLibrary ? gameLibrary : "You haven't added any games yet."}
      </Grid>
    </div>
  );
}
