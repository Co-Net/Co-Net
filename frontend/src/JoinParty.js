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
import profilePic from './commentPhoto.jpg';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import UserCard from './UserCard';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



export default function AlertDialog(props) {
  const [open1,setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [joined, setJoined] = React.useState(false);


  const { history } = props;


  const handleClickOpenUp = () => {
    setOpen1(true);
  };
 

  const handleClose = () => {
    setOpen1(false);
   
  };


  const handleCloseJoinedParty = () => {
    setOpen1(false);
    setJoined(true);
  };

  const handleLeaveParty = () =>{
    setJoined(false);
  }



  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

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
    {!joined ?     <Button  onClick={handleClickOpenUp} color = "secondary" variant = 'contained' style= {{float: 'right',}}>Join</Button>
  : <Button  onClick={handleLeaveParty} variant = 'contained' style= {{float: 'right',}}>Leave</Button>}

    <Dialog
      maxWidth = 'sm'
        open={open1}
        fullWidth
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className = {styles.dialogBoxParty}
      >
        <DialogTitle id="alert-dialog-title">{"Party for"}
        <Typography className = {styles.partyGame} onClick={() => history.push("/game")}>League of Legends</Typography></DialogTitle>
        <DialogContent className = {styles.dialogBoxParty}>
        <Grid container spacing = {1}>
        <Grid item>
   </Grid>
        <Grid item xs ={11}>
           <Grid  container spacing = {8}>
         <Grid item xs ={1}>
         <Avatar src= {profilePic} className = {styles.smallSize} />
   
         </Grid>
         <Grid item xs = {10}>
         <Typography className = {styles.friendUsername} display = "inline" >HelloHydra </Typography>
         <Typography  className = {styles.timeStamp} display = "inline" >Party Owner</Typography>
         <Typography variant = 'body1' className = {styles.commentBody}>
            Max Players: 10
           </Typography>
         
         </Grid>
         </Grid>
         </Grid>
         </Grid>
         <Grid style = {{marginTop: 20,}} container spacing = {1}>
         <Grid item xs = {6}>
        <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
          <Grid item xs = {6}>
          <UserCard></UserCard>
          </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
         <Grid item xs = {6}>
         <UserCard></UserCard>
         </Grid>
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