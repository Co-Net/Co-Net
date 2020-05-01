import React, { useEffect } from "react";
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
import { Multiselect } from "multiselect-react-dropdown";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import profilePic from "./commentPhoto.jpg";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import UserCard from "./UserCard";
import axios from "axios";
import { Link } from "@material-ui/core";

export default function AlertDialog(props) {
  const [open1, setOpen1] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [maxPlayers, setMaxPlayers] = React.useState(0);
  const [game, setGame] = React.useState("");
  const [leader, setLeader] = React.useState("");
  const [gameID, setGameID] = React.useState("");
  const [leaderAvatar, setLeaderAvatar] = React.useState("");
  const { history } = props;

  const handleClickOpenUp = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  useEffect(() => {
    if (!props.partyID || props.username === "Guest") return;
    axios
      .get(`http://localhost:3001/party/id/${props.partyID}`)
      .then((json) => {
        // Get Current Party Info
        // Game Name
        // Leader
        // Leader's avatar
        // Max Players
        // Members
        const party = json.data.party;
        const game = party.game;
        const maxPlayers = party.maxPlayers;
        const members = party.partyMembers;
        const leader = party.partyLeader;
        const gameID = party.gameID;
        // Render User Cards
        var userCards = [];
        members.forEach((member) => {
          const cmp = (
            <Grid item xs={6}>
              <UserCard username={member.username}></UserCard>
            </Grid>
          );
          userCards.push(cmp);
        });
        setCards(userCards);
        setMaxPlayers(maxPlayers);
        setGame(game);
        setLeader(leader);
        setGameID(gameID);
        // Get leader's Avatar
        axios
          .get(`http://localhost:3001/users/photo/${leader}`)
          .then((json) => {
            if (json.data.profilePhoto) {
              setLeaderAvatar(json.data.profilePhoto);
            }
          });
      });
  }, [props.partyID, props.username]);

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
      <Typography className="menuButtons" onClick={handleClickOpenUp}>
        Current Party
      </Typography>
      <Dialog
        maxWidth="sm"
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialogBoxParty}
      >
        <DialogTitle id="alert-dialog-title">
          {"Party for"}
          <Typography
            className={styles.partyGame}
            onClick={() => history.push(`/game/${gameID}`)}
          >
            {game}
          </Typography>
        </DialogTitle>
        <DialogContent className={styles.dialogBoxParty}>
          <Grid container spacing={1}>
            <Grid item></Grid>
            <Grid item xs={11}>
              <Grid container spacing={8}>
                <Grid item xs={1}>
                  <Avatar src={leaderAvatar} className={styles.smallSize} />
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    className={styles.friendUsername}
                    display="inline"
                  >
                    <Link href={`/profile/${leader}`}>{leader}</Link>
                  </Typography>
                  <Typography className={styles.timeStamp} display="inline">
                    Party Owner
                  </Typography>
                  <Typography variant="body1" className={styles.commentBody}>
                    Max Players: {maxPlayers}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 20 }} container spacing={1}>
            {cards}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
