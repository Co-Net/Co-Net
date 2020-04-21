
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
import profilePic2 from './profilePic.png';
import TextField from '@material-ui/core/TextField';






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
        
        <div>
        <Grid container spacing = {8}>
      <Grid item xs ={1}>
      <Avatar src= {profilePic} className = {styles.smallSize} />

      </Grid>
      <Grid item xs = {10}>
      <Typography className = {styles.friendUsername} display = "inline" >HelloHydra </Typography>
      <Typography  className = {styles.timeStamp} display = "inline" >2 hours ago</Typography>
      <Typography variant = 'body1' className = {styles.commentBody}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      
      </Grid>
      </Grid>
      <Grid container spacing = {8}>
      <Grid item xs ={1}>
      <Avatar src= {profilePic2} className = {styles.smallSize} />

      </Grid>
      <Grid item xs = {10}>
      <Typography className = {styles.friendUsername} display = "inline" >destroyer392 </Typography>
      <Typography  className = {styles.timeStamp} display = "inline" >2 hours ago</Typography>
      <Typography variant = 'body1' className = {styles.commentBody}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      
      </Grid>
      </Grid>
   
      <Grid container spacing = {8}>
      <Grid item xs ={1}>
      <Avatar src= {profilePic} className = {styles.smallSize} />

      </Grid>
      <Grid item xs = {10}>
      <Typography className = {styles.friendUsername} display = "inline" >HelloHydra </Typography>
      <Typography  className = {styles.timeStamp} display = "inline" >2 hours ago</Typography>
      <Typography variant = 'body1' className = {styles.commentBody}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      
      </Grid>
      </Grid>
      <Grid container spacing = {8}>
      <Grid item xs ={1}>
      <Avatar src= {profilePic2} className = {styles.smallSize} />

      </Grid>
      <Grid item xs = {10}>
      <Typography className = {styles.friendUsername} display = "inline" >destroyer392 </Typography>
      <Typography  className = {styles.timeStamp} display = "inline" >2 hours ago</Typography>
      <Typography variant = 'body1' className = {styles.commentBody}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      
      </Grid>
      </Grid>
      <Grid container spacing = {8}>
      <Grid item xs ={1}>
      <Avatar src= {profilePic2} className = {styles.smallSize} />

      </Grid>
      <Grid item xs = {10}>
      <TextField
      id="standard-textarea"
      label="Type a reply..."
      className = {styles.commentBox}
      multiline
    />
    <Button className = {styles.postComment} variant = "contained" color = "primary">Send</Button>
    
      </Grid>
      </Grid>
   
   
      </div>
   
  
    );
  }
}

export default forumComment;