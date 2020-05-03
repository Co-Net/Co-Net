import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import styles from "./main.module.css";
import ChatThread from "./chatThread";

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
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 700,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [tabsCmp, setTabsCmp] = React.useState([]);
  const [threadsCmp, setThreadsCmp] = React.useState("");

  const handleChange = (event, newValue) => {
    var index = 0;
    var threads = [];
    props.threads.forEach((thread) => {
      const threadCmp = (
        <TabPanel className={styles.tabPanel} key={index} value={newValue} index={index++}>
          <ChatThread
            sharedMessages={thread.sharedMessages}
            currentUser={props.currentUser}
            recipient={thread.username2 != props.currentUser ? thread.username2 : thread.username1 }
            ownAvatar={props.avatar}
            threadID={thread._id}
          ></ChatThread>
        </TabPanel>
      );
      threads.push(threadCmp);
    });
    setThreadsCmp(threads);
    setValue(newValue);
  };

  React.useEffect(() => {
    if (props.threads.length == 0) return;
    var tabs = [];
    var index = 0;
    props.threads.forEach((thread) => {
      tabs.push(<Tab key={index} label={props.currentUser === thread.username1 ? thread.username2 : thread.username1} {...a11yProps(index++)} />);
    });
    var threadCmp = (
      <TabPanel className={styles.tabPanel} value={value} index={value}>
        <ChatThread
          sharedMessages={props.threads[value].sharedMessages}
          currentUser={props.currentUser}
          ownAvatar={props.avatar}
          recipient={props.threads[value].username2 != props.currentUser ? props.threads[value].username2 : props.threads[value].username1 }
          threadID={props.threads[value]._id}
        ></ChatThread>
      </TabPanel>
    );
    setTabsCmp(tabs);
    setThreadsCmp(threadCmp);
  }, [props.threads]);

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
        {tabsCmp.length != 0 ? (
          tabsCmp
        ) : (
          <Tab label="No recipients"> {a11yProps(0)} </Tab>
        )}
      </Tabs>
      {threadsCmp.length != 0 ? (
        threadsCmp
      ) : (
        <TabPanel className={styles.tabPanel} value={value} index={0}>
          You have no messages
        </TabPanel>
      )}
    </div>
  );
}
