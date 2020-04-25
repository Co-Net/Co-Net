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
import Slider from '@material-ui/core/Slider';




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

  const marks = [
    {
      value: 0,
      label: '0',
    },
    {
      value: 10,
      label: '1',
    },
    {
      value: 20,
      label: '2',
    },
    {
      value: 30,
      label: '3',
    },
    {
        value: 40,
        label: '4',
      },
      {
        value: 50,
        label: '5',
      },
      {
        value: 60,
        label: '6',
      },
      {
        value: 70,
        label: '7',
      },
      {
        value: 80,
        label: '8',
      },
      {
        value: 90,
        label: '9',
      },
      {
        value: 100,
        label: '10',
      },
  ];

 

  return (
    <div style= {{display: 'inline',}}>
    <Typography
    className="menuButtons"
    onClick={handleClickOpenUp}>Create Party</Typography>
      <Dialog
      maxWidth = 'sm'
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className = {styles.dialogBox}
      >
        <DialogTitle id="alert-dialog-title">{"Create a Party"}
        </DialogTitle>
        <DialogContent className = {styles.dialogBox}>
        <Multiselect
            options={state.options}
            displayValue="key"
            style={style}
            placeholder = "Choose Game"
            selectionLimit = {1}
 
          /> 
          <Typography className = {styles.centerText}>Party Size</Typography>
          <Slider
        aria-labelledby="discrete-slider-custom"
        step={10}
        marks={marks}
      />
          
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