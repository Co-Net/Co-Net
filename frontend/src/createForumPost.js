/* eslint-disable no-use-before-define */
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
import Autocomplete from "@material-ui/lab/Autocomplete";
import AutoGame from "./autoGame";
import CreatableSelect from "react-select/creatable";
import Select from "@material-ui/core/Select";
import CheckIcon from "@material-ui/icons/Check";

class CreateForumPost extends Component {
  constructor(props) {
    super(props);
    this.handleBodyEdit = this.handleBodyEdit.bind(this);
    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleTitleEdit = this.handleTitleEdit.bind(this);
    this.handlePostCreate = this.handlePostCreate.bind(this);

    this.state = {
      username: "",
      title: "",
      body: "",
      game: "",
      gamesLoading: true,
      gameList: [],
    };
  }

  componentDidMount() {
    // Retreive user data
    axios
      .get("http://localhost:3001/user/currentuser", { withCredentials: true })
      .then((json) => {
        if (json.data.username === "Guest") this.props.history.push("/Forum");
        this.setState({ username: json.data.username });
        // console.log("loading games");
        // axios.get("http://localhost:3001/games").then((json) => {
        //   let gamesArr = json.data.gameObj;
        //   let gameNamesCmps = [];
        //   let key = 1;
        //   for (let i = 0; i < 20; i++) {
        //     const cmp = (
        //       <MenuItem key={key} value={gamesArr[i].name}>
        //         {gamesArr[i].name}
        //       </MenuItem>
        //     );
        //     gameNamesCmps.push(cmp);
        //   }
        //   // gamesArr.forEach((game) => {
        //   //   const cmp = (
        //   //     <MenuItem key={key} value={game.name}>
        //   //       {game.name}
        //   //     </MenuItem>
        //   //   );
        //   //   gameNamesCmps.push(cmp);
        //   // });
        //   this.setState({ gameList: gameNamesCmps });
        //   this.setState({ gamesLoading: false });
        //   console.log("done loading");
        // });
      });
  }

  handleTitleEdit(e) {
    this.setState({ title: e.target.value });
  }

  handleBodyEdit(e) {
    this.setState({ body: e.target.value });
  }

  handleGameSelect(e) {
    let game = e.target.value;
    this.setState({ game: game });
  }

  handlePostCreate() {
    // Validate fields
    if (!this.state.game || !this.state.body || !this.state.title) {
      alert('Please fill in required fields');
      return;
    }
    // Create Post
    axios
      .post("http://localhost:3001/forum/createPostOrReply", {
        username: this.state.username,
        body: this.state.body,
        game: this.state.game,
        title: this.state.title,
      })
      .then((json) => {
        console.log(json.data);
        if (json.data.success) {
          axios
          .put(`http://localhost:3001/users/addPost/${this.state.username}`, {
            postID: json.data.forumPostObj._id
          })
          .then((json) => {
            console.log(json.data);
            if(json.data.success) this.props.history.push("/forum");
          })
        }
        else alert("Something went wrong. Please try again");
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

    const gameList = [
      "League of Legends",
      "Counter Strike",
      "Fortnite",
      "Portal",
      "Minecraft",
    ];

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

    const { body, title } = this.state;

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
                Create Forum Post
              </Typography>
            </Grid>
          </Grid>
          <TextField
            id="outlined-full-width"
            label="Title"
            placeholder="Enter a post title"
            onChange={this.handleTitleEdit}
            required={true}
            value={title}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            className={mainStyles.titleInput}
            variant="outlined"
          />

          <AutoGame onGameSelect={this.handleGameSelect}></AutoGame>
          <div style={{ marginRight: 20 }}>
            <TextField
              id="outlined-multiline-static"
              label="What's your post about?"
              multiline
              rows="10"
              placeholder="Enter some details..."
              variant="outlined"
              className={mainStyles.bodyInput}
              required={true}
              value={body}
              onChange={this.handleBodyEdit}
            ></TextField>
            <div className={mainStyles.buttonMargins}>
              <Button
                onClick={() => this.props.history.push("/Forum")}
                className={mainStyles.cancelButton}
                variant="contained"
              >
                Cancel
              </Button>

              <Button
                onClick={this.handlePostCreate}
                className={mainStyles.postButton}
                color="primary"
                variant="contained"
              >
                <CheckIcon style={{ marginRight: 6 }}></CheckIcon>Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateForumPost;
