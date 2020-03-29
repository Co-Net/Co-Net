import React, { Component } from "react";
import axios from "axios";

class TestLogout extends Component {
  render() {
    return (
      <div>
        <button type="button" onClick={getCurrentUser}>
          Get Current User
        </button>
        <button type="button" onClick={loginUser}>
          Sign In
        </button>
        <button type="button" onClick={logoutUser}>
          Log Out
        </button>
      </div>
    );
  }
}

function loginUser() {
  axios
    .post(
      "http://localhost:3001/users/signin",
      {
        username: "conettwoboi@gmail.com",
        password: "password2"
      },
      { withCredentials: true }
    )
    .then(json => {
      if (json.data.success) alert("Signed in");
    });
}

function logoutUser() {
  axios
    .get("http://localhost:3001/users/logout", { withCredentials: true })
    .then(json => {
      if (json.data.loggedOut) {
        alert("Logged out");
      }
    });
}

function getCurrentUser() {
  // Post request to backend
  axios
    .get("http://localhost:3001/user/currentuser", { withCredentials: true })
    .then(json => {
      if (json.data.username) {
        console.log("SUCCESS");
        alert(json.data.username + " - " + json.data.email);
      } else {
        alert("Not Logged In");
        console.log("FAIL");
      }
    });
}

export default TestLogout;
