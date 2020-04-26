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
import Brightness1Icon from "@material-ui/icons/Brightness1";
import { Link } from "@material-ui/core";

class player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: "https://res.cloudinary.com/co-net-pix/image/upload/v1586238488/default_user_avatar.jpg",
      bio: "",
      userTags: [],
      status: ""
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/users/${this.props.username}`)
      .then((json) => {
        if (!json) {
          console.log("error getting party members");
        } else {
          if (json.data.bio) {
            this.setState({ bio: json.data.bio });
          }
          if (json.data.profilePhoto) {
            this.setState({ avatar: json.data.profilePhoto });
          }
          if (json.data.status) {
            this.setState({ status: json.data.status });
          }
          if (json.data.userTags) {
            var userTags = [];
            json.data.userTags.forEach((tag) => {
              userTags.push(tag.name);
            });
            this.setState({ userTags: userTags.join(", ") });
          }
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

    const status = this.state.status;
    
    // Active, In-Game, Full, Offline, Away
    const statusColorCodes = {
      active: "#26AD00",
      ingame: "4ACFF9",
      full: "FF3200",
      offline: "C4C4C4",
      away: "FFE614",
    };

    // Set Status Color
    var statusColor;
    if (status === "Active") {
      statusColor = statusColorCodes.active;
    } else if (status === "In-Game") {
      statusColor = statusColorCodes.ingame;
    } else if (status === "Full") {
      statusColor = statusColorCodes.full;
    } else if (status === "Away") {
      statusColor = statusColorCodes.away;
    } else {
      statusColor = statusColorCodes.offline;
    }

    const fullStyle = {
      ...styles.header, // This is called the spread operator
      color: statusColor, // No need to assign this to state
    };

    return (
      <Grid container spacing={8}>
        <Grid item></Grid>
        <Grid item xs={11}>
          <Grid container spacing={8}>
            <Grid item xs={1}>
              <Avatar src={this.state.avatar} className={styles.smallSize} />
            </Grid>
            <Grid item xs={10}>
              <div>
                <Brightness1Icon
                  className={styles.statusDot}
                  style={fullStyle}
                  display="inline"
                ></Brightness1Icon>

                <Typography className={styles.userNameGame} display="inline">
                  <Link href={`/profile/${this.props.username}`}>
                    {this.props.username}
                  </Link>{" "}
                </Typography>
              </div>
              <Typography variant="body1" className={styles.gamePlayer}>
                {this.state.bio}
              </Typography>
              <Typography variant="body1" className={styles.commentBody}>
                Tags: {this.state.userTags.length > 0 ? this.state.userTags : "None" }
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default player;
