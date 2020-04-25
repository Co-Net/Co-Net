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
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Multiselect } from "multiselect-react-dropdown";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import axios from "axios";

export default function AlertDialog(props) {
  const [open1, setOpen1] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const [maxPlayers, setMaxPlayers] = React.useState(2);

  const handleClickOpenUp = () => {
    setOpen1(true);
  };

  const handleClose = () => {
    setOpen1(false);
  };

  const handleDone = () => {
    // Create Party
    // Get Game ID
    if (!title) {
      alert("Please choose a game");
      return;
    }
    if (!max) {
      alert("Please choose max players");
    }
    var selectTitle = options.find(titleObj => titleObj.title == title.title);
    axios.post(`http://localhost:3001/party/create`, {
      partyLeader: props.username,
      gameID: selectTitle.gameID,
      maxPlayers: max
    })
    .then((json) => {
      if (json.data.success) {
        handleClose();
        props.history.push(`/game/${selectTitle.gameID}`);      // sometimes doesnt work
      }
    });
  };

  const handleCancel = () => {
    setTitle("");
    setMaxPlayers(2);
    handleClose();
  }

  React.useEffect(() => {
    var titles = localStorage.getItem('titles');
    if (titles) {
      setOptions(JSON.parse(titles));
      return;
    }
    // Get game titles, slow call but way better than getting all games
    axios.get('http://localhost:3001/titles')
    .then((json) => {
      if (json.data.success && json.data.titleObj) {
        setOptions(json.data.titleObj);
        localStorage.setItem('titles', JSON.stringify(json.data.titleObj));
      }
    })
  }, []);

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

  var max;
  return (
    <div style={{ display: "inline" }}>
      <Typography className="menuButtons" onClick={handleClickOpenUp}>
        Create Party
      </Typography>
      <Dialog
        maxWidth="sm"
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{"Create a Party"}</DialogTitle>
        <DialogContent className={styles.dialogBox}>
          <Multiselect
            options={options}
            displayValue="title"
            onSelect={(l, o) => setTitle(o)}
            onRemove={(l, o) => setTitle("")}
            style={style}
            placeholder="Choose Game"
            selectionLimit={1}
          />
          <Typography className={styles.centerText}>Party Size</Typography>
          <Slider
            aria-labelledby="discrete-slider-custom"
            step={1}
            min={2}
            max={10}
            onChange={(e, value) => max = value}
            marks={marks}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDone} color="primary" autoFocus>
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
