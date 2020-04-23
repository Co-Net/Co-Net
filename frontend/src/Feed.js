import React, { Component } from "react";
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
import mainStyles from "./main.module.css";

class Feed extends Component {
  constructor(props) {
    super(props);
    this.pushHistory = this.pushHistory.bind(this);
  }

  pushHistory() {
    this.props.history.push("/game");
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

    return (
      <div>
        <TopMenu history={this.props.history}></TopMenu>
        <div className="content">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                style={titleStyle}
                align="Left"
                variant="h4"
                component="h2"
              >
                Browse Games
              </Typography>
            </Grid>
            <Grid item xs={6}>
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
            <Grid item xs={4}>
              <img className="photos" src={leaguePhoto} />
              <Typography
                className={mainStyles.gametitle}
                style={gameTitle}
                onClick={this.pushHistory}
              >
                League of Legends
              </Typography>
              <div style={{ display: "inline-flex" }}>
                <Brightness1Icon
                  style={{ color: "#26AD00", marginTop: "4" }}
                ></Brightness1Icon>
                <Typography style={gameDesc}>
                  1492 players looking now
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className="photos" src={leaguePhoto} />
              <Typography
                className={mainStyles.gametitle}
                style={gameTitle}
                onClick={this.pushHistory}
              >
                League of Legends
              </Typography>
              <div style={{ display: "inline-flex" }}>
                <Brightness1Icon
                  style={{ color: "#26AD00", marginTop: "4" }}
                ></Brightness1Icon>
                <Typography style={gameDesc}>
                  1492 players looking now
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className="photos" src={leaguePhoto} />
              <Typography
                className={mainStyles.gametitle}
                style={gameTitle}
                onClick={this.pushHistory}
              >
                League of Legends
              </Typography>
              <div style={{ display: "inline-flex" }}>
                <Brightness1Icon
                  style={{ color: "#26AD00", marginTop: "4" }}
                ></Brightness1Icon>
                <Typography style={gameDesc}>
                  1492 players looking now
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className="photos" src={leaguePhoto} />
              <Typography
                className={mainStyles.gametitle}
                style={gameTitle}
                onClick={this.pushHistory}
              >
                League of Legends
              </Typography>
              <div style={{ display: "inline-flex" }}>
                <Brightness1Icon
                  style={{ color: "#26AD00", marginTop: "4" }}
                ></Brightness1Icon>
                <Typography style={gameDesc}>
                  1492 players looking now
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className="photos" src={leaguePhoto} />
              <Typography
                className={mainStyles.gametitle}
                style={gameTitle}
                onClick={this.pushHistory}
              >
                League of Legends
              </Typography>
              <div style={{ display: "inline-flex" }}>
                <Brightness1Icon
                  style={{ color: "#26AD00", marginTop: "4" }}
                ></Brightness1Icon>
                <Typography style={gameDesc}>
                  1492 players looking now
                </Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              <img className="photos" src={leaguePhoto} />
              <Typography
                className={mainStyles.gametitle}
                style={gameTitle}
                onClick={this.pushHistory}
              >
                League of Legends
              </Typography>
              <div style={{ display: "inline-flex" }}>
                <Brightness1Icon
                  style={{ color: "#26AD00", marginTop: "4" }}
                ></Brightness1Icon>
                <Typography style={gameDesc}>
                  1492 players looking now
                </Typography>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Feed;
