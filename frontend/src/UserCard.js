import React, { Component } from "react";
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
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import CardActions from "@material-ui/core/CardActions";

class UserCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/users/photo/${this.props.username}`)
      .then((json) => {
        if (json.data.profilePhoto) {
          this.setState({ avatar: json.data.profilePhoto });
        }
      });
  }

  render() {
    return (
      <Card>
        <CardContent className={styles.userCard}>
          <Grid container>
            <Grid item xs={2}>
              <Avatar
                src={this.state.avatar}
                className={styles.superSmallAvatar}
              />
            </Grid>
            <Grid item xs={10}>
              <Typography>{this.props.username}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

export default UserCard;
