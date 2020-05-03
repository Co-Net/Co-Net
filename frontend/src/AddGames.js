import React, { Component, Fragment } from "react";
import { InstantSearch, Index } from "react-instantsearch-dom";
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
import algoliasearch from "algoliasearch/lite";
import Tags from "./lib/Tags";
import "./tags.css";
import axios from "axios";

export const TagSelectedComponent = ({ hit }) => (
  <Fragment>
    <code>{hit.name}</code>
  </Fragment>
);

export const TagSuggestionComponent = ({ hit, exists }) =>
  exists ? (
    <Fragment>
      <strike>{hit.name}</strike>
    </Fragment>
  ) : (
    <Fragment>{hit.name}</Fragment>
  );

class AddGames extends Component {
  constructor(props) {
    super(props);
    this.handleClickOpenUp = this.handleClickOpenUp.bind(this);
    this.handleSaveGames = this.handleSaveGames.bind(this);

    this.state = {
      open1: false,
      open2: false,
    };
  }

  handleClickOpenUp() {
    this.setState({ open1: true });
  }

  handleSaveGames(gameArr) {
    var gameSaves = [];
    // Go through game arr and create obj with correct fields based on UsersGamesSchema
    // Save it to gameSaves
    gameArr.forEach((game) => {
      var cleanTags = game.gameTags.substring(1, game.gameTags.length - 1).split(",");
      var cleanerTags = [];
      cleanTags.forEach((tag) => {
        cleanerTags.push(tag.substring(1, tag.length - 1));
      });
      const gameObj = {
        name: game.name,
        url: game.url,
        gameTags: cleanerTags,
        gameID: game._id,
      };
      console.log(gameObj);
      gameSaves.push(gameObj);
    });
    // Then save to user
    axios
      .put(`http://localhost:3001/users/updateGames/${this.props.username}`, {
        gameList: gameSaves,
      })
      .then((json) => {
        if (json.data.success) {
          console.log("Game Library updated successfully");
          this.setState({ open1: false });
          this.props.onGameAdd();
        }
      });
  }

  render() {
    const client = algoliasearch(
      "T7MES4D4M7",
      "3fc5bf346a8a53b2ef1c596cf747cb02"
    );

    var selectedGames = [];

    const onAddTag = (hit) => {
      return hit;
    };

    const onTagsUpdated = (actualTags, previousTags) => {
      selectedGames = actualTags;
      // console.log(selectedGames);
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
    };

    return (
      <div style={{ display: "inline" }}>
        <Button
          onClick={this.handleClickOpenUp}
          className={styles.plus}
          variant="contained"
        >
          <AddCircleIcon style={{ marginRight: 10 }}></AddCircleIcon>Add Game
        </Button>
        <Dialog
          maxWidth="sm"
          open={this.state.open1}
          fullWidth
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          className={styles.dialogBox}
        >
          <DialogTitle id="alert-dialog-title">
            {"Add a Game to your Library"}
          </DialogTitle>
          <DialogContent className={styles.dialogBox}>
            <div>
              <InstantSearch searchClient={client} indexName="co-net_games">
                <Index indexName="co-net_games">
                  <Tags
                    selectedTagComponent={TagSelectedComponent}
                    suggestedTagComponent={TagSuggestionComponent}
                    onAddTag={onAddTag}
                    onUpdate={onTagsUpdated}
                    library={this.props.library}
                    translations={{
                      placeholder: "Game Name",
                      noResult: "Game not found.",
                    }}
                  />
                </Index>
              </InstantSearch>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.setState({ open1: false })}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => this.handleSaveGames(selectedGames)}
              color="primary"
              autoFocus
            >
              Done
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddGames;
