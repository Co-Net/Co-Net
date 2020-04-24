import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Games from './Games.js';
import ReviewTab from './reviewTab.js';
import FriendsList from './friendsList.js';
import Activity from './Activity.js';
import { Multiselect } from 'multiselect-react-dropdown';
import Player from './player.js';
import PartyCard from './PartyCard';




function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    shadows: ["none"]
  },
}));


const style = {
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

const state = {
    options:[
      { key: "League", },
      { key: "Minecraft", },
      { key: "Valorant", },
      { key: "CSGO", },
      { key: "Mario Kart", },
      { key: "Animal Crossing", },
      { key: "Tic Tac Toe", }
    ],
  };


export default function ScrollableTabsButtonForce(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style = {{marginTop: 20}} className={classes.root}>
      <AppBar elevation = {0} position="static" color="white">
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Players Playing"  {...a11yProps(0)} />
          <Tab label="Parties Looking"  {...a11yProps(1)} />

        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <Multiselect
      options={state.options}
      displayValue="key"
      style={style}
      placeholder = 'Search by Tag'
  
    /> 
        <Player tags= "fun, omomo, tea" username = "HelloHydra" theme_color = {online}></Player>
        <Player tags= "fun, hi" username = "Destroyer392" theme_color = {online}></Player>
        <Player tags= "omomo, tea" username = "Hey" theme_color = {online}></Player>
        <Player tags= "omomo, sup" username = "Testing" theme_color = {away}></Player>
        <Player tags= "fun, testing123, hello" username = "123" theme_color = {inGame}></Player>
  
  
  
      </TabPanel>
      <TabPanel value={value} index={1}>
      <PartyCard></PartyCard>
      <PartyCard></PartyCard>
      <PartyCard></PartyCard>
      <PartyCard></PartyCard>

    
      </TabPanel>
     
    </div>
  );
}