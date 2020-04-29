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
import profilePic2 from "./profilePic.png";
import TextField from "@material-ui/core/TextField";
import { Link } from "@material-ui/core";

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

class forumComment extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageEdit = this.handleMessageEdit.bind(this);
    this.convertTime = this.convertTime.bind(this);

    this.state = {
      messages: [],
      messageBody: "",
      newMessage: null,
    };
  }

  convertTime(time) {
    var d = new Date(time);
    const month = monthNames[d.getMonth()];
    const today = new Date();
    var localTime = d.toLocaleString("en-US", {
      timeZone: this.props.timeZone,
    });
    localTime = new Date(localTime);
    var day = localTime.getHours() >= 12 ? "PM" : "AM";
    var hour = (localTime.getHours() + 24) % 12 || 12;
    var min = localTime.getMinutes();
    min = min < 10 ? `0${min}` : min;
    if (
      d.getMonth() === today.getMonth() &&
      d.getFullYear() &&
      today.getFullYear()
    ) {
      if (d.getDate() === today.getDate()) {
        return `Today, ${hour}:${min} ${day}`;
      } else if (d.getDate() === today.getDate() - 1) {
        return `Yesterday, ${hour}:${min} ${day}`;
      }
    }
    return `${month} ${d.getDate()}, ${d.getFullYear()}`;
  }

  handleMessageSend() {
    // Add message to both users
    axios
      .put(
        `http://localhost:3001/messageThread/addMessageToThread/${this.props.threadID}`,
        {
          sentBy: this.props.currentUser,
          message: this.state.messageBody,
        }
      )
      .then((json) => {
        if (json.data.success) {
          const convertedTime = this.convertTime(json.data.messageObj.timeSent);
          const cmp = (
            <Grid container spacing={8}>
              <Grid item xs={1}>
                <Avatar
                  src={this.props.ownAvatar}
                  className={styles.smallSize}
                />
              </Grid>
              <Grid item xs={10}>
                <Typography className={styles.friendUsername} display="inline">
                  <Link href={`/profile/${json.data.messageObj.sentBy}`}>
                    {json.data.messageObj.sentBy}
                  </Link>
                </Typography>
                <Typography className={styles.timeStamp} display="inline">
                  {convertedTime}
                </Typography>
                <Typography variant="body1" className={styles.commentBody}>
                  {json.data.messageObj.message}
                </Typography>
              </Grid>
            </Grid>
          );
          this.setState({ newMessage: cmp, messageBody: "" });
        }
      });
  }

  handleMessageEdit(e) {
    this.setState({ messageBody: e.target.value });
  }

  componentDidMount() {
    // Get avatars
    axios
      .get(`http://localhost:3001/users/photo/${this.props.recipient}`)
      .then((json2) => {
        if (json2.data.profilePhoto) {
          // Load message thread
          var messages = [];
          this.props.sharedMessages.forEach((message) => {
            const convertedTime = this.convertTime(message.timeSent);
            const cmp = (
              <Grid container spacing={8} key={message._id}>
                <Grid item xs={1}>
                  <Avatar
                    src={
                      this.props.currentUser === message.sentBy
                        ? this.props.ownAvatar
                        : json2.data.profilePhoto
                    }
                    className={styles.smallSize}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    className={styles.friendUsername}
                    display="inline"
                  >
                    <Link href={`/profile/${message.sentBy}`}>
                      {message.sentBy}
                    </Link>
                  </Typography>
                  <Typography className={styles.timeStamp} display="inline">
                    {convertedTime}
                  </Typography>
                  <Typography variant="body1" className={styles.commentBody}>
                    {message.message}
                  </Typography>
                </Grid>
              </Grid>
            );
            messages.push(cmp);
          });
          this.setState({
            messages: messages,
          });
        }
      });
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

    return (
      <div>
        {this.state.messages}
        {this.state.newMessage ? this.state.newMessage : null}
        {this.state.messages.length != 0 ? (
          <Grid container spacing={8}>
            <Grid item xs={1}>
              <Avatar src={this.props.ownAvatar} className={styles.smallSize} />
            </Grid>
            <Grid item xs={10}>
              <TextField
                id="standard-textarea"
                label="Type a reply..."
                className={styles.commentBox}
                multiline
                onChange={this.handleMessageEdit}
                value={this.state.messageBody}
              />
              <Button
                className={styles.postComment}
                variant="contained"
                color="primary"
                onClick={this.handleMessageSend}
              >
                Send
              </Button>
            </Grid>
          </Grid>
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}

export default forumComment;
