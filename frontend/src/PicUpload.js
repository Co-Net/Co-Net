/*
 * PicUpload.js
 * A temp file to test photo uploading functionality. Need to implement it in official Create Post component
 * Author: Julian L
 */
import React, { Component } from "react";
import axios from "axios";

class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      username: "conetwoboi",
      photo: ""
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFileChange(event) {
    this.setState({
      file: event.target.files[0]
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file);
    formData.append("username", this.state.username);

    axios.put(`http://localhost:3001/users/photo/${this.state.username}`, formData).then(json => {
      console.log(json);
      if (json.data.success) {
        //Creates post
        console.log("PHOTO UPDATE SUCCESS");
      } else {
        // Handle failed post creation?
        console.log("PHOTO UPDATE FAIL");
      }
    });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/users/${this.state.username}`)
      .then(res => {
        this.setState({
          photo: res.data.profilePhoto
        });
      });
  }

  render() {
    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <div class="field">
          <label> Image </label>
          <input name="photo" type="file" onChange={this.handleFileChange} />
        </div>
        <button class="ui primary button" type="submit">
          Post
        </button>
      </form>
      <img src={this.state.photo}></img>
      </div>
    );
  }
}

export default PicUpload;