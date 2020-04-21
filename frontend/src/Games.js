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
import AddGames from './AddGames';

export default function Games(props){
    const titleStyle = {
        marginBottom: 20,
        color: "#535353",
      }
    
      const gameTitle = {
        color: "black",
        marginTop: 20,
        marginLeft: 8,
    
      }
      const gameDesc = {
        color: "#535353",
        marginTop: 5,
        marginLeft: 8,
    
      }
    return(

        <div className = "content">
<Grid container spacing={3}>

<Typography style = {titleStyle} align = 'Left' variant="h6" component="h2" >
{props.title}</Typography>
<AddGames></AddGames>
</Grid>
<Grid container spacing={3}>
<Grid item xs={4}>

<img className = "photos" src={leaguePhoto} />
<Typography style = {gameTitle}>League of Legends</Typography>
<div style = {{display: "inline-flex"}}>
<Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
<Typography style = {gameDesc}>1492 players looking now</Typography>
</div>
    
</Grid>
<Grid item xs={4}>

    <img className = "photos" src={leaguePhoto} />
    <Typography style = {gameTitle}>League of Legends</Typography>
    <div style = {{display: "inline-flex"}}>
    <Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
    <Typography style = {gameDesc}>1492 players looking now</Typography>
    </div>

</Grid>
<Grid item xs={4}>
<img className = "photos" src={leaguePhoto} />
<Typography style = {gameTitle}>League of Legends</Typography>
<div style = {{display: "inline-flex"}}>
<Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
<Typography style = {gameDesc}>1492 players looking now</Typography>
</div>
</Grid>
<Grid item xs={4}>

<img className = "photos" src={leaguePhoto} />
<Typography style = {gameTitle}>League of Legends</Typography>
<div style = {{display: "inline-flex"}}>
<Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
<Typography style = {gameDesc}>1492 players looking now</Typography>
</div>
    
</Grid>
<Grid item xs={4}>

<img className = "photos" src={leaguePhoto} />
<Typography style = {gameTitle}>League of Legends</Typography>
<div style = {{display: "inline-flex"}}>
<Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
<Typography style = {gameDesc}>1492 players looking now</Typography>
</div>
    
</Grid>
<Grid item xs={4}>

<img className = "photos" src={leaguePhoto} />
<Typography style = {gameTitle}>League of Legends</Typography>
<div style = {{display: "inline-flex"}}>
<Brightness1Icon style={{ color: "#26AD00", marginTop: "4"}}></Brightness1Icon>
<Typography style = {gameDesc}>1492 players looking now</Typography>
</div>
    
</Grid>

</Grid>
</div>
    );

}

