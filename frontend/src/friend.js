
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




class friend extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bio: "",
      username: "",
      profilePic: ""
    }

  }
    componentDidMount(){
      axios
        .get(`http://localhost:3001/users/${this.props.username}`)
        .then((json) => {
          if(!json){
            console.log("error getting following");
          }
          else{
            if(json.data.bio){
              this.setState({bio: json.data.bio});
            }
            if(json.data.username){
              this.setState({username: json.data.username});
            }
            if(json.data.profilePhoto){
              this.setState({profilePic: json.data.profilePhoto});
            }
          }
        })
    }

  render() {
    const theme = createMuiTheme({
      '@global': {
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
      <Grid container spacing={8}>
        <Grid item>
        </Grid>
        <Grid item xs={11}>
          <Grid container spacing={8}>
            <Grid item xs={1}>
              <Avatar src={this.state.profilePic} className={styles.smallSize} />

            </Grid>
            <Grid item xs={10}>
              {/* use this for hyperlink below <Link href={`/profile/${this.props.author}`}>{this.props.author}</Link> */}
              <Typography className={styles.friendUsername} display="inline" >{this.state.username} </Typography>
              <Typography variant='body1' className={styles.commentBody}>
                {this.state.bio}
        </Typography>

            </Grid>
          </Grid>
        </Grid>
      </Grid>




    );
  }
}

export default friend;