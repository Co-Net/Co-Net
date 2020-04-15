import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import TopMenu from "./TopMenu";
import { createMuiTheme } from "@material-ui/core/styles";
import styles from "./main.module.css";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import TimeZonePicker from "react-timezone";

class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
    this.onTimeZoneChange = this.onTimeZoneChange.bind(this);

    this.state = {
      photo: this.props.photo,
    };
  }

  onEdit(e) {
    this.props.onEdit(e.target.value);
  }

  onSave() {
    this.props.onSave();
  }

  onTimeZoneChange(timezone) {
    this.props.onTimeZoneChange(timezone);
  }

  onPhotoChange(event) {
    this.props.onPhotoChange(event, (newPhoto) => {
      this.setState({ photo: newPhoto });
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

    const bio = this.props.bio;
    const firstName = this.props.firstName;
    const lastName = this.props.lastName;
    const timeZone = this.props.timeZone;

    return (
      <div>
        <TopMenu history={this.props.history}></TopMenu>
        <div className={styles.bgColor}>
          <div className={styles.profilePhoto}> </div>
          <Typography>
            Change Timezone:
            <TimeZonePicker
              value={timeZone}
              onChange={this.onTimeZoneChange}
              inputProps={{
                placeholder: "Select Timezone...",
              }}
            />
          </Typography>
          <div>
            <Avatar src={this.state.photo} className={styles.large} />
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="raised-button-file"
              multiple
              type="file"
              onChange={this.onPhotoChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="contained"
                color="secondary"
                className={styles.editProfileButton}
                component="span"
              >
                Edit
              </Button>
            </label>
          </div>

          <Button
            variant="contained"
            color="primary"
            size="large"
            className={styles.editProfile}
            onClick={this.onSave}
          >
            Save Changes
          </Button>
        </div>
        <div className={styles.bgColor}>
          <Typography
            className={styles.profileText}
            variant="h5"
            style={{ paddingTop: 20 }}
            align="center"
          >
            {firstName} {lastName}
          </Typography>
          <div className={styles.bioDiv}>
            <TextField
              id="outlined-multiline-static"
              className={styles.bioEdit}
              label="Edit Bio"
              multiline
              rows="4"
              margin="normal"
              variant="outlined"
              value={bio}
              onChange={this.onEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
