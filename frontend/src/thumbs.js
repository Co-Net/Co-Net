import React from "react";
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

export default function AlertDialog(props) {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  var positiveRep = props.positive;
  var negativeRep = props.negative;
  const feedback = props.feedback;

  const handleClickOpenUp = () => {
    setOpen1(true);
  };
  const handleClickOpenDown = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen1(false);
    setOpen2(false);
  };

  const handleFeedbackEdit = (e) => {
    props.onFeedbackEdit(e.target.value);
  };

  const handleFeedbackPost = (repType) => {
    props.onFeedbackPost(repType);
    handleClose();
  };

  const handleFeedbackEditCancel = () => {
    props.onFeedbackEditCancel();
    handleClose();
  };

  // Conditional Rendering
  // If feedback already posted, highlight the type they posted and disable clicking for other type
  var pastFeedback;
  // If own profile, don't allow clicking
  if (!feedback) {
    pastFeedback = (
      <div>
        <Button className={styles.tUp} variant="contained">
          <ThumbUpIcon
            style={{ color: "green", marginRight: 10 }}
          ></ThumbUpIcon>
          {positiveRep}
        </Button>
        <Button className={styles.tDown} variant="contained">
          <ThumbDownIcon
            style={{ color: "#d6361d", marginRight: 10 }}
          ></ThumbDownIcon>
          {negativeRep}
        </Button>
      </div>
    );
  } else if (Object.entries(feedback).length === 0) {
    // If have not left feedback for user before, allow click on both
    pastFeedback = (
      <div>
        <Button
          onClick={handleClickOpenUp}
          className={styles.tUp}
          variant="contained"
        >
          <ThumbUpIcon
            style={{ color: "green", marginRight: 10 }}
          ></ThumbUpIcon>
          {positiveRep}
        </Button>
        <Button
          onClick={handleClickOpenDown}
          className={styles.tDown}
          variant="contained"
        >
          <ThumbDownIcon
            style={{ color: "#d6361d", marginRight: 10 }}
          ></ThumbDownIcon>
          {negativeRep}
        </Button>
      </div>
    );
  } else {
    // if left feedback before, allow edit and update
    pastFeedback =
      feedback.rep === "+" ? (
        <div>
          <Button
            onClick={handleClickOpenUp}
            className={styles.tUp}
            variant="contained"
          >
            <ThumbUpIcon
              style={{ color: "green", marginRight: 10 }}
            ></ThumbUpIcon>
            {positiveRep}
          </Button>
          <Button
            onClick={handleClickOpenDown}
            className={styles.tDown}
            variant="contained"
          >
            <ThumbDownIcon
              style={{ color: "#d6361d", marginRight: 10, opacity: 0.3 }}
            ></ThumbDownIcon>
            {negativeRep}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={handleClickOpenUp}
            className={styles.tUp}
            variant="contained"
          >
            <ThumbUpIcon
              style={{ color: "green", marginRight: 10, opacity: 0.3 }}
            ></ThumbUpIcon>
            {positiveRep}
          </Button>
          <Button
            onClick={handleClickOpenDown}
            className={styles.tDown}
            variant="contained"
          >
            <ThumbDownIcon
              style={{ color: "#d6361d", marginRight: 10 }}
            ></ThumbDownIcon>
            {negativeRep}
          </Button>
        </div>
      );
  }

  return (
    <div style={{ display: "inline" }}>
      {pastFeedback}
      {/* Positive Review */}
      <Dialog
        maxWidth="sm"
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Write a review"}
          <ThumbUpIcon
            style={{ verticalAlign: "sub", marginLeft: 10, color: "green" }}
          ></ThumbUpIcon>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Say something about this user..."
            placeholder="Ex: 'Great teamwork, would play again with this person!'"
            multiline
            rows="10"
            fullWidth
            variant="outlined"
            value={feedback ? feedback.comment : ""}
            onChange={handleFeedbackEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackEditCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleFeedbackPost("+")}
            color="primary"
            autoFocus
          >
            Post Review
          </Button>
        </DialogActions>
      </Dialog>

      {/* Negative Review */}
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Write a review"}
          <ThumbDownIcon
            style={{ verticalAlign: "sub", marginLeft: 10, color: "#ce0606" }}
          ></ThumbDownIcon>
        </DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-multiline-static"
            label="Say something about this user..."
            placeholder="Ex: 'Negative attitude, not very skilled at this game.'"
            multiline
            rows="10"
            fullWidth
            variant="outlined"
            value={feedback ? feedback.comment : ""}
            onChange={handleFeedbackEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFeedbackEditCancel} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => handleFeedbackPost("-")}
            color="primary"
            autoFocus
          >
            Post Review
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
