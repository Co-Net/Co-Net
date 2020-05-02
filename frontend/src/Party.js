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

export const TagSelectedComponent = ({ hit }) => (
  <Fragment>
    <code>{hit.name}</code>
  </Fragment>
);

export const TagSuggestionComponent = ({ hit }) => (
  <Fragment>{hit.name}</Fragment>
);

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
    if (!selectedGame) {
      alert("Please choose a game");
      return;
    }
    if (!max) {
      alert("Please select max players");
    }
    axios
      .post(`http://localhost:3001/party/create`, {
        partyLeader: props.username,
        gameID: selectedGame._id,
        maxPlayers: max,
      })
      .then((json) => {
        if (json.data.success) {
          handleClose();
          setPartyCreated(true);
        }
      });
  };

  const handleCancel = () => {
    handleClose();
  };

  React.useEffect(() => {
    if (partyCreated) {
      setRedirect(true);
    }
  }, [partyCreated])

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
      <Typography className="menuButtons" onClick={handleClickOpenUp}>
        Create Party
      </Typography>
      {redirect ? <Redirect to={`/game/${selectedGame._id}`}></Redirect> : null}
      <Dialog
        maxWidth="sm"
        open={open1}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{"Create a Party"}</DialogTitle>
        <DialogContent className={styles.dialogBox}>
          <div>
            <InstantSearch searchClient={client} indexName="co-net_games">
              <Index indexName="co-net_games">
                <Tags
                  selectedTagComponent={TagSelectedComponent}
                  suggestedTagComponent={TagSuggestionComponent}
                  onAddTag={onAddTag}
                  onUpdate={onTagsUpdated}
                  limitTo={1}
                  translations={{
                    placeholder: "Game Name",
                    noResult: "Game not found.",
                  }}
                />
              </Index>
            </InstantSearch>
          </div>
          <Typography className={styles.centerText}>Party Size</Typography>
          <Slider
            aria-labelledby="discrete-slider-custom"
            step={1}
            min={2}
            max={10}
            onChange={(e, value) => (max = value)}
            marks={marks}
          />
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
