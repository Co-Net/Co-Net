import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./main.module.css";
import profilePic from "./commentPhoto.jpg";
import Typography from "@material-ui/core/Typography";
import Menu from "./ProfileMenu.js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";

class forumComment extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const theme = createMuiTheme({
      "@global": {
        body: {
          backgroundColor: "white",
        },
      },
    });

    const paperStyle = {
      marginTop: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    };

    const avatarStyle = {
      margin: 1,
      backgroundColor: "gray",
    };

    const formStyle = {
      width: "100%", // Fix IE 11 issue.
      marginTop: 3,
    };

    var thumbsIcon = (this.props.rep === '+') ? <ThumbUpIcon className={styles.thumbsUp}></ThumbUpIcon> : <ThumbDownIcon className={styles.thumbsDown}></ThumbDownIcon>;

    return (
      <Grid container spacing={8}>
        <Grid item></Grid>
        <Grid item xs={11}>
          <Grid container spacing={8}>
            <Grid item xs={1}>
              <Avatar src={this.props.avatar} className={styles.smallSize} />
            </Grid>
            <Grid item xs={10}>
              <Typography className={styles.userNameComment} display="inline">
                {this.props.author}{" "}
              </Typography>
              <Typography className={styles.timeStamp} display="inline">
                2 hours ago
              </Typography>
              {thumbsIcon}
              <Typography variant="body1" className={styles.commentBody}>
                {this.props.comment}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default forumComment;
