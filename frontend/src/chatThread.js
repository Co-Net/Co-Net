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

class forumComment extends Component {
  constructor(props) {
    super(props);
    this.handleMessageSend = this.handleMessageSend.bind(this);
    this.handleMessageEdit = this.handleMessageEdit.bind(this);

    this.state = {
      messages: [],
      messageBody: "",
      newMessage: null
    };
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
                  {json.data.messageObj.sentBy}{" "}
                </Typography>
                <Typography className={styles.timeStamp} display="inline">
                  2 hours ago
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
                    {message.sentBy}{" "}
                  </Typography>
                  <Typography className={styles.timeStamp} display="inline">
                    2 hours ago
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
        {this.state.messages.length != 0 ? (<Grid container spacing={8}>
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
        </Grid>) : "Loading..."}
      </div>
    );
  }
}

export default forumComment;
