import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ReactDOM from "react-dom";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./App.css";
import leaguePhoto from "./leaguePhoto.jpg";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import mainStyles from "./main.module.css";
import Divider from "@material-ui/core/Divider";
import AddCircleIcon from "@material-ui/icons/AddCircle";

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

class Forum extends Component {
  constructor(props) {
    super(props);
    this.pushHistory = this.pushHistory.bind(this);
    this.createPost = this.createPost.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.getReply = this.getReply.bind(this);

    this.state = {
      allPosts: [
        {
          parentId: "",
          title: "",
          allReplyIDs: [],
          timePosted: "",
          body: "",
          game: "",
          username: "",
        },
      ],
      cards: [],
      timeZone: "",
    };
  }

  pushHistory() {
    this.props.history.push("/forumPost");
  }
  createPost() {
    this.props.history.push("/createForumPost");
  }

  convertTime(time, reply) {
    var d = new Date(time);
    const month = monthNames[d.getMonth()];
    if (reply) {
      const today = new Date();
      if (
        d.getMonth() === today.getMonth() &&
        d.getFullYear() &&
        today.getFullYear()
      ) {
        if (d.getDate() === today.getDate()) {
          var localTime = d.toLocaleString("en-US", {
            timeZone: this.state.timeZone,
          });
          localTime = new Date(localTime);
          var day = localTime.getHours() >= 12 ? "PM" : "AM";
          return `Today, ${
            (localTime.getHours() + 24) % 12 || 12
          }:${localTime.getMinutes()} ${day}`;
        } else if (d.getDate() === today.getDate() - 1) {
          return `Yesterday, `;
        }
      }
    }
    return `${month} ${d.getDate()}, ${d.getFullYear()}`;
  }

  getReply(id) {
    if (id === null) return null;
    return axios.get(`http://localhost:3001/forum/${id}`).then((json) => {
      return json.data;
    });
  }

  componentDidMount() {
    // Retreive user data
    axios
      .get("http://localhost:3001/user/currentuser", { withCredentials: true })
      .then((json) => {
        if (!json.data.username) {
          this.props.history.push("/");
        } else {
          if (json.data.timeZone)
            this.setState({ timeZone: json.data.timeZone });
          axios.get("http://localhost:3001/forum/").then((json) => {
            this.setState({ allPosts: json.data.forumPostObj });
            // Prepare card variables
            const cards = [];
            this.state.allPosts.forEach((post) => {
              // If it is a reply, don't display
              if (post.parentID != 0) return;
              const title = post.title;
              const timePosted = this.convertTime(post.timePosted, false);
              const game = post.game;
              const user = post.username;
              var recentReply;
              const waitForReply = async () => {
                var numOfComments = post.allReplyIDs.length;
                recentReply = await this.getReply(
                  numOfComments > 0
                    ? post.allReplyIDs[numOfComments - 1].childID
                    : null
                );
                var replyUser;
                var replyDate;
                if (recentReply) {
                  replyUser = recentReply.username;
                  replyDate = this.convertTime(recentReply.timePosted, true);
                }
                cards.unshift({
                  title: title,
                  timePosted: timePosted,
                  game: game,
                  user: user,
                  replyUser: replyUser,
                  replyDate: replyDate,
                  numOfComments: numOfComments,
                });
                this.setState({ cards: cards });
              };
              waitForReply();
            });
          });
        }
      });
  }

