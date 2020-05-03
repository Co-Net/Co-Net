import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./App.css";
import leaguePhoto from "./leaguePhoto.jpg";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import mainStyles from "./main.module.css";
import InfoIcon from '@material-ui/icons/Info';
import Recommended from './Recommended';

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      games: [],
    };
  }

  componentDidMount() {
    // Easiest way is to get all active parties and grab the game id from there
    axios.get(`http://localhost:3001/party`).then((json) => {
      if (json.data.success) {
        const parties = json.data.partyObj;
        var updatedExistingGames = [];
        parties.forEach((party) => {
          var existingGameArr = updatedExistingGames.filter(
            (x) => x.gameID === party.gameID
          );
          // If game doesn't exist, create new game obj and add to existingGames
          if (existingGameArr.length === 0) {
            updatedExistingGames.push({
              gameID: party.gameID,
              title: party.game,
              numOfPlayers: party.partyMembers.length + 1,
            });
          } else {
            // If game already exists, then add players to # of players
            existingGameArr.forEach((game) => {
              var updatedGame = game;
              updatedGame.numOfPlayers += party.partyMembers.length + 1;
              updatedExistingGames.push(updatedGame);
            });
          }
        });
        // Go through the list of all active games and create a card for each
        var gameCards = [];

        // Sort games by num of players first
        updatedExistingGames.sort(function (a, b) {
          return a.numOfPlayers < b.numOfPlayers ? 1 : -1;
        });

        let promArr = updatedExistingGames.map(async function (eGame) {
          const json = await axios.get(
            `http://localhost:3001/games/id/${eGame.gameID}`
          );
          if (json.data.success) {
            const url = json.data.gameObj.url;
            var appID = url.search("/app/");
            if (appID !== -1) {
              var begin = url.substring(appID + 5);
              var end = begin.indexOf("/");
              appID = begin.substring(0, end);
              // Base: steamcdn-a.akamaihd.net/steam/apps/{app_id}/header.jpg
              var imageURL = `https://steamcdn-a.akamaihd.net/steam/apps/${appID}/header.jpg`;
              const cmp = (
                <Grid item xs={4} key={appID}>
                  <img className="photos" src={imageURL} />
                  <Typography
                    className={mainStyles.gametitle}
                    style={{
                      color: "black",
                      marginTop: 20,
                      marginLeft: 8,
                    }}
                  >
                    <Link href={`/game/${eGame.gameID}`}>{eGame.title}</Link>
                  </Typography>
                  <div style={{ display: "inline-flex" }}>
                    <Brightness1Icon
                      style={
                        eGame.numOfPlayers == 0
                          ? { color: "FF3200", marginTop: "4" }
                          : { color: "#26AD00", marginTop: "4" }
                      }
                    ></Brightness1Icon>
                    <Typography
                      style={{
                        color: "#535353",
                        marginTop: 5,
                        marginLeft: 8,
                      }}
                    >
                      {eGame.numOfPlayers == 1
                        ? eGame.numOfPlayers + " player"
                        : eGame.numOfPlayers + " players"}{" "}
                      playing now
                    </Typography>
                  </div>
                </Grid>
              );
              return cmp;
            }
          }
        });

        Promise.all(promArr)
          .then((res) => {
            res.forEach((cmp) => {
              gameCards.push(cmp);
            });
            this.setState({ games: gameCards });
          })
          .catch(function (err) {
            console.log("ERROR");
            console.log(err);
          });
      }
    });
  }

  render() {
    const theme = createMuiTheme({
      "@global": {
        body: {
          backgroundColor: "white",
        },
      },
    });

    const paperStyle = {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };

    const avatarStyle = {
      margin: 1,
      backgroundColor: "gray",
    };

    const formStyle = {
      width: "100%", // Fix IE 11 issue.
      marginTop: 3,
    };

    const submitStyle = {
      marginTop: 3,
      marginBottom: 0,
      marginRight: 2,
    };

    const tileStyle = {};

    const gridStyle = {
      marginTop: 20,
    };

    const titleStyle = {
      marginTop: 20,
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

    const { games } = this.state;

    return (
      <div>
        <TopMenu history={this.props.history}></TopMenu>
        <div className="content">
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography
                style={titleStyle}
                align="Left"
                variant="h4"
                component="h2"
              >
                Browse Games
              </Typography>
            </Grid>
            <Grid item xs = {5}>
            <Recommended></Recommended>
            </Grid>
            <Grid item xs={3}>
              <div style={{}}>
                <Button
                  size="large"
                  style={{
                    textTransform: "none",
                    marginTop: 28,
                    padding: 10,
                    marginRight: 40,
                    float: "right",
                  }}
                >
                  Filter by:
                  <FilterListIcon style={{ marginLeft: 20 }}></FilterListIcon>
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            {games}
          </Grid>
        </div>
      </div>
    );
  }
}

export default Feed;
