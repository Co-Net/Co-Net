import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import styles from "./main.module.css";
import profilePic from "./profilePic.png";
import Typography from "@material-ui/core/Typography";
import Menu from "./ProfileMenu.js";
import ForumComment from "./forumComment.js";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import EditForumPost from "./editForumPost";

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

class ForumPost extends Component {
  constructor(props) {
    super(props);
    this.convertTime = this.convertTime.bind(this);
    this.handleEditComment = this.handleEditComment.bind(this);
    this.handlePostComment = this.handlePostComment.bind(this);
    this.handleEditPost = this.handleEditPost.bind(this);
    this.onUpVote = this.onUpVote.bind(this);
    this.onDownVote = this.onDownVote.bind(this);
    this.handleVote = this.handleVote.bind(this);
    this.handleSavePost = this.handleSavePost.bind(this);
    this.handleEditTitle = this.handleEditTitle.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDeletePost = this.handleDeletePost.bind(this);
    this.handleEditCommentSave = this.handleEditCommentSave.bind(this);
    this.handleEditCommentDelete = this.handleEditCommentDelete.bind(this);

    this.state = {
      clicks: 0,
      show: true,
      timeZone: "",
      author: "",
      title: "",
      allReplyIDs: [],
      timePosted: [],
      body: "",
      game: "",
      avatar: "",
      votes: 0,
      ownAvatar: "",
      allReplies: [],
      comment: "",
      oldComment: "",
      currentUser: "",
      editing: false,
      oldBody: "",
      numOfReplies: 0
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/user/currentuser", { withCredentials: true })
      .then((json) => {
        if (json.data.timeZone) this.setState({ timeZone: json.data.timeZone });
        if (json.data.profilePhoto)
          this.setState({ ownAvatar: json.data.profilePhoto });
        if (json.data.username)
          this.setState({ currentUser: json.data.username });
        axios
          .get(`http://localhost:3001/forum/${this.props.match.params.postID}`)
          .then((json) => {
            this.setState({
              timePosted: json.data.timePosted,
              title: json.data.title,
              author: json.data.username,
              body: json.data.body,
              allReplyIDs: json.data.allReplyIDs,
              numOfReplies: json.data.allReplyIDs.length,
              game: json.data.game,
              votes: json.data.votes,
            });
            // Get author's avatar
            axios
              .get(`http://localhost:3001/users/photo/${this.state.author}`)
              .then((json) => {
                if (json.data.profilePhoto) {
                  this.setState({ avatar: json.data.profilePhoto });
                }
                // Get All Replies
                // Using Promise Strategy
                const replies = [];
                var timeZone = this.state.timeZone;
                var currentUser = this.state.currentUser;
                var onSave = this.handleEditCommentSave;
                var onDelete = this.handleEditCommentDelete;
                let promArr = this.state.allReplyIDs.map(async function (
                  reply
                ) {
                  const json = await axios.get(
                    `http://localhost:3001/forum/${reply.childID}`
                  );
                  // Name, Timestamp, Body
                  const replyAuthor = json.data.username;
                  const body = json.data.body;
                  const timePosted = json.data.timePosted;
                  const comp = (
                    <ForumComment
                      key={reply.childID}
                      id={reply.childID}
                      author={replyAuthor}
                      isAuthor={replyAuthor === currentUser}
                      body={body}
                      timePosted={timePosted}
                      timeZone={timeZone}
                      onDelete={onDelete}
                      onSave={onSave}
                    ></ForumComment>
                  );
                  return comp;
                });

                Promise.all(promArr)
                  .then((res) => {
                    res.forEach((comp) => {
                      replies.push(comp);
                    });
                    this.setState({ allReplies: replies });
                  })
                  .catch(function (err) {
                    console.log("ERROR");
                    console.log(err);
                  });
              });
          });
      });
  }

  IncrementItem = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };
  DecreaseItem = () => {
    this.setState({ clicks: this.state.clicks - 1 });
  };
  ToggleClick = () => {
    this.setState({ show: !this.state.show });
  };

  // Return Month Day, Year
  convertTime(time) {
    var d = new Date(time);
    const month = monthNames[d.getMonth()];
    return `${month} ${d.getDate()}, ${d.getFullYear()}`;
  }

  handlePostComment() {
    if (!this.state.comment) {
      return;
    }
    // Create a comment
    axios
      .post("http://localhost:3001/forum/createPostOrReply", {
        username: this.state.currentUser,
        body: this.state.comment,
        parentID: this.props.match.params.postID,
      })
      .then((json) => {
        var res = json.data.forumPostObj;
        const newReply = (
          <ForumComment
            key={res._id}
            author={res.username}
            isAuthor={true}
            id={res._id}
            onSave={this.handleEditCommentSave}
            onDelete={this.handleEditCommentDelete}
            body={res.body}
            timePosted={res.timePosted}
            timeZone={this.state.timeZone}
          ></ForumComment>
        );
        var cmpArr = this.state.allReplies;
        cmpArr.push(newReply);
        this.setState({ allReplies: cmpArr });
        // Add to parent's allReplyIDs array
        axios
          .put(
            `http://localhost:3001/forum/addReply/${this.props.match.params.postID}`,
            {
              childID: res._id,
            }
          )
          .then((json) => {
            if (json.data.success) {
              axios
                .put(
                  `http://localhost:3001/users/addPost/${this.state.currentUser}`,
                  {
                    postID: json.data.child._id,
                  }
                )
                .then((json) => {
                  console.log(json.data);
                });
              console.log("Comment Posted Successfully");
              this.setState({ comment: "", numOfReplies: this.state.numOfReplies + 1});
            }
          });
      });
  }

  onUpVote() {
    this.setState({ votes: ++this.state.votes }, this.handleVote());
  }
  onDownVote() {
    this.setState({ votes: --this.state.votes }, this.handleVote());
  }

  handleVote() {
    axios
      .put(`http://localhost:3001/forum/${this.props.match.params.postID}`, {
        votes: this.state.votes,
      })
      .then((json) => {
        console.log(json.data);
      });
  }

  handleEditComment(e) {
    this.setState({ comment: e.target.value });
  }

  handleEditCommentSave(id, newBody) {
    axios
      .put(`http://localhost:3001/forum/${id}`, {
        body: newBody,
      })
      .then((json) => {
        if (json.data.success) {
          console.log("Comment Updated");
        }
      });
  }

  handleEditCommentDelete(id) {
    axios
      .delete(`http://localhost:3001/forum/${id}`)
      .then((json) => {
        if (json.data.success) {
          axios
            .put(`http://localhost:3001/forum/removeReply/${this.props.match.params.postID}`, {
              childID: id
            })
            .then((json) => {
              if (json.data.success) {
                console.log("Comment Deleted");
              }
            })
        }
      });
      this.setState({ numOfReplies: this.state.numOfReplies - 1 });
  }

  handleEditPost(e) {
    this.setState({ body: e.target.value });
  }

  handleSavePost() {
    axios
      .put(`http://localhost:3001/forum/${this.props.match.params.postID}`, {
        body: this.state.body,
        title: this.state.title,
      })
      .then((json) => {
        if (json.data.success) {
          console.log("Post Updated");
          this.setState({ editing: false });
        }
      });
  }

  handleCancel() {
    this.setState({ editing: false, body: this.state.oldBody });
  }

  handleEditTitle(e) {
    this.setState({ title: e.target.value });
  }

