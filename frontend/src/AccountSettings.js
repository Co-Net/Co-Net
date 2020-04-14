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
import mainStyles from "./main.module.css";
import CheckIcon from '@material-ui/icons/Check';





class AccountSettings extends Component
{
  constructor(props) {
    super(props);
    this.pushHistory = this.pushHistory.bind(this);

  }
  pushHistory(){
    this.props.history.push('/profile')
  
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

    const subtitleStyle = {
        marginTop: 20,
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
      <Grid item xs={6}>
      <Typography style = {titleStyle} align = 'Left' variant="h4" component="h2" >
      Account Settings</Typography>
      </Grid>
      <Grid item xs = {6}>
      <div style = {{}}>
   
      
      </div>

    </Grid>
    </Grid>
    <div className = {mainStyles.settingsDiv}>
    <Typography style = {subtitleStyle} align = 'Left' variant="h6" component="h2" >
    Change Your Name</Typography>
    <Grid container spacing={2}>
      <Grid item xs={2}>
      <TextField
      
      id="outlined-required"
      label="First Name"
      defaultValue="Kenneth"
      variant="outlined"
    />
      </Grid>
      <Grid item xs = {2}>
      <TextField
      
      id="outlined-required"
      label="Last Name"
      defaultValue="Lee"
      variant="outlined"
    />
   
    </Grid>
    </Grid>
    </div>
    <div className = {mainStyles.settingsDiv}>
    <Typography style = {subtitleStyle} align = 'Left' variant="h6" component="h2" >
    Edit Account Info</Typography>
    <Grid container spacing={2}>
    <Grid item xs={2}>
    <TextField
    style ={{marginBottom:20}}
    id="outlined-required"
    label="Username"
    defaultValue = "conetwoboi"
    variant="outlined"
  />
    </Grid>
    <Grid item xs = {2}>
    
 
  </Grid>
  </Grid>
    <Grid container spacing={2}>
      <Grid item xs={2}>
      <TextField
      
      id="outlined-required"
      label="Old Password"

      variant="outlined"
    />
      </Grid>
      <Grid item xs = {2}>
      <TextField
      
      id="outlined-required"
      label="New Password"
      variant="outlined"
    />
    </Grid>
    <Grid item xs = {2}>
    <TextField
    
    id="outlined-required"
    label="Confirm Password"
    variant="outlined"
  />
   
    </Grid>
    </Grid>
    <div className = {mainStyles.buttonMargins}>
  <Button     onClick = {this.pushHistory}
   className = {mainStyles.cancelButton} variant = "contained" >Cancel</Button>

  <Button     onClick = {this.pushHistory}
   className = {mainStyles.postButton} color = "primary" variant = "contained" ><CheckIcon style = {{marginRight: 6,}}></CheckIcon>Save Changes</Button>
  </div>
    </div>
    

    
    </div>
    </div>
  
    );
  }
}

export default AccountSettings;