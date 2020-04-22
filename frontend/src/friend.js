
import React, { Component } from 'react';
import TopMenu from './TopMenu';
import axios from 'axios';
import { createMuiTheme } from "@material-ui/core/styles";
import styles from './main.module.css';
import profilePic from './commentPhoto.jpg';
import Typography from '@material-ui/core/Typography';
import Menu from './ProfileMenu.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';




class friend extends Component
{
  constructor(props) {
    super(props);

  }

   
 
  render()
  {
    const theme = createMuiTheme({
      '@global' : {
        body: {
          backgroundColor: "white",
        }
      }
    });

    const paperStyle = {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }

    const avatarStyle = {
      margin: 1,
      backgroundColor: "gray",
    }

    const formStyle = {
      width: '100%', // Fix IE 11 issue.
      marginTop: 3,
    }

    return (
     <Grid container spacing = {8}>
     <Grid item>
</Grid>
     <Grid item xs ={11}>
        <Grid container spacing = {8}>
      <Grid item xs ={1}>
      <Avatar src= {profilePic} className = {styles.smallSize} />

      </Grid>
      <Grid item xs = {10}>
      <Typography className = {styles.friendUsername} display = "inline" >HelloHydra </Typography>
      <Typography  className = {styles.timeStamp} display = "inline" >Added 2 days ago</Typography>
      <Typography variant = 'body1' className = {styles.commentBody}>
      I'm a southern girl with a big city heart. CSGO is my jam, don't even try to play me! You'll regret it :)
        </Typography>
      
      </Grid>
      </Grid>
      </Grid>
      </Grid>
   

   
  
    );
  }
}

export default friend;