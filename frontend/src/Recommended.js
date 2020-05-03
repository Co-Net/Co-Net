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
import { InstantSearch, Index } from "react-instantsearch-dom";
import Tags from "./lib/Tags";
import algoliasearch from "algoliasearch/lite";
import "./tags.css";
import { Redirect } from "react-router-dom";
import InfoIcon from '@material-ui/icons/Info';
import leaguePhoto from './leaguePhoto.jpg'
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Brightness1Icon from "@material-ui/icons/Brightness1";



export default function AlertDialog(props) {
  const [open1, setOpen1] = React.useState(false);
  const [partyCreated, setPartyCreated] = React.useState(false);
  const [selectedGame, setSelectedGame] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

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

  const marks = [
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
    {
      value: 9,
      label: "9",
    },
    {
      value: 10,
      label: "10",
    },
  ];

  // Game Selection
  const client = algoliasearch(
    "T7MES4D4M7",
    "3fc5bf346a8a53b2ef1c596cf747cb02"
  );

  const onAddTag = (hit) => {
    return hit;
  };

  const onTagsUpdated = (actualTags, previousTags) => {
    setSelectedGame(actualTags[0]);
  };

  var max;
  return (
    <div style={{ display: "inline" }}>
    <Button  onClick={handleClickOpenUp} className = {styles.lowerCase} variant = "contained" color = "secondary">
    Games for You<InfoIcon style = {{marginLeft: 5,}}></InfoIcon></Button>

      {redirect ? <Redirect to={`/game/${selectedGame._id}`}></Redirect> : null}
      <Dialog
        maxWidth="sm"
        open={open1}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialogBoxLarge}
      >
        <DialogTitle id="alert-dialog-title">{"Recommended Game for You:"}</DialogTitle>
        <DialogContent >
          <div>
          <Grid contained>
          <Grid item xs = {2}></Grid>
          <Grid item xs = {8}>
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
            >2
              playing now
            </Typography>
          </div>
          </Grid>
          <Grid item xs = {2}></Grid>
         
        </Grid>
          
          </div>
         
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button id="createPartyDone" onClick={handleDone} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
