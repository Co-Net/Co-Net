
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
import CardActions from '@material-ui/core/CardActions';




class UserCard extends Component
{
  constructor(props) {
    super(props);

  }

   
 
  render()
  {

    return (
        <Card>
        <CardContent className = {styles.userCard}>
        <Grid container>
        <Grid item xs = {2}>
        <Avatar src= {profilePic} className = {styles.superSmallAvatar} />
        </Grid>
        <Grid item xs = {10}>
        <Typography>Hello</Typography>
        </Grid>
        </Grid>
        </CardContent>
        </Card>   

   
  
    );
  }
}

export default UserCard;


