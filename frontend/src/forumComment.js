import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./main.module.css";
import Typography from "@material-ui/core/Typography";
import Menu from "./ProfileMenu.js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { withRouter } from 'react-router-dom';

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
    this.convertTime = this.convertTime.bind(this);
    this.canEdit = this.canEdit.bind(this);
    this.canDelete = this.canDelete.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.state = {
      avatar: "",
      isEdit: false,
      isDeleted: false,
      commentBody: this.props.body
    };
  }

  // If recent (< 24h) = # hours ago
  // If recent (< 1h) = Today, HH:MM PM/AM
  // Else = Month Day, Year
  convertTime(time) {
    function convertToLocal(d, props) {
      var localTime = d.toLocaleString("en-US", {
        timeZone: props.timeZone,
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
        }
      }
    }

    var d = new Date(time);
    const month = monthNames[d.getMonth()];
    const today = new Date();
    // Check if recent
    var diff = Math.trunc(Math.abs(d - today) / 36e5);
    if (diff > 23) return `${month} ${d.getDate()}, ${d.getFullYear()}`;
    else if (diff < 1) return convertToLocal(d, this.props);
    else return `${diff} hours ago`;
  }

  // Get user avatar
  componentDidMount() {
    axios
      .get(`http://localhost:3001/users/photo/${this.props.author}`)
      .then((json) => {
        if (json.data.profilePhoto) {
          this.setState({ avatar: json.data.profilePhoto });
        }
      });
  }

  canEdit = () => {
    this.setState((prevState) => ({
      isEdit: !prevState.isEdit,
    }));
  };
  canDelete = () => {
    this.setState((prevState) => ({
      isDeleted: !prevState.isDeleted,
    }));
    //decrement the number of comments here and delete comment from DB
  };

  handleEditComment(e) {
    this.setState({ commentBody: e.target.value });
  }

  handleSave() {
    if (this.state.commentBody === '') {
      alert("Comment cannot be empty");
      return;
    }
    this.props.onSave(this.props.id, this.state.commentBody);
    this.canEdit();
  }

  handleDelete() {
    this.props.onDelete(this.props.id);
    this.canDelete();
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

    const { avatar } = this.state;
    const timestamp = this.convertTime(this.props.timePosted);
    var editButton = null;

    if (this.props.isAuthor) {
      editButton = (
        <Button
          className={styles.editCommentButton}
          color="secondary"
          variant="contained"
          onClick={this.canEdit}
        >
          <EditIcon></EditIcon>
        </Button>
      );
    }

    return (
      <div>
        {!this.state.isDeleted ? (
          <Grid container spacing={8}>
            <Grid item xs={1}>
              <Avatar src={avatar} className={styles.smallSize} />
            </Grid>
            <Grid item xs={10}>
              <Typography onClick={() => this.props.history.push(`/profile/${this.props.author}`)} style={{cursor: 'pointer'}} className={styles.userNameComment} display="inline">
                {this.props.author}{" "}
              </Typography>
              <Typography className={styles.timeStamp} display="inline">
                {timestamp}
              </Typography>
              {!this.state.isEdit ? 
                editButton
               : (
                <div style={{ float: "right" }}>
                  <Button
                    className={styles.editCommentButton}
                    color="secondary"
                    variant="contained"
                    onClick={this.handleSave}
                  >
                    <CheckIcon></CheckIcon>
                  </Button>
                  <Button
                    className={styles.editCommentButton}
                    color="secondary"
                    variant="contained"
                    onClick={this.handleDelete}
                  >
                    <DeleteForeverIcon></DeleteForeverIcon>
                  </Button>
                </div>
              )}
              {!this.state.isEdit ? (
                <Typography variant="body1" className={styles.commentBody}>
                  {this.state.commentBody}
                </Typography>
              ) : (
                <TextField
                  className={styles.editCommentField}
                  id="standard-basic"
                  value={this.state.commentBody}
                  onChange={this.handleEditComment}
                />
              )}
            </Grid>
          </Grid>
        ) : (
          <Typography></Typography>
        )}
      </div>
    );
  }
}

export default withRouter(forumComment);
