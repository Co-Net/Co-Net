import React, { Fragment } from "react";
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
import leaguePhoto from "./leaguePhoto.jpg";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import * as fuzz from 'fuzzball';

export default function AlertDialog(props) {
  const [open1, setOpen1] = React.useState(false);
  const [games, setGames] = React.useState([]);

  const handleClickOpenUp = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleDone = () => {
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  const handleSuggestGame = () => {
    axios.get(`http://localhost:3001/user/currentuser`)
    .then((json) => {
      if (json.data.username === 'Guest') {
        alert("You must be signed in.");
        return;
      }
      if (json.data.success) {
        if (json.data.games.length < 3) {
          alert("You must have at least 3 games in your library.");
          return;
        }
        var userGameTags = [];
        json.data.games.forEach((game) => {
          // For each game in their library, collect each game tags and accumulate them
          userGameTags = userGameTags.concat(game.gameTags);
        });
        console.log(userGameTags);
        // Perform Data Analysis
        axios.get(`http://localhost:3001/games`)
        .then((json) => {
          if (json.data.success) {
            var highScoringGames = [];
            json.data.gameObj.forEach((game) => {
              let score = fuzz.token_set_ratio(userGameTags.join(" "), game.gameTags.join(" "));
              if (score >= 70) highScoringGames.push(game);
            });
            setGames(highScoringGames);
          }
        })
      }
    });
  }

  const handlePickGame = () => {
    const gameList = games;
    // Randomly choose a game, then remove it so it doesn't get chosen again
    const randomElement = gameList[Math.floor(Math.random() * gameList.length)];
    setGames(gameList.filter(x => x.name !== randomElement.name));
    return randomElement;
  }

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
        <DialogContent>
          <div>
            <Grid contained>
              <Grid item xs={2}></Grid>
              <Grid item xs={8}>
                <img className="photos" src={leaguePhoto} />
                <Typography
                  className={styles.gametitle}
                  style={{
                    color: "black",
                    marginTop: 20,
                    marginLeft: 8,
                  }}
                >
                  <Link>Terraria</Link>
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
                    2 playing now
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Refresh Recommendation
          </Button>
          <Button id="createPartyDone" onClick={handleDone} color="primary" autoFocus>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