  render() {
    const { cards } = this.state;

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

    const dividerGridStyle = {
      root: {
        width: "fit-content",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        "& svg": {
          margin: theme.spacing(1.5),
        },
        "& hr": {
          margin: theme.spacing(0, 0.5),
        },
      },
    };

    const renderCards = [];
    // Render each card
    cards.forEach((card) => {
      const renderCard = (
        <Card className={mainStyles.postSpacing}>
          <CardContent className={mainStyles.forumCard}>
            <Grid container spacing={1}>
              <Grid item xs={2}>
                <img className={mainStyles.photo} src={leaguePhoto} />
              </Grid>
              <Grid item xs={6}>
                <div className={mainStyles.gameAndTitle}>
                  <Typography
                    onClick={this.pushHistory}
                    display="inline"
                    color="primary"
                    component="h2"
                    fontsize={18}
                    align="center"
                    className={mainStyles.gameName}
                    id="server-modal-title"
                  >
                    {card.game}{" "}
                  </Typography>
                  <Typography
                    onClick={this.pushHistory}
                    className={mainStyles.forumTitle}
                    display="inline"
                    component="h2"
                    fontsize={18}
                    align="center"
                    id="server-modal-title"
                  >
                    {card.title}
                  </Typography>
                </div>
                <Typography className={mainStyles.userName} display="inline">
                  {card.user}{" "}
                </Typography>
                <Typography className={mainStyles.timeStamp} display="inline">
                  {card.timePosted}
                </Typography>
              </Grid>
              <Grid item xs>
                <Grid
                  container
                  alignItems="center"
                  className={dividerGridStyle.root}
                >
                  <Grid item xs>
                    <div className={mainStyles.marginBottom}>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Comments{": "}
                      </Typography>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        {card.numOfComments}{" "}
                      </Typography>
                    </div>
                    <Typography
                      className={mainStyles.timeStamp}
                      display="inline"
                    >
                      Views:{" "}
                    </Typography>
                    <Typography
                      className={mainStyles.userName}
                      display="inline"
                    >
                      10,301{" "}
                    </Typography>
                  </Grid>
                  <Divider
                    className={mainStyles.divider}
                    orientation="vertical"
                    flexItem
                  />
                  <Grid item xs>
                    <div className={mainStyles.marginBottom}>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        {card.replyUser ? card.replyUser : "No comments"}{" "}
                      </Typography>
                    </div>
                    <Typography
                      className={mainStyles.timeStamp}
                      display="inline"
                    >
                      {card.replyDate ? card.replyDate : ""}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      );
      renderCards.unshift(renderCard);
    });

    return (
      <div>
        <TopMenu history={this.props.history}></TopMenu>
        <div className="content">
          <Grid container spacing={3}>
            <Grid item xs={5}>
              <Typography
                style={titleStyle}
                align="Left"
                variant="h4"
                component="h2"
              >
                Forum
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={this.createPost}
                style={{
                  textTransform: "none",
                  marginTop: 28,
                  padding: 10,
                  marginBottom: 10,
                }}
                color="primary"
                variant="contained"
              >
                <AddCircleIcon style={{ marginRight: 6 }}></AddCircleIcon>Create
                Post
              </Button>
            </Grid>
            <Grid item xs={3}>
              <div style={{}}>
                <Button
                  size="large"
                  style={{
                    textTransform: "none",
                    marginTop: 28,
                    padding: 10,
                    marginRight: 40,
                    float: "right",
                  }}
                >
                  Filter by:
                  <FilterListIcon style={{ marginLeft: 20 }}></FilterListIcon>
                </Button>
              </div>
            </Grid>
          </Grid>

          {renderCards}
          {/* <Card className={mainStyles.postSpacing}>
            <CardContent className={mainStyles.forumCard}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img className={mainStyles.photo} src={leaguePhoto} />
                </Grid>
                <Grid item xs={6}>
                  <div className={mainStyles.gameAndTitle}>
                    <Typography
                      onClick={this.pushHistory}
                      display="inline"
                      color="primary"
                      component="h2"
                      fontsize={18}
                      align="center"
                      className={mainStyles.gameName}
                      id="server-modal-title"
                    >
                      League of Legends:{" "}
                    </Typography>
                    <Typography
                      onClick={this.pushHistory}
                      className={mainStyles.forumTitle}
                      display="inline"
                      component="h2"
                      fontsize={18}
                      align="center"
                      id="server-modal-title"
                    >
                      LOOKING FOR DUO FOR RANKED
                    </Typography>
                  </div>
                  <Typography className={mainStyles.userName} display="inline">
                    Destroyer392,{" "}
                  </Typography>
                  <Typography className={mainStyles.timeStamp} display="inline">
                    February 2, 2020
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    className={dividerGridStyle.root}
                  >
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.timeStamp}
                          display="inline"
                        >
                          Comments{" "}
                        </Typography>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          2,194{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Views:{" "}
                      </Typography>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        10,301{" "}
                      </Typography>
                    </Grid>
                    <Divider
                      className={mainStyles.divider}
                      orientation="vertical"
                      flexItem
                    />
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          uniqueDrag{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Today, 1:21 PM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={mainStyles.postSpacing}>
            <CardContent className={mainStyles.forumCard}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img className={mainStyles.photo} src={leaguePhoto} />
                </Grid>
                <Grid item xs={6}>
                  <div className={mainStyles.gameAndTitle}>
                    <Typography
                      display="inline"
                      color="primary"
                      component="h2"
                      fontsize={18}
                      align="center"
                      className={mainStyles.gameName}
                      id="server-modal-title"
                    >
                      League of Legends:{" "}
                    </Typography>
                    <Typography
                      className={mainStyles.forumTitle}
                      display="inline"
                      component="h2"
                      fontsize={18}
                      align="center"
                      id="server-modal-title"
                    >
                      LOOKING FOR DUO FOR RANKED
                    </Typography>
                  </div>
                  <Typography className={mainStyles.userName} display="inline">
                    Destroyer392,{" "}
                  </Typography>
                  <Typography className={mainStyles.timeStamp} display="inline">
                    February 2, 2020
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    className={dividerGridStyle.root}
                  >
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.timeStamp}
                          display="inline"
                        >
                          Comments{" "}
                        </Typography>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          2,194{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Views:{" "}
                      </Typography>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        10,301{" "}
                      </Typography>
                    </Grid>
                    <Divider
                      className={mainStyles.divider}
                      orientation="vertical"
                      flexItem
                    />
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          uniqueDrag{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Today, 1:21 PM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={mainStyles.postSpacing}>
            <CardContent className={mainStyles.forumCard}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img className={mainStyles.photo} src={leaguePhoto} />
                </Grid>
                <Grid item xs={6}>
                  <div className={mainStyles.gameAndTitle}>
                    <Typography
                      display="inline"
                      color="primary"
                      component="h2"
                      fontsize={18}
                      align="center"
                      className={mainStyles.gameName}
                      id="server-modal-title"
                    >
                      League of Legends:{" "}
                    </Typography>
                    <Typography
                      className={mainStyles.forumTitle}
                      display="inline"
                      component="h2"
                      fontsize={18}
                      align="center"
                      id="server-modal-title"
                    >
                      LOOKING FOR DUO FOR RANKED
                    </Typography>
                  </div>
                  <Typography className={mainStyles.userName} display="inline">
                    Destroyer392,{" "}
                  </Typography>
                  <Typography className={mainStyles.timeStamp} display="inline">
                    February 2, 2020
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    className={dividerGridStyle.root}
                  >
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.timeStamp}
                          display="inline"
                        >
                          Comments{" "}
                        </Typography>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          2,194{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Views:{" "}
                      </Typography>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        10,301{" "}
                      </Typography>
                    </Grid>
                    <Divider
                      className={mainStyles.divider}
                      orientation="vertical"
                      flexItem
                    />
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          uniqueDrag{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Today, 1:21 PM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={mainStyles.postSpacing}>
            <CardContent className={mainStyles.forumCard}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img className={mainStyles.photo} src={leaguePhoto} />
                </Grid>
                <Grid item xs={6}>
                  <div className={mainStyles.gameAndTitle}>
                    <Typography
                      display="inline"
                      color="primary"
                      component="h2"
                      fontsize={18}
                      align="center"
                      className={mainStyles.gameName}
                      id="server-modal-title"
                    >
                      League of Legends:{" "}
                    </Typography>
                    <Typography
                      className={mainStyles.forumTitle}
                      display="inline"
                      component="h2"
                      fontsize={18}
                      align="center"
                      id="server-modal-title"
                    >
                      LOOKING FOR DUO FOR RANKED
                    </Typography>
                  </div>
                  <Typography className={mainStyles.userName} display="inline">
                    Destroyer392,{" "}
                  </Typography>
                  <Typography className={mainStyles.timeStamp} display="inline">
                    February 2, 2020
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    className={dividerGridStyle.root}
                  >
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.timeStamp}
                          display="inline"
                        >
                          Comments{" "}
                        </Typography>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          2,194{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Views:{" "}
                      </Typography>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        10,301{" "}
                      </Typography>
                    </Grid>
                    <Divider
                      className={mainStyles.divider}
                      orientation="vertical"
                      flexItem
                    />
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          uniqueDrag{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Today, 1:21 PM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card className={mainStyles.postSpacing}>
            <CardContent className={mainStyles.forumCard}>
              <Grid container spacing={1}>
                <Grid item xs={2}>
                  <img className={mainStyles.photo} src={leaguePhoto} />
                </Grid>
                <Grid item xs={6}>
                  <div className={mainStyles.gameAndTitle}>
                    <Typography
                      display="inline"
                      color="primary"
                      component="h2"
                      fontsize={18}
                      align="center"
                      className={mainStyles.gameName}
                      id="server-modal-title"
                    >
                      League of Legends:{" "}
                    </Typography>
                    <Typography
                      className={mainStyles.forumTitle}
                      display="inline"
                      component="h2"
                      fontsize={18}
                      align="center"
                      id="server-modal-title"
                    >
                      LOOKING FOR DUO FOR RANKED
                    </Typography>
                  </div>
                  <Typography className={mainStyles.userName} display="inline">
                    Destroyer392,{" "}
                  </Typography>
                  <Typography className={mainStyles.timeStamp} display="inline">
                    February 2, 2020
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Grid
                    container
                    alignItems="center"
                    className={dividerGridStyle.root}
                  >
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.timeStamp}
                          display="inline"
                        >
                          Comments{" "}
                        </Typography>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          2,194{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Views:{" "}
                      </Typography>
                      <Typography
                        className={mainStyles.userName}
                        display="inline"
                      >
                        10,301{" "}
                      </Typography>
                    </Grid>
                    <Divider
                      className={mainStyles.divider}
                      orientation="vertical"
                      flexItem
                    />
                    <Grid item xs>
                      <div className={mainStyles.marginBottom}>
                        <Typography
                          className={mainStyles.userName}
                          display="inline"
                        >
                          uniqueDrag{" "}
                        </Typography>
                      </div>
                      <Typography
                        className={mainStyles.timeStamp}
                        display="inline"
                      >
                        Today, 1:21 PM
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card> */}
        </div>
      </div>
    );
  }
}

export default Forum;
