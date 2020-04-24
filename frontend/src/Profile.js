import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import TopMenu from "./TopMenu";
import axios from "axios";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./main.module.css";
import Typography from "@material-ui/core/Typography";
import Menu from "./ProfileMenu.js";
import Button from "@material-ui/core/Button";
import EditProfile from "./editProfile";
import Status from "./status.js";
import Thumbs from "./thumbs";
import { Multiselect } from "multiselect-react-dropdown";
import Grid from "@material-ui/core/Grid";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import Error404 from "./Error404";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import AddTags from './AddTags';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleBioChange = this.handleBioChange.bind(this);
    this.handleBioSave = this.handleBioSave.bind(this);
    this.handlePhotoChange = this.handlePhotoChange.bind(this);
    this.handleTimeZoneChange = this.handleTimeZoneChange.bind(this);
    this.onTagSelect = this.onTagSelect.bind(this);
    this.onTagRemove = this.onTagRemove.bind(this);
    this.handleFeedbackPost = this.handleFeedbackPost.bind(this);
    this.handleFeedbackEdit = this.handleFeedbackEdit.bind(this);
    this.analyzeRep = this.analyzeRep.bind(this);
    this.handleFeedbackEditCancel = this.handleFeedbackEditCancel.bind(this);
    this.handleFollow = this.handleFollow.bind(this);
    this.handleUnfollow = this.handleUnfollow.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);

    this.state = {
      username: "",
      bio: "",
      avatar: "",
      editing: false,
      firstName: "",
      lastName: "",
      photo: "",
      timeZone: "",
      allTags: [],
      userTags: [],
      positiveRep: 0,
      negativeRep: 0,
      allRep: [],
      currentUser: "",
      pastFeedback: {},
      oldFeedback: {},
      ownProfile: false,
      status: "",
      followText: "Follow",
      followList: [],
      currentFollowList: [],
      activityList: [],
      error: false
    };
  }

  componentDidMount() {
    // Check if profile exists, if not alert them and redirect to Own Profile
    if (!this.props.ownProfile) {
      axios
        .get(`http://localhost:3001/users/${this.props.match.params.username}`)
        .then((json) => {
          if (!json.data) {
            // this.props.history.push('/error');
            this.setState({ error: true });
          }
        });
    }
    // Get own username first
    var route = "http://localhost:3001/user/currentuser";
    axios
      .get(route, {
        withCredentials: true,
      })
      .then((json) => {
        if (json.data.username === "Guest") this.props.history.push("/signin");
        else this.setState({ currentUser: json.data.username });
        if (json.data.profilePhoto) {
          this.setState({ avatar: json.data.profilePhoto });
        }
        if (json.data.friends) {
          this.setState({ currentFollowList: json.data.friends });
        }
        // If own profile, get rest of data
        if (
          this.props.ownProfile ||
          this.props.match.params.username === json.data.username
        ) {
          this.setState({ ownProfile: true });
          if (json.data.username) {
            this.setState({ username: json.data.username });
          }
          if (json.data.bio) {
            this.setState({ bio: json.data.bio });
          }
          if (json.data.firstName) {
            this.setState({ firstName: json.data.firstName });
          }
          if (json.data.lastName) {
            this.setState({ lastName: json.data.lastName });
          }
          if (json.data.profilePhoto) {
            this.setState({ photo: json.data.profilePhoto });
          }
          if (json.data.timeZone) {
            this.setState({ timeZone: json.data.timeZone });
          }
          if (json.data.userTags) {
            this.setState({ userTags: json.data.userTags });
          }
          if (json.data.playerRep) {
            this.setState({ allRep: json.data.playerRep });
            this.analyzeRep(json.data.playerRep);
          }
          if (json.data.status) {
            this.setState({ status: json.data.status });
          }
          if (json.data.friends) {
            this.setState({ followList: json.data.friends })
          }
          console.log(json.data.forumPosts);
          if (json.data.forumPosts) {
            this.setState({ activityList: json.data.forumPosts });
          }
        } else {
          // If not own profile, get the other user's data
          route = `http://localhost:3001/users/${this.props.match.params.username}`;
          axios.get(route).then((json) => {
            if (json.data.username) {
              this.setState({ username: json.data.username });
            }
            if (json.data.bio) {
              this.setState({ bio: json.data.bio });
            }
            if (json.data.firstName) {
              this.setState({ firstName: json.data.firstName });
            }
            if (json.data.lastName) {
              this.setState({ lastName: json.data.lastName });
            }
            if (json.data.profilePhoto) {
              this.setState({ photo: json.data.profilePhoto });
            }
            if (json.data.timeZone) {
              this.setState({ timeZone: json.data.timeZone });
            }
            if (json.data.userTags) {
              this.setState({ userTags: json.data.userTags });
            }
            if (json.data.playerRep) {
              this.setState({ allRep: json.data.playerRep });
              this.analyzeRep(json.data.playerRep);
            }
            if (json.data.status) {
              this.setState({ status: json.data.status });
            }
            if (json.data.friends) {
              this.setState({ followList: json.data.friends });
            }
            if (json.data.forumPosts) {
              this.setState({ activityList: json.data.forumPosts });
            }
            if (this.state.currentFollowList.some(user => user.username === this.state.username)) {
              this.setState({ followText: 'Unfollow' });
            }
            else {
              //console.log("smol wang");
              this.setState({ followText: 'Follow' });
            }
          });
        }
      });

    axios.get("http://localhost:3001/userTags/").then((json) => {
      // Get Tag Object Array and set it
      this.setState({
        allTags: json.data.tagObj.sort(function (a, b) {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        })
      });
    });
  }

  // Split rep into positive and negative
  // Check if user already left feedback on profile
  analyzeRep(playerRep) {
    var positiveRepCount = this.state.positiveRep;
    var negativeRepCount = this.state.negativeRep;
    playerRep.forEach((review) => {
      if (review.rep === "+") {
        positiveRepCount++;
      } else {
        negativeRepCount++;
      }
      if (review.username === this.state.currentUser) {
        this.setState({ pastFeedback: review, oldFeedback: review });
      }
    });
    this.setState({ positiveRep: positiveRepCount });
    this.setState({ negativeRep: negativeRepCount });
  }

  handleBioChange(newBio) {
    this.setState({ bio: newBio });
  }

  handleBioSave() {
    // make update call to user bio
    axios
      .put(`http://localhost:3001/users/${this.state.username}`, {
        bio: this.state.bio,
        timeZone: this.state.timeZone,
      })
      .then((json) => {
        if (json.data.success) {
          console.log("Bio successfully updated");
        } else console.log("An error has occurred while saving your bio.");
      });
    this.setState({ editing: false });
  }

  handleTimeZoneChange(newTimeZone) {
    this.setState({ timeZone: newTimeZone });
  }

  handlePhotoChange(event, callback) {
    if (event.target.files.length > 0) {
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
      axios
        .put(
          `http://localhost:3001/users/photo/${this.state.username}`,
          formData
        )
        .then((json) => {
          if (json.data.success) {
            // Photo uploaded successfully
            console.log("PHOTO UPLOAD SUCCESS");
            this.setState({ photo: json.data.user.profilePhoto });
            callback(json.data.user.profilePhoto);
          } else {
            // Photo upload failed
            console.log("PHOTO UPLOAD FAIL");
            console.log(json);
          }
        });
    }
  }

  handleFeedbackEdit(newFeedback) {
    var tmp = {
      _id: this.state.pastFeedback._id,
      username: this.state.pastFeedback.username,
      rep: this.state.pastFeedback.rep,
      comment: newFeedback,
    };
    this.setState({
      pastFeedback: tmp,
    });
  }

  handleFeedbackEditCancel() {
    this.setState({
      pastFeedback: this.state.oldFeedback,
    });
  }
  handleFeedbackPost(repType) {
    axios
      .put(
        `http://localhost:3001/users/addReputation/${this.props.match.params.username}`,
        {
          _id: this.state.pastFeedback._id,
          username: this.state.currentUser,
          reputation: repType,
          comment: this.state.pastFeedback.comment,
          avatar: this.state.avatar,
        }
      )
      .then((json) => {
        // console.log(json.data);
        if (json.data.success) {
          if (json.data.result === "CREATED") {
            console.log(
              `Feedback for ${this.state.username} successfully posted`
            );
            if (repType === "+") {
              this.setState({ positiveRep: this.state.positiveRep + 1 });
            } else {
              this.setState({ negativeRep: this.state.negativeRep + 1 });
            }
          } else {
            console.log(
              `Feedback for ${this.state.username} successfully updated`
            );
            if (repType != this.state.oldFeedback.rep) {
              if (repType === "+") {
                this.setState({ positiveRep: this.state.positiveRep + 1 });
                this.setState({ negativeRep: this.state.negativeRep - 1 });
              } else {
                this.setState({ positiveRep: this.state.positiveRep - 1 });
                this.setState({ negativeRep: this.state.negativeRep + 1 });
              }
            }
          }
          this.setState({ oldFeedback: json.data.feedback });
          this.setState({ pastFeedback: json.data.feedback });
          this.setState({ allRep: json.data.playerRep });
        } else {
          console.log("An error has occurred while posting your feedback");
        }
      });
  }

  onTagSelect(selectedList, selectedItem) {
    // Save selected user tags
    axios
      .put(
        `http://localhost:3001/users/addTag/${this.state.username}`,
        selectedItem
      )
      .then((json) => {
        if (json.data.success) {
          console.log(`User Tag ${selectedItem.name} successfully added`);
        } else
          console.log("An error has occurred while adding your User Tags.");
      });
  }

  onTagRemove(selectedList, selectedItem) {
    // Remove selected user tags
    axios
      .put(
        `http://localhost:3001/users/removeUserTag/${this.state.username}`,
        selectedItem
      )
      .then((json) => {
        if (json.data.success) {
          console.log(`User Tag ${selectedItem.name} successfully removed`);
        } else
          console.log("An error has occurred while removing your User Tags.");
      });
  }

  handleFollow() {
    axios
      .put(
        `http://localhost:3001/users/addFriend/${this.state.currentUser}`, {
        username: this.state.username
      })
      .then((json) => {
        console.log(json.data);
        if (json.data.success) {
          this.setState({ followText: 'Unfollow' });
          console.log("Follow Request Success!");
        }
        else alert("Something went wrong. Please try again");
      })
  }

  handleUnfollow() {
    axios
      .put(
        `http://localhost:3001/users/removeFriend/${this.state.currentUser}`, {
        username: this.state.username
      })
      .then((json) => {
        console.log(json.data);
        if (json.data.success) {
          this.setState({ followText: 'Follow' });
          console.log("Unfollow Request Success!");
        }
        else alert("Something went wrong. Please try again");
      })
  }

  handleStatusChange(e) {
    axios
      .put(
        `http://localhost:3001/users/${this.state.currentUser}`, {
        status: e.target.value
      })
      .then((json) => {
        console.log("Status set to: " + json.data.user.status);
        this.setState({ status: json.data.user.status });
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
    this.style = {
      multiselectContainer: {
        textAlign: "center",
      },
      chips: {},
      searchBox: {
        border: "none",
        fontSize: "15px",
        fontFamily: "Segoe UI",
      },
      inputField: {
        fontSize: "15px",
      },
      multiselectContainer: {},
    };

    // Active, In-Game, Full, Offline, Away
    const statusColorCodes = {
      active: "#26AD00",
      ingame: "4ACFF9",
      full: "FF3200",
      offline: "C4C4C4",
      away: "FFE614",
    };

    const {
      allTags,
      userTags,
      positiveRep,
      negativeRep,
      ownProfile,
      status,
    } = this.state;

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

    // Other Profile User Tags
    var otherTags = "";
    userTags.forEach((tag, index, arr) => {
      if (index == arr.length - 1) otherTags = otherTags + tag.name;
      else otherTags = otherTags + tag.name + ", ";
    });
    if (otherTags.length == 0) otherTags = "None";

    // Conditional Rendering
    var editProfileE;
    var setStatusE;
    var setTagsE;
    var feedbackE;
    var followE;
    if (ownProfile) {
      // Allow edit
      editProfileE = (
        <Button
          onClick={() => this.setState({ editing: true })}
          variant="contained"
          color="primary"
          size="large"
          className={styles.editProfile}
        >
          Edit Profile
        </Button>
      );

      // Allow edit
      setStatusE = (
        <Status status={status} onStatusChange={this.handleStatusChange}></Status>
      );

      // Clicking will open the reviews page tab
      feedbackE = (
        <div style={{ margin: 15 }} className={styles.center}>
          <Thumbs
            positive={positiveRep}
            negative={negativeRep}
            onFeedbackPost={this.handleFeedbackPost}
            onFeedbackEdit={this.handleFeedbackEdit}
          ></Thumbs>
        </div>
      );

      // Allow edit
      setTagsE = (
        <div className={styles.tags}>
          <Grid style={{ marginTop: 10 }} container spacing={1}>
            <Grid item xs={4}></Grid>
            <Grid item xs={2} style={{ flexBasis: "auto" }}>
              <Typography className={styles.tagTitle}>Tags:</Typography>
            </Grid>
            <Grid item xs={9} style={{ flexBasis: "auto" }}>
              <Multiselect
                options={allTags}
                displayValue="name"
                selectedValues={userTags}
                onSelect={this.onTagSelect}
                onRemove={this.onTagRemove}
                style={this.style}
                selectionLimit={5}
              />
            </Grid><AddTags></AddTags>

          </Grid>
        </div>
      );
    } else {
      // Should only show status, don't allow edit
      setStatusE = (
        <Typography className={styles.statusText}>
          <Brightness1Icon
            className={styles.statusGuest}
            style={{ color: statusColor }}
          ></Brightness1Icon>
          {status === 'Invisible' ? "Offline" : status}
        </Typography>
      );

      // Clicking on feedback will show window to leave feedback or edit feedback
      feedbackE = (
        <div style={{ margin: 15 }} className={styles.center}>
          <Thumbs
            positive={positiveRep}
            negative={negativeRep}
            onFeedbackPost={this.handleFeedbackPost}
            onFeedbackEdit={this.handleFeedbackEdit}
            onFeedbackEditCancel={this.handleFeedbackEditCancel}
            feedback={this.state.pastFeedback}
          ></Thumbs>
          {setStatusE}
        </div>
      );

      // Show Tags, don't allow edit, use new style
      setTagsE = (
        <div className={styles.center}>
          <Typography className={styles.tagTitle}>Tags:</Typography>
          <Typography className={styles.tagsText}>{otherTags}</Typography>
        </div>
      );

      // Show Follow Button
      followE = this.state.followText === 'Follow' ? (
        <Button
          onClick={() => this.handleFollow()}
          variant="contained"
          color="primary"
          size="large"
          className={styles.editProfile}
        > {this.state.followText}
        </Button>
      ) : <Button
        onClick={() => this.handleUnfollow()}
        variant="contained"
        color="primary"
        size="large"
        className={styles.editProfile}
      > {this.state.followText}
        </Button>
    }

    if (this.state.error) {
      return <Error404></Error404>
    }
    else if (!this.state.editing) {
      return (
        <div>
          <TopMenu history={this.props.history}></TopMenu>
          <div className={styles.bgColor}>
            <div className={styles.profilePhoto}> </div>
            <Grid item xs={4} className={styles.profileCard}>
              <Card className={styles.profileCardPadding}>
                <CardContent className={styles.forumCard}>
                  <Typography>
                    Time Zone: {this.state.timeZone} </Typography>
                  <Typography>Currently Playing: <Typography className={styles.gameName} style={{ color: '#3f51b5', display: 'inline', }}>League of Legends</Typography></Typography>
                  <Typography>Current Status: </Typography>
                  {setStatusE}

                </CardContent>
              </Card>

            </Grid>


            <Avatar src={this.state.photo} className={styles.large} />
            {followE}
            {editProfileE}
          </div>
          <div className={styles.bgColor}>
            <Typography
              className={styles.profileText}
              variant="h5"
              style={{ paddingTop: 20 }}
              align="center"
            >
              {this.state.username}
            </Typography>

            {feedbackE}
            <Typography
              className={styles.profileBio}
              variant="body1"
              // style={{ paddingTop: 20 }}
              align="center"
            >
              {this.state.bio}
            </Typography>
            {setTagsE}
            <Menu
              style={{ marginTop: 200 }}
              className={styles.menu}
              username={this.state.username}
              allRep={this.state.allRep}
              timeZone={this.state.timeZone}
              currentUser={this.state.currentUser === this.state.username}
              allFollowers={this.state.followList}
              allActivity={this.state.activityList}
            ></Menu>
          </div>
        </div>
      );
    } else {
      // IF EDITING
      return (
        <EditProfile
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          bio={this.state.bio}
          timeZone={this.state.timeZone}
          photo={this.state.photo}
          onEdit={this.handleBioChange}
          onSave={this.handleBioSave}
          onPhotoChange={this.handlePhotoChange}
          onTimeZoneChange={this.handleTimeZoneChange}
        ></EditProfile>
      );
    }
  }
}

export default Profile;
