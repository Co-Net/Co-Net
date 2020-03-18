
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TopMenu from './TopMenu';
import axios from 'axios';
import { createMuiTheme } from "@material-ui/core/styles";
import styles from './main.module.css';
import profilePic from './profilePic.png';
import Typography from '@material-ui/core/Typography';
import Menu from './ProfileMenu.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';




class forumPost extends Component
{
  constructor(props) {
    super(props);
    this.pushHistory = this.pushHistory.bind(this);

  }

  pushHistory(){
    this.props.history.push('/editprofile')
  
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

    const submitStyle = {
      marginTop: 3,
      marginBottom: 0,
      marginRight: 2,
    }

    const tileStyle = {
  
    }
  
    const gridStyle = {
      marginTop: 20,
  
    }

    const titleStyle = {
      marginTop: 20,
      color: "#535353",
    }

    const gameTitle = {
      color: "black",
      marginTop: 20,
      marginLeft: 8,

    }
    const gameDesc = {
      color: "#535353",
      marginTop: 5,
      marginLeft: 8,

    }
    const postText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu  Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nNulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcuLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu'

    return (
 <div>
      <TopMenu history={this.props.history}></TopMenu>
      <div className = "content">
      <Grid container spacing = {1}>
      <Grid item xs ={8}>
      

      <Card className = {styles.postSpacing}>
      <CardContent>
      <Grid container spacing = {1}>
      <Grid item xs ={2}>
      <Avatar src= {profilePic} className = {styles.mediumSize} />

        </Grid>
        <Grid item xs ={10}>

        <Typography variant = 'h6' className = {styles.forumPostTitle} >Looking for Duo in Ranked, I'm Gold</Typography>
        <Typography className = {styles.userName} display = "inline" >Destroyer392, </Typography>
        <Typography  className = {styles.timeStamp} display = "inline" >February 2, 2020</Typography>
        <hr  style={{
            color: '#ababab',
            backgroundColor: '#ababab',
            height: .5,
            marginTop: 20,
            marginBottom: 20,
        }}/>
        <Typography variant = 'body1' className = {styles.forumBody}>
      {postText}
        </Typography>

        <Typography className = {styles.commentNumber}>
        12 Comments
        </Typography>
        <hr  style={{
            color: '#ababab',
            backgroundColor: '#ababab',
            height: .5,
            marginTop: 20,
            marginBottom: 20,
        }}/>
            </Grid>

        </Grid>
     
  
      </CardContent>
      </Card>
      </Grid>

      <Grid item xs = {4}>
       <Card className = {styles.postSpacing}>
      <CardContent>
      <Typography>hello</Typography>
      </CardContent>
      </Card>

       <Card className = {styles.postSpacing}>
      <CardContent>
      <Typography>hello</Typography>
      </CardContent>
      </Card>

      </Grid>




      </Grid>
      

        
      </div>
   
    </div>
  
    );
  }
}

export default forumPost;