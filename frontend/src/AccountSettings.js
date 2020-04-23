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
import mainStyles from "./main.module.css";
import CheckIcon from "@material-ui/icons/Check";

class AccountSettings extends Component {
  constructor(props) {
    super(props);
    this.pushHistory = this.pushHistory.bind(this);
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleOldPasswordChange = this.handleOldPasswordChange.bind(this);
    this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.handleSettingsSave = this.handleSettingsSave.bind(this);

    this.state = {
      username: "",
      newUsername: "",
      firstName: "",
      lastName: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      emailAddress: "",
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/user/currentuser", {
        withCredentials: true,
      })
      .then((json) => {
        if (json.data.username) {
          this.setState({
            username: json.data.username,
            newUsername: json.data.username,
          });
        }
        if (json.data.firstName) {
          this.setState({ firstName: json.data.firstName });
        }
        if (json.data.lastName) {
          this.setState({ lastName: json.data.lastName });
        }
        if (json.data.email) {
          this.setState({ emailAddress: json.data.email });
        }
      });
  }

  handleSettingsSave() {
    // make update call to user bio
    const {
      username,
      newUsername,
      firstName,
      lastName,
      oldPassword,
      newPassword,
      confirmPassword,
      emailAddress,
    } = this.state;

    // If user only changing username, firstname, or lastname, then use public update route
    if (!oldPassword || !newPassword || !confirmPassword) {
      axios
        .put(`http://localhost:3001/users/${username}`, {
          username: newUsername,
          firstName: firstName,
          lastName: lastName,
          emailAddress: emailAddress,
        })
        .then((json) => {
          console.log(json);
          if (json.data.success) {
            console.log("Account successfully updated");
            this.pushHistory();
          } else {
            if (json.data.message === "Username already exists") {
              document.getElementById("errorMessage").innerText =
                "Username already in use. Please try a different username.";
            } else if (json.data.message === "MISSING INPUTS") {
              document.getElementById("errorMessage").innerText =
                "Please fill out all areas on the form before submitting.";
            } else if (json.data.message === "ILLEGAL USERNAME") {
              document.getElementById("errorMessage").innerText =
                "Username cannot contain any special characers";
            } else if (json.data.message === "SHORT PASSWORD") {
              document.getElementById("errorMessage").innerText =
                "Password must contain 8 or more characters.";
            } else {
              document.getElementById("errorMessage").innerText =
                "Server error. Please try again later.";
            }
          }
        });
    } else {
      // User needs to be verified before changing password
      // Validate old password is correct
      axios
        .post(
          "http://localhost:3001/users/signin",
          {
            username: emailAddress,
            password: oldPassword,
          },
          {
            withCredentials: true,
          }
        )
        .then((json) => {
          if (json.data.success) {
            // Validate confirm password
            if (newPassword !== confirmPassword) {
              //Error catching.
              document.getElementById("errorMessage").innerText =
                "Password did not match. Please make sure you enter the same password.";
            } else {
              axios
                .put(`http://localhost:3001/users/${username}`, {
                  username: newUsername,
                  firstName: firstName,
                  lastName: lastName,
                  password: newPassword,
                  emailAddress: emailAddress,
                })
                .then((json) => {
                  if (json.data.success) {
                    console.log("Account successfully updated");
                  } else {
                    if (
                      json.data.message ===
                      "Error: Account already exists with that username."
                    ) {
                      document.getElementById("errorMessage").innerText =
                        "Username already in use. Please try a different username.";
                    } else if (json.data.message === "MISSING INPUTS") {
                      document.getElementById("errorMessage").innerText =
                        "Please fill out all areas on the form before submitting.";
                    } else if (json.data.message === "ILLEGAL USERNAME") {
                      document.getElementById("errorMessage").innerText =
                        "Username cannot contain any special characers";
                    } else if (json.data.message === "SHORT PASSWORD") {
                      document.getElementById("errorMessage").innerText =
                        "Password must contain 8 or more characters.";
                    } else {
                      document.getElementById("errorMessage").innerText =
                        "Server error. Please try again later.";
                    }
                  }
                });
            }
          } else {
            console.log("Error getting user or old password is incorrect");
            document.getElementById("errorMessage").innerText =
              json.data.message;
          }
        });
    }
  }

  handleFirstNameChange(e) {
    this.setState({ firstName: e.target.value });
  }

  handleLastNameChange(e) {
    this.setState({ lastName: e.target.value });
  }

  handleUsernameChange(e) {
    this.setState({ newUsername: e.target.value });
  }

  handleOldPasswordChange(e) {
    this.setState({ oldPassword: e.target.value });
  }

  handleNewPasswordChange(e) {
    this.setState({ newPassword: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  pushHistory() {
    this.props.history.push("/profile");
  }

  render() {
    const theme = createMuiTheme({
      "@global": {
        body: {
          backgroundColor: "white",
        },
      },
    });

    const error = {
      backgroundColor: "#FFCCCC",
    };

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

    const subtitleStyle = {
      marginTop: 20,
      marginBottom: 20,
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

    const {
      firstName,
      lastName,
      newUsername,
      oldPassword,
      newPassword,
      confirmPassword,
    } = this.state;

    return (
      <div>
        <TopMenu history={this.props.history}></TopMenu>
        <div className="content">
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Typography
                style={titleStyle}
                align="Left"
                variant="h4"
                component="h2"
              >
                Account Settings
                <p id="errorMessage" style={error}></p>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <div style={{}}></div>
            </Grid>
          </Grid>
          <div className={mainStyles.settingsDiv}>
            <Typography
              style={subtitleStyle}
              align="Left"
              variant="h6"
              component="h2"
            >
              Change Your Name
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="First Name"
                  value={firstName}
                  onChange={this.handleFirstNameChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="Last Name"
                  value={lastName}
                  onChange={this.handleLastNameChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </div>
          <div className={mainStyles.settingsDiv}>
            <Typography
              style={subtitleStyle}
              align="Left"
              variant="h6"
              component="h2"
            >
              Edit Account Info
            </Typography>
            {/* <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  style={{ marginBottom: 20 }}
                  id="outlined-required"
                  label="Username"
                  value={newUsername}
                  onChange={this.handleUsernameChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={2}></Grid>
            </Grid> */}
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="Old Password"
                  variant="outlined"
                  value={oldPassword}
                  onChange={this.handleOldPasswordChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="New Password"
                  variant="outlined"
                  value={newPassword}
                  onChange={this.handleNewPasswordChange}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="outlined-required"
                  label="Confirm Password"
                  variant="outlined"
                  value={confirmPassword}
                  onChange={this.handleConfirmPasswordChange}
                />
              </Grid>
            </Grid>
            <div className={mainStyles.buttonMargins}>
              <Button
                onClick={this.pushHistory}
                className={mainStyles.cancelButton}
                variant="contained"
              >
                Cancel
              </Button>

              <Button
                onClick={this.handleSettingsSave}
                className={mainStyles.postButton}
                color="primary"
                variant="contained"
              >
                <CheckIcon style={{ marginRight: 6 }}></CheckIcon>Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AccountSettings;
