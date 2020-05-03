import React, { Fragment, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./main.module.css";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import TextField from "@material-ui/core/TextField";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import InfoIcon from "@material-ui/icons/Info";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import * as fuzz from "fuzzball";

export default function AlertDialog() {
  const [open1, setOpen1] = React.useState(false);
  const [suggestedGame, setSuggestedGame] = React.useState("");
  const [timeElapsed, setTimeElapsed] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [startTime, setStartTime] = React.useState("");
  const [games, setGames] = React.useState([]);
  // var games = [];

  useEffect(() => {
    if (games.length != 0 && loading) handlePickGame();
  }, [games]);

  const handleClickOpenUp = () => {
    setOpen1(true);
    if (!suggestedGame) handleSuggestGame();
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleDone = () => {
    handleClose();
  };

  const handleSuggestGame = () => {
    console.log("suggesting");
    // Start Analysis time
    setStartTime(new Date());
    axios
      .get(`http://localhost:3001/user/currentuser`, { withCredentials: true })
      .then((json) => {
        if (json.data.username === "Guest") {
          alert("You must be signed in.");
          handleClose();
          return;
        }

        if (json.data.games.length < 3) {
          alert("You must have at least 3 games in your library.");
          handleClose();
          return;
        }
        var userGameTags = [];
        json.data.games.forEach((game) => {
          // For each game in their library, collect each game tags and accumulate them
          userGameTags = userGameTags.concat(game.gameTags);
        });
        // Perform Data Analysis
        axios.get(`http://localhost:3001/games/`).then((json) => {
          if (json.data.success) {
            var highScoringGames = [];
            json.data.gameObj.forEach((game) => {
              let score = fuzz.token_set_ratio(
                userGameTags.join(" "),
                game.gameTags.join(" ")
              );
              if (score >= 90) {
                highScoringGames.push(game);
              }
            });
            // games = highScoringGames;
            setGames(highScoringGames);
          }
        });
      });
  };

  const handlePickGame = () => {
    console.log("picking");
    let gameList = games;
    if (gameList.length == 0) {
      const cmp = (
        <Grid item xs={8}>
          <Typography
            className={styles.gametitle}
            style={{
              color: "black",
              marginTop: 5,
            }}
          >
            {
              "Sorry, there are no more games to suggest. Add more games to your library for better analysis."
            }
          </Typography>
        </Grid>
      );
      setSuggestedGame(cmp);
      setTimeElapsed(Math.round(timeDiff));
      setLoading(false);
      return;
    }
    // Randomly choose a game, then remove it so it doesn't get chosen again
    let randIndex = Math.floor(Math.random() * gameList.length);
    // const randomElement = gameList[Math.floor(Math.random() * gameList.length)];
    let selectedGame = gameList.splice(randIndex, 1)[0];
    // Get Game Fields
    const title = selectedGame.name;
    const url = selectedGame.url;
    const gameID = selectedGame._id;
    let image =
      "https://www.hutchinsonutilities.com/wp-content/themes/Hutchinson/images/404.jpg";
    var appID = url.search("/app/");
    if (appID !== -1) {
      var begin = url.substring(appID + 5);
      var end = begin.indexOf("/");
      appID = begin.substring(0, end);
      // Base: steamcdn-a.akamaihd.net/steam/apps/{app_id}/header.jpg
      image = `https://steamcdn-a.akamaihd.net/steam/apps/${appID}/header.jpg`;
    }
    // Get num of players playing
    var numOfPlayersPlaying = 0;
    axios.get(`http://localhost:3001/party/game/${gameID}`).then((json) => {
      if (json.data.parties.length > 0) {
        json.data.parties.forEach((party) => {
          numOfPlayersPlaying += party.partyMembers.length + 1;
        });
      }
    });
    const cmp = (
      <Grid item xs={8}>
        <img className="photos" src={image} />
        <Typography
          className={styles.gametitle}
          style={{
            color: "black",
            marginTop: 5,
          }}
        >
          <Link href={`/game/${gameID}`}>{title}</Link>
        </Typography>
        <div style={{ display: "inline-flex" }}>
          <Brightness1Icon
            style={{ color: "#26AD00", marginTop: "4" }}
          ></Brightness1Icon>
          <Typography
            style={{
              color: "#535353",
              marginTop: 5,
              marginLeft: 8,
            }}
          >
            {numOfPlayersPlaying}{" "}
            {numOfPlayersPlaying != 1 ? "players" : "player"} playing now
          </Typography>
        </div>
      </Grid>
    );
    setSuggestedGame(cmp);

    // If analyzing
    if (loading) {
      // End Analysis time
      var endTime = new Date();
      var timeDiff = endTime - startTime; //in ms
      // strip the ms
      timeDiff /= 1000;
      // get seconds
      setTimeElapsed(Math.round(timeDiff));
      setLoading(false);
    } else {
      setTimeElapsed(null);
    }
    setGames(gameList);
  };

  const style = {
    multiselectContainer: {
      textAlign: "center",
    },
    chips: {},
    searchBox: {
      fontSize: "15px",
      fontFamily: "Segoe UI",
    },
    inputField: {
      fontSize: "15px",
    },
    multiselectContainer: {},
  };

  return (
    <div style={{ display: "inline" }}>
      <Button
        onClick={handleClickOpenUp}
        className={styles.lowerCase}
        variant="contained"
        color="secondary"
      >
        Games for You<InfoIcon style={{ marginLeft: 5 }}></InfoIcon>
      </Button>

      <Dialog
        maxWidth="sm"
        open={open1}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialogBoxLarge}
      >
        <DialogTitle id="alert-dialog-title">
          {"Recommended Game for You:"}
        </DialogTitle>
        {loading ? (
          <DialogContent>
            <div>
              <Grid>{"Looking for a fun game for you..."}</Grid>
            </div>
          </DialogContent>
        ) : (
          <div>
            <DialogContent style={{ paddingTop: "0px" }}>
              <div>
                <Grid>
                  <Grid item xs={2}></Grid>
                  {suggestedGame}
                  <Grid item xs={2}></Grid>
                  {timeElapsed ? (
                    <em>{`Analysis Time: ${timeElapsed} seconds`}</em>
                  ) : null}
                </Grid>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePickGame} color="primary">
                Refresh Recommendation
              </Button>
              <Button
                id="createPartyDone"
                onClick={handleDone}
                color="primary"
                autoFocus
              >
                Got it
              </Button>
            </DialogActions>
          </div>
        )}
      </Dialog>
    </div>
  );
}
