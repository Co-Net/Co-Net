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




export default function AlertDialog() {
  const [open1,setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);


  const handleClickOpenUp = () => {
    setOpen1(true);
  };
 

  const handleClose = () => {
    setOpen1(false);
  };

  const state = {
    options:[
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
    <div style= {{display: 'inline',}}>
    <Button onClick={handleClickOpenUp} className = {styles.plus} variant = 'contained'><AddCircleIcon style = {{marginRight: 10}}></AddCircleIcon>Add Game</Button>
      <Dialog
      maxWidth = 'sm'
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className = {styles.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{"Add a Game to your Library"}
        </DialogTitle>
        <DialogContent className = {styles.dialogBox}>
        <Multiselect
            options={state.options}
            displayValue="key"
            style={style}
            placeholder = "Search your game"
 
          /> 
          <Typography className = {styles.centerText}>or</Typography>
          <div className = {styles.center}>
          <Button variant = "contained" color = "primary">Link with Steam</Button>
          </div>
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