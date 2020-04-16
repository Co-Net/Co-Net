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

    this.state = {
      username: "",
      bio: "",
      editing: false,
      firstName: "",
      lastName: "",
      photo: "",
      timeZone: "",
      allTags: [],
      userTags: [],
      feedback: "",
      positiveRep: [],
      negativeRep: [],
    };
  }

  componentDidMount() {
    // Own Profile
    var route;
    if (this.props.ownProfile) {
      route = "http://localhost:3001/user/currentuser";
    } else {
      route = `http://localhost:3001/users/${this.props.match.params.username}`;
    }
    axios
      .get(route, {
        withCredentials: true,
      })
      .then((json) => {
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
        if (json.data.positiveRep) {
          this.setState({ positiveRep: json.data.positiveRep.length });
        }
        if (json.data.negativeRep) {
          this.setState({ negativeRep: json.data.negativeRep.length });
        }
      });

    axios.get("http://localhost:3001/userTags/").then((json) => {
      // Get Tag Object Array and set it
      this.setState({ allTags: json.data.tagObj });
    });
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
    this.setState({
      feedback: newFeedback,
    });
  }

  handleFeedbackPost(repType) {
    axios
      .put(
        `http://localhost:3001/users/addReputation/${this.props.match.params.username}`,
        {
          username: this.state.username,
          reputation: repType,
          comment: this.state.feedback,
        }
      )
      .then((json) => {
        if (json.data.success) {
          console.log(
            `Feedback for ${this.state.username} successfully posted`
          );
          if (repType === "+")
            this.setState({ positiveRep: this.state.positiveRep + 1 });
          else this.setState({ negativeRep: this.state.negativeRep + 1 });
        } else console.log("An error has occurred while posting your feedback");
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

    const { allTags, userTags, positiveRep, negativeRep } = this.state;

    // Conditional Rendering
    var editProfileE;
    var setStatusE;
    var setTagsE;
    var feedbackE;
    if (this.props.ownProfile) {
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
      setStatusE = <Status></Status>;
      feedbackE = (
        <div style={{ margin: 15 }} className={styles.center}>
          <Thumbs
            positive={positiveRep}
            negative={negativeRep}
            onFeedbackPost={this.handleFeedbackPost}
            onFeedbackEdit={this.handleFeedbackEdit}
          ></Thumbs>
          {setStatusE}
        </div>
      );
      setTagsE = (
        <Grid item xs={10}>
          <Multiselect
            options={allTags}
            displayValue="name"
            selectedValues={userTags}
            onSelect={this.onTagSelect}
            onRemove={this.onTagRemove}
            style={this.style}
          />
        </Grid>
      );
    } else {
      setStatusE = <Status></Status>;
      feedbackE = (
        <div style={{ margin: 15 }} className={styles.center}>
          <Thumbs
            positive={positiveRep}
            negative={negativeRep}
            onFeedbackPost={this.handleFeedbackPost}
            onFeedbackEdit={this.handleFeedbackEdit}
          ></Thumbs>
          {setStatusE}
        </div>
      );
      setTagsE = (
        <Grid item xs={10}>
          <Multiselect
            options={allTags}
            displayValue="name"
            selectedValues={userTags}
            onSelect={this.onTagSelect}
            onRemove={this.onTagRemove}
            style={this.style}
          />
        </Grid>
      );
    }

    if (!this.state.editing) {
      return (
        <div>
          <TopMenu history={this.props.history}></TopMenu>
          <div className={styles.bgColor}>
            <div className={styles.profilePhoto}> </div>
            <Typography className={styles.timeZone}>
              Time Zone: {this.state.timeZone}
            </Typography>
            <Avatar src={this.state.photo} className={styles.large} />

            {editProfileE}
          </div>
          <div className={styles.bgColor}>
            <Typography
              className={styles.profileText}
              variant="h5"
              style={{ paddingTop: 20 }}
              align="center"
            >
              {this.state.firstName} {this.state.lastName}
            </Typography>
            <Typography className={styles.user}>
              {this.state.username}
            </Typography>
            {feedbackE}
            <Typography
              className={styles.profileBio}
              variant="body1"
              style={{ paddingTop: 20 }}
              align="center"
            >
              {this.state.bio}
            </Typography>
            <div className={styles.tags}>
              <Grid style={{ marginTop: 10 }} container spacing={1}>
                <Grid item xs={2}>
                  <Typography className={styles.tagTitle}>Tags:</Typography>
                </Grid>
                {setTagsE}
              </Grid>
            </div>
            <Menu style={{ marginTop: 200 }} className={styles.menu}></Menu>
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