  handleDeletePost() {
    axios
      .delete(`http://localhost:3001/forum/${this.props.match.params.postID}`)
      .then((json) => {
        if (json.data.success) {
          console.log("Post Deleted");
          this.setState({ editing: false });
          this.props.push("/Forum");
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

    const submitStyle = {
      marginTop: 3,
      marginBottom: 0,
      marginRight: 2,
    };

    const tileStyle = {};

    const gridStyle = {
      marginTop: 20,
    };

    const titleStyle = {
      marginTop: 20,
      color: "#535353",
    };

    const gameTitle = {
      color: "black",
      marginTop: 20,
      marginLeft: 8,
    };
    const gameDesc = {
      color: "#535353",
      marginTop: 5,
      marginLeft: 8,
    };
    const bull = <span className={styles.bullet}>•</span>;

    const {
      author,
      title,
      body,
      avatar,
      votes,
      ownAvatar,
      currentUser,
      numOfReplies
    } = this.state;
    const timePosted = this.convertTime(this.state.timePosted);
    var replies = [];
    this.state.allReplies.forEach((reply) => {
      replies.push(reply);
    });
    const comment = this.state.comment;
    const editButton =
      author === currentUser ? (
        <Button
          onClick={() => this.setState({ editing: true, oldBody: body })}
          className={styles.editPostButton}
          color="secondary"
          variant="contained"
        >
          <EditIcon></EditIcon>
        </Button>
      ) : (
        ""
      );

    const forumPostUI = this.state.editing ? (
      <EditForumPost
        body={body}
        title={title}
        onDelete={this.handleDeletePost}
        onCancel={this.handleCancel}
        onTitleEdit={this.handleEditTitle}
        onBodyEdit={this.handleEditPost}
        onSave={this.handleSavePost}
      ></EditForumPost>
    ) : (
      <div className="content">
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Card className={styles.postSpacing}>
              <CardContent className={styles.mainPostSpacing}>
                <Grid container spacing={1}>
                  <Grid item xs={2}>
                    <Avatar src={avatar} className={styles.avatarForum} />
                    <div className={styles.postStats}>
                      <div>
                        <Typography
                          className={styles.statsText}
                          display="inline"
                        >
                          Votes:{" "}
                        </Typography>
                        <Typography
                          className={styles.statsNumber}
                          display="inline"
                        >
                          {votes}
                        </Typography>
                      </div>

                      <div>
                        <Typography
                          className={styles.statsText}
                          display="inline"
                        >
                          Replies:{" "}
                        </Typography>
                        <Typography
                          className={styles.statsNumber}
                          display="inline"
                        >
                          {numOfReplies}
                        </Typography>
                      </div>
                    </div>
                    <div className={styles.arrows}>
                      <ExpandLessIcon
                        className={styles.upDownVote}
                        fontsize="large"
                        onClick={this.onUpVote}
                      ></ExpandLessIcon>
                      <Typography className={styles.voteNumber}>
                        {votes}
                      </Typography>
                      <ExpandMoreIcon
                        className={styles.upDownVote}
                        fontsize="large"
                        onClick={this.onDownVote}
                      ></ExpandMoreIcon>
                    </div>
                  </Grid>
                  <Grid item xs={10}>
                    {editButton}

                    <Typography variant="h6" className={styles.forumPostTitle}>
                      {title}
                    </Typography>
                    <Typography
                      className={styles.userNameForum}
                      display="inline"
                    >
                      {author},{" "}
                    </Typography>
                    <Typography className={styles.timeStamp} display="inline">
                      {timePosted}
                    </Typography>
                    <hr
                      style={{
                        color: "#ababab",
                        backgroundColor: "#ababab",
                        height: 0.5,
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    />
                    <Typography variant="body1" className={styles.forumBody}>
                      {body}
                    </Typography>

                    <Typography className={styles.commentNumber}>
                      {numOfReplies} Comments
                    </Typography>
                    <hr
                      style={{
                        color: "#ababab",
                        backgroundColor: "#ababab",
                        height: 0.5,
                        marginTop: 20,
                        marginBottom: 20,
                      }}
                    />

                    {replies}

                    <Grid container spacing={8}>
                      <Grid item xs={1}>
                        <Avatar src={ownAvatar} className={styles.smallSize} />
                      </Grid>
                      <Grid item xs={10}>
                        <TextField
                          id="standard-textarea"
                          label="Leave a Comment"
                          className={styles.commentBox}
                          value={comment}
                          onChange={this.handleEditComment}
                          multiline
                        />
                        <Button
                          className={styles.postComment}
                          variant="contained"
                          color="primary"
                          onClick={this.handlePostComment}
                        >
                          Post Comment
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={4}>
            <Card className={styles.postSpacing}>
              <CardContent>
                <Typography variant="h6" className={styles.forumPostTitle}>
                  Related Posts
                </Typography>
                <hr
                  style={{
                    color: "#ababab",
                    backgroundColor: "#ababab",
                    height: 0.5,
                    marginTop: 15,
                    marginBottom: 15,
                  }}
                />
                <div className={styles.relatedPosts}>
                  <Typography className={styles.relatedLinks}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla eget rhoncus nunc, eget tempor purus.
                  </Typography>
                  <div className={styles.marginTop}>
                    <Typography
                      className={styles.userNameForum}
                      display="inline"
                    >
                      StrongLittleOne{bull}
                    </Typography>
                    <Typography className={styles.timeStamp} display="inline">
                      26 Comments
                    </Typography>
                  </div>
                </div>

                <div className={styles.relatedPosts}>
                  <Typography className={styles.relatedLinks}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla eget rhoncus nunc, eget tempor purus.
                  </Typography>
                  <div className={styles.marginTop}>
                    <Typography
                      className={styles.userNameForum}
                      display="inline"
                    >
                      StrongLittleOne{bull}
                    </Typography>
                    <Typography className={styles.timeStamp} display="inline">
                      26 Comments
                    </Typography>
                  </div>
                </div>
                <div className={styles.relatedPosts}>
                  <Typography className={styles.relatedLinks}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nulla eget rhoncus nunc, eget tempor purus.
                  </Typography>
                  <div className={styles.marginTop}>
                    <Typography
                      className={styles.userNameForum}
                      display="inline"
                    >
                      StrongLittleOne{bull}
                    </Typography>
                    <Typography className={styles.timeStamp} display="inline">
                      26 Comments
                    </Typography>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );

    return (
      <div>
        <TopMenu history={this.props.history}></TopMenu>
        {forumPostUI}
      </div>
    );
  }
}

export default ForumPost;
