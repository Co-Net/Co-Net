
import Modal from '@material-ui/core/Modal';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import logo from './logo.png';
import bgd from './background.jpeg';
import axios from 'axios';
import styles from './App.css';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles(theme => ({
  root: {
    transform: 'translateZ(0)',
    height: 768,
    flexGrow: 1,
  },

  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: 'url(' + bgd + ')',
    backgroundSize: 'cover',
    overflow: 'hidden',

  },
  paper: {
    width: 400,
    height: 400,

    backgroundColor: theme.palette.background.paper,
    border: '0.5px solid #a9a9a9',
    borderRadius: 10,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    marginBottom: 200,
    marginRight: 400,
  },
}));

export default function ServerModal(props) {
  const {history} = props;
  const classes = useStyles();
  const rootRef = React.useRef(null);

  return (
    <div className={classes.root} ref={rootRef}>
      <Modal
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        open
        aria-labelledby="server-modal-title"
        aria-describedby="server-modal-description"
        className={classes.modal}
        container={() => rootRef.current}
      >
        <div className={classes.paper} style = {{padding: 45,}}>

          <p id="server-modal-description">
          <Typography align="center" id = "server-modal-title">
          <img src = {logo} alt = "Logo" style = {{width: '100px'}}/>    
          </Typography>
          <Grid container spacing={2}>
            
            <Grid item xs={12}>
        <Typography component="h2" fontsize = {18} align="center" id = "server-modal-title">
          Connecting Gamers Worldwide. <p></p>
        </Typography>
        </Grid>
        <Grid item xs={12}></Grid>
        </Grid>
        <form className={classes.form} noValidate>
          <Grid container spacing={4}>
            
          
       
      <Grid item xs={12}>
      <TextField
        autoComplete="fname"
        name="firstName"
        variant="outlined"
        required
        fullWidth
        id="firstName"
        label="Email"
        
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        autoComplete="fname"
        name="firstName"
        variant="outlined"
        required
        fullWidth
        id="firstName"
        label="Password"
        
      />
    </Grid>
  
    <Grid item xs={12} >
    <Button
    type="submit"
    fullWidth
    variant="contained"
    color="primary"
    className={classes.submit}
  >
  Sign In
  </Button>
    </Grid>
          </Grid>
          
         
       

        </form>
      <Box mt={5}>
        <copyright/>
      </Box>
          </p>
        </div>
      </Modal>
    </div>
  );
}