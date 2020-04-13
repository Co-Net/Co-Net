import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ForumComment from './forumComment.js';
import styles from './main.module.css';
import ChatThread from './chatThread';



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: 700,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="conetuser" {...a11yProps(0)} />
        <Tab label="destroyer392" {...a11yProps(1)} />
        <Tab label="heythere" {...a11yProps(2)} />
        <Tab label="conetbodies" {...a11yProps(3)} />
        <Tab label="csgoPlayer" {...a11yProps(4)} />
        <Tab label="xxAngelxx" {...a11yProps(5)} />
        <Tab label="friendlynood" {...a11yProps(6)} />
        <Tab label="im_discrete" {...a11yProps(7)} />
        <Tab label="ohsopeachiee" {...a11yProps(8)} />
        <Tab label="kkleee" {...a11yProps(9)} />
        <Tab label="cuteboy" {...a11yProps(10)} />
        <Tab label="cutegirl" {...a11yProps(11)} />

      </Tabs>
      <TabPanel className = {styles.tabPanel} value={value} index={0}>
      <ChatThread></ChatThread>

      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={1}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={2}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={3}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={4}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={5}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={6}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={7}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={8}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={9}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={10}>
      <ChatThread></ChatThread>
      </TabPanel>
      <TabPanel className = {styles.tabPanel} value={value} index={11}>
      <ChatThread></ChatThread>
      </TabPanel>
    </div>
  );
}