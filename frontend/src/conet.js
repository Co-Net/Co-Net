import Modal from '@material-ui/core/Modal';
import React, { Component, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Feed from "./Feed";
import { Dimensions } from 'react';
import logo from './logo.png';
import bgd from './background.jpeg';
import axios from 'axios';

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

function onSignIn(e, history, pass, uname) {
  e.preventDefault();
    const password = pass;
    const username = uname;

  // Post request to backend
  axios.post('http://localhost:6969/users/signin', {
    username: username,
    password: password,
  }, {
    withCredentials: true
  }).then(json => {
      if (json.data.success) {
        history.push('/');
      } else {
        console.log("SIGN IN FAILED");
      }
    });
}

export default function ServerModal(props) {
  const {history} = props;
  const classes = useStyles();
  const rootRef = React.useRef(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

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
        <div className={classes.paper} style = {{padding: 45}}>

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
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color= "primary"
            className={classes.submit}
            onClick = {(e) => onSignIn(e, history, password, username)}
            >
            Sign in with Steam
          </Button>
            </Grid>
            <Grid item xs={12}>
            <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary first"
            className={classes.submit}
            onClick = {() => history.push('/signModal')}
          >
          Sign up with Email
          </Button>
            </Grid>
          </Grid>
          <Grid container spacing = {10}>
          <Grid item xs = {12}></Grid>
          <Grid item xs ={12} style ={{textAlign: 'right'}}>
         
          <Typography display = "inline" component="h2" fontsize = {18} align="center" id = "server-modal-title">
          Already have an account?
        </Typography>
        <Typography display = "inline" color = "primary" component="h2" fontsize = {18} align="center" id = "server-modal-title">
        {' '} Sign in. </Typography>
        </Grid></Grid>
       

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
