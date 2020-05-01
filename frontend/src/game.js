import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ReactDOM from 'react-dom'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import TopMenu from './TopMenu';
import axios from 'axios';
import { createMuiTheme } from "@material-ui/core/styles";
import styles from './App.css';
import leaguePhoto from './leaguePhoto.jpg'
import Brightness1Icon from '@material-ui/icons/Brightness1';
import FilterListIcon from '@material-ui/icons/FilterList';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import mainStyles from './main.module.css';
import Player from './player.js';
import { Multiselect } from 'multiselect-react-dropdown';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import GameMenu from './GameMenu'




class Game extends Component
{
  constructor(props) {
    super(props);
    this.state = {
        options:[
          { key: "fun", },
          { key: "love", },
          { key: "vibing", },
          { key: "OMOMO", },
          { key: "7Leaves", },
          { key: "HappyLemonIsTrash", },
          { key: "TasteaIsFTier", }
        ],
      };
  }
  
  render()
  {
    const theme = createMuiTheme({
      '@global' : {
        body: {
          backgroundColor: "white",
        }
      }
    });

    const paperStyle = {
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }

    const avatarStyle = {
      margin: 1,
      backgroundColor: "gray",
    }

    const formStyle = {
      width: '100%', // Fix IE 11 issue.
      marginTop: 3,
    }

    const submitStyle = {
      marginTop: 3,
      marginBottom: 0,
      marginRight: 2,
    }

    const tileStyle = {
  
    }
  
    const gridStyle = {
      marginTop: 20,
  
    }

    const titleStyle = {
      marginTop: 20,
      color: "#535353",
    }

   
    const gameDesc = {
      color: "#535353",
      marginTop: 5,
      marginLeft: 8,

    }

    const about = {
        color: "black",
        marginTop: 5,
        marginLeft: 8,
  
      }

    this.style = {
        multiselectContainer: { 
            marginBottom: '40px',
            width: '800px',
            marginLeft: '2%',
        },
        chips: {
        },
        searchBox: {
          fontSize: '15px',
          fontFamily: 'Segoe UI',
  
        },
        inputField: { 
          fontSize: '15px',
  
  
      },
    };

    const online = "#26AD00";
    const inGame = "#4acff9";
    const full = "#ff3200";
    const offline = "#c4c4c4";
    const away = "#ffe712";
  
  /*const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };*/


    return (
 <div>
      <TopMenu history={this.props.history}></TopMenu>
      <div className = "content">
      
      <Grid container spacing={3}>
      <Grid item xs={4}>
   
      <img className = {mainStyles.gamePhoto} src={leaguePhoto} />
      
          
      </Grid>
      <Grid item xs = {4}>
      <Typography variant = 'h3' className = {mainStyles.gametitleBig} >League of Legends</Typography>
      <div style = {{display: "inline-flex"}}>
      <Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
      <Typography style = {gameDesc}>1492 players looking now</Typography>
      </div>
      <Typography className = {mainStyles.gameTags} style = {gameDesc}>Tags: multiplayer, moba, fantasy, strategy</Typography>

      
      </Grid>
      <Grid item xs = {4}>
      <Card className = {mainStyles.postSpacing}>
      <CardContent className = {mainStyles.forumCard}>
      <Typography variant = 'h6' style = {about}>About:</Typography>
      <Typography style = {gameDesc}>Released 10/27/2009</Typography>
      <Typography style = {gameDesc}>League of Legends is a multiplayer online battle arena video game developed and published by Riot Games for Microsoft Windows and macOS. Inspired by the Warcraft III: The Frozen Throne mod Defense of the Ancients, the game follows a freemium model and is supported by microtransactions.</Typography>
      <Typography style = {gameDesc}><a href = "http://leagueoflegends.com/">http://leagueoflegends.com/</a></Typography>



        </CardContent>
        </Card>

      </Grid>
     
      
    </Grid>
    <GameMenu></GameMenu>

   


    </div>
    </div>
  
    );
  }
}

export default Game;