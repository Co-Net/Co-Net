
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
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
import CardContent from '@material-ui/core/CardContent';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';




class forumComment extends Component
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
      <Typography className = {styles.userNameComment} display = "inline" >HelloHydra </Typography>
      <Typography  className = {styles.timeStamp} display = "inline" >2 hours ago</Typography>
      <ThumbUpIcon className = {styles.thumbsUp} ></ThumbUpIcon>
      <Typography variant = 'body1' className = {styles.commentBody}>
      Don't play with this person! They rage and use hacks. They love to blame the team for their own mistakes and uses lots of profanity. Unskilled, negative attitude, avoid at all costs!! >:( I lost my promos because of this dude!! Ughhhhhh so annoyed......
        </Typography>
      
      </Grid>
      </Grid>
      </Grid>
      </Grid>
   

   
  
    );
  }
}

export default forumComment;