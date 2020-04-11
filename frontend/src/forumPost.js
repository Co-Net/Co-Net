
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TopMenu from './TopMenu';
import axios from 'axios';
import { createMuiTheme } from "@material-ui/core/styles";
import styles from './main.module.css';
import profilePic from './profilePic.png';
import Typography from '@material-ui/core/Typography';
import Menu from './ProfileMenu.js';
import ForumComment from './forumComment.js';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';





class forumPost extends Component
{
  constructor(props) {
    super(props);
    
    this.pushHistory = this.pushHistory.bind(this);
    this.state = {
      clicks:0,
      show:true
    };
  }

  pushHistory(){
    this.props.history.push('/editForumPost')
  
   }

   IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  }
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  }
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
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
    const bull = <span className={styles.bullet}>•</span>;
    const postText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu  Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\nNulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcuLorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus. Praesent sollicitudin, ligula id porttitor faucibus, tortor mauris hendrerit augue, ut molestie ipsum arcu'
    

    return (
 <div>
      <TopMenu history={this.props.history}></TopMenu>
      <div className = "content">
      <Grid container spacing = {1}>
      <Grid item xs ={8}>
      

      <Card className = {styles.postSpacing}>
      <CardContent className = {styles.mainPostSpacing}>
      <Grid container spacing = {1}>
      <Grid item xs ={2}>
      <Avatar src= {profilePic} className = {styles.avatarForum} />
      <div className = {styles.postStats}>
      <div>
      <Typography className = {styles.statsText} display = "inline" >Views: {' '}</Typography>
      <Typography  className = {styles.statsNumber} display = "inline" >56,503</Typography>
      </div>
  
      <div>
      <Typography className = {styles.statsText} display = "inline" >Replies: {' '}</Typography>
      <Typography  className = {styles.statsNumber} display = "inline" >26</Typography>
      </div>
      </div>
      <div className = {styles.arrows}>
      <ExpandLessIcon className = {styles.upDownVote} fontsize = "large"></ExpandLessIcon>
      <Typography className = {styles.voteNumber}>57</Typography>
      <ExpandMoreIcon className = {styles.upDownVote} fontsize = "large"></ExpandMoreIcon>


      </div>
      
        </Grid>
        <Grid item xs ={10}>
        <Button onClick = {this.pushHistory}
        className = {styles.editPostButton} color = 'secondary' variant = 'contained'><EditIcon></EditIcon></Button>

        <Typography variant = 'h6' className = {styles.forumPostTitle} >Looking for Duo in Ranked, I'm Gold</Typography>
        <Typography className = {styles.userNameForum} display = "inline" >Destroyer392, </Typography>
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

        <ForumComment></ForumComment>
        <ForumComment></ForumComment>
        <ForumComment></ForumComment>
        <ForumComment></ForumComment>
        <ForumComment></ForumComment>
        <Grid container spacing = {8}>
        <Grid item xs ={1}>
        <Avatar src= {profilePic} className = {styles.smallSize} />

        </Grid>
        <Grid item xs = {10}>
        <TextField
        id="standard-textarea"
        label="Leave a Comment"
        className = {styles.commentBox}
        multiline
      />
      <Button className = {styles.postComment} variant = "contained" color = "primary">Post Comment</Button>
      
        </Grid>
        </Grid>
     
  
        
      


            </Grid>

        </Grid>
     
  
      </CardContent>
      </Card>
      </Grid>

      <Grid item xs = {4}>
       <Card className = {styles.postSpacing}>
      <CardContent>
      <Typography variant = 'h6' className = {styles.forumPostTitle} >Related Posts</Typography>
      <hr  style={{
        color: '#ababab',
        backgroundColor: '#ababab',
        height: .5,
        marginTop: 15,
        marginBottom: 15,
    }}/>
    <div className = {styles.relatedPosts}>
    <Typography className = {styles.relatedLinks}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus.</Typography>
    <div className = {styles.marginTop}>
    <Typography className = {styles.userNameForum} display = "inline" >StrongLittleOne{bull}</Typography>
    <Typography  className = {styles.timeStamp} display = "inline" >26 Comments</Typography>
    
    </div>
        
    
    </div>

    <div className = {styles.relatedPosts}>
    <Typography className = {styles.relatedLinks}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus.</Typography>
    <div className = {styles.marginTop}>
    <Typography className = {styles.userNameForum} display = "inline" >StrongLittleOne{bull}</Typography>
    <Typography  className = {styles.timeStamp} display = "inline" >26 Comments</Typography>
    
    </div>
        
    
    </div>
    <div className = {styles.relatedPosts}>
    <Typography className = {styles.relatedLinks}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget rhoncus nunc, eget tempor purus.</Typography>
    <div className = {styles.marginTop}>
    <Typography className = {styles.userNameForum} display = "inline" >StrongLittleOne{bull}</Typography>
    <Typography  className = {styles.timeStamp} display = "inline" >26 Comments</Typography>
    
    </div>    
    </div>
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