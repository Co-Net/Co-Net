import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './main.module.css';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import TextField from '@material-ui/core/TextField';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Multiselect } from 'multiselect-react-dropdown';
import Typography from "@material-ui/core/Typography";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";




export default function AlertDialog() {
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [newTagName, setTagName] = React.useState("");



  const handleClickOpenUp = () => {
    setOpen1(true);
  };


  const handleClose = () => {
    setOpen1(false);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen2(false);
    setOpen3(false);
  };

  function onCreateTag(newTagName) {
    const tagName = newTagName;

    axios
      .post(`http://localhost:3001/userTags/create`, {
        name: tagName
      })
      .then((json) => {
        if (json.data.success) {
          //this.setState({created: true})
          setOpen3(true);
          console.log('User Tag Created!');
          window.location.reload();
        }
        else {
          //this.setState({created: false})
          setOpen2(true);
          console.log('Error in user tag creation')
        }
      })
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


  const state = {
    options: [
      { key: "League", },
      { key: "Minecraft", },
      { key: "Valorant", },
      { key: "CSGO", },
      { key: "Mario Kart", },
      { key: "Animal Crossing", },
      { key: "Tic Tac Toe", }
    ],
  };

  const style = {
    multiselectContainer: {
      textAlign: 'center',
    },
    chips: {
    },
    searchBox: {
      fontSize: '15px',
      fontFamily: 'Segoe UI',

    },
    inputField: {
      fontSize: '15px',


    },
    multiselectContainer: {
    }
  };



  return (
    <div style={{ display: 'inline', }}>
      <AddCircleIcon onClick={handleClickOpenUp} className={styles.addTags}></AddCircleIcon>      <Dialog
        maxWidth='sm'
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{"Create a Tag"}
        </DialogTitle>
        <DialogContent>
          <TextField variant="outlined" placeholder="Enter a Tag" name="newTagName" value={newTagName} onChange={(e => setTagName(e.target.value))}></TextField>
          <Button style={{ marginTop: 9, marginLeft: 12, }} onClick={(e) => {onCreateTag(newTagName); }} color="primary">
            Add Tag
      </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary" autoFocus>
            Done
          </Button>
          <Snackbar open={open2} autoHideDuration={900} onClose={handleClose1}>
            <Alert onClose={handleClose} severity="error">
              Tag Already Exists!
          </Alert>
          </Snackbar>
          <Snackbar open={open3} autoHideDuration={900} onClose={handleClose1}>
          <Alert severity="success">User Tag Created!</Alert>
          </Snackbar>
        </DialogActions>
      </Dialog>

    </div>
  );
}