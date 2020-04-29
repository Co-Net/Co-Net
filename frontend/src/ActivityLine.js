
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
import Link from '@material-ui/core/Link'

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];


class friend extends Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);

    this.state = {
      id: "",
      title: "",
      timePosted: "",
      body: "",
      game: "",
      username: "",
      parent: "",
      profilePic: ""
    }
  }

  // Return Month Day, Year
  convertTime(time) {
    var d = new Date(time);
    const month = monthNames[d.getMonth()];
    return `${month} ${d.getDate()}, ${d.getFullYear()}`;
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/forum/${this.props.postID}`)
      .then((json) => {
        if (!json) {
          console.log("error getting forum post");
        }
        else {
          if (json.data.title) {
            this.setState({ title: json.data.title });
          }
          if (json.data.timePosted) {
            this.setState({ timePosted: json.data.timePosted });
          }
          if (json.data.body) {
            this.setState({ body: json.data.body });
          }
          if (json.data.game) {
            this.setState({ game: json.data.game });
          }
          if (json.data.username) {
            this.setState({ username: json.data.username });
          }
          if (json.data.parentID ) {
            this.setState({ parent: json.data.parentID});
          }
          if(json.data._id){
            this.setState({id: json.data._id})
          }
          axios
            .get(`http://localhost:3001/users/${this.state.username}`)
            .then((json)=> {
              if (!json) {
                console.log("error getting following");
              }
              else {
                if (json.data.profilePhoto) {
                  this.setState({ profilePic: json.data.profilePhoto });
                }
              }
            })
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
              <Typography className={styles.friendUsername} display="inline" >{this.state.username} </Typography>
              <Typography className={styles.timeStamp} display="inline" >{this.convertTime(this.state.timePosted)}</Typography>
              {this.state.parent === "0" ? (<Typography variant='body1' className={styles.commentBody}>
                  Created a <Link variant="body1" href={`forumPost/${this.state.id}`}  activeClassName='active'>post:</Link>
                  <Typography className={styles.commentThreadText}>{this.state.title}</Typography>
                </Typography>) : (<Typography variant='body1' className={styles.commentBody}>
                Replied to a <Link variant="body1" href={`/forumPost/${this.state.parent}`}  activeClassName='active'>thread:</Link>
                <Typography className={styles.commentThreadText}>{this.state.body}</Typography>
              </Typography>)}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default friend;