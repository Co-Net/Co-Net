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
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "@material-ui/core";
import axios from "axios";

export default function AlertDialog(props) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  // const [joined, setJoined] = React.useState(false);

  const handleClickOpenUp = () => {
    if (props.currentUser === "Guest") {
      alert("You must be signed in to join a party.");
      return;
    }
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleCloseJoinedParty = () => {
    // axios call add party member
    axios
      .put(`http://localhost:3000/party/addPartyMember/${props.party._id}`, {
        username: props.currentUser,
      })
      .then((json) => {
        if (json.data.success) {
          setOpen1(false);
          window.location.reload(false);
        }
      });
  };

  const handleLeaveParty = () => {
    // Check if user is party leader. If is, then delete party
    // Deleting member's currentPartyId is handled on backend
    if (props.currentUser === props.party.partyLeader) {
      axios.delete(`http://localhost:3001/party/${props.currentUser}`)
      .then((json) => {
        console.log(json.data);
        if (json.data.success) {
          window.location.reload(false);
        }
      })
    } else {
      // axios call remove member
      axios
        .put(
          `http://localhost:3000/party/removePartyMember/${props.party._id}`,
          {
            username: props.currentUser,
          }
        )
        .then((json) => {
          if (json.data.success) {
            window.location.reload(false);
          }
        });
    }
  };

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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

  const marks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 10,
      label: "1",
    },
    {
      value: 20,
      label: "2",
    },
    {
      value: 30,
      label: "3",
    },
    {
      value: 40,
      label: "4",
    },
    {
      value: 50,
      label: "5",
    },
    {
      value: 60,
      label: "6",
    },
    {
      value: 70,
      label: "7",
    },
    {
      value: 80,
      label: "8",
    },
    {
      value: 90,
      label: "9",
    },
    {
      value: 100,
      label: "10",
    },
  ];

  var renderUserCards = [];
  props.party.partyMembers.forEach((member) => {
    const cmp = (
      <Grid item xs={6}>
        <UserCard username={member.username}></UserCard>
      </Grid>
    );
    renderUserCards.push(cmp);
  });

  return (
    <div style={{ display: "inline" }}>
      {!props.inParty ? (
        <Button
          onClick={handleClickOpenUp}
          color="secondary"
          variant="contained"
          style={{ float: "right" }}
        >
          Join
        </Button>
      ) : (
        <Button
          onClick={handleLeaveParty}
          variant="contained"
          style={{ float: "right" }}
        >
          Leave
        </Button>
      )}

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
          <Typography className={styles.partyGame}>
            <Link href={`/game/${props.gameID}`}>{props.game}</Link>
          </Typography>
        </DialogTitle>
        <DialogContent className={styles.dialogBoxParty}>
          <Grid container spacing={1}>
            <Grid item></Grid>
            <Grid item xs={11}>
              <Grid container spacing={8}>
                <Grid item xs={1}>
                  <Avatar
                    src={props.leaderAvatar}
                    className={styles.smallSize}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    className={styles.friendUsername}
                    display="inline"
                  >
                    <Link href={`/profile/${props.party.partyLeader}`}>
                      {props.party.partyLeader}
                    </Link>
                  </Typography>
                  <Typography className={styles.timeStamp} display="inline">
                    Party Owner
                  </Typography>
                  <Typography variant="body1" className={styles.commentBody}>
                    Max Players: {props.party.maxPlayers}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{ marginTop: 20 }} container spacing={1}>
            {renderUserCards}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseJoinedParty} color="primary" autoFocus>
            Join Party
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
