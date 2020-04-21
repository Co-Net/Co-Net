import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import logo from "./logo.png";
import MailIcon from "@material-ui/icons/Mail";
import { fade, makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import axios from "axios";
import MoreIcon from "@material-ui/icons/MoreVert";
import createHistory from "history/createBrowserHistory";
import { createHashHistory } from "history";
import { browserHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "secondary",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [username, setUsername] = useState();
  const [isGuest, setIsGuest] = useState(false);

  const getUser = () => {
    axios
      .get("http://localhost:3001/user/currentuser", { withCredentials: true })
      .then((json) => {
        if (json.data.username === "Guest") {
          setIsGuest(true);
        }
        setUsername(json.data.username);
      });
  };

  const { history } = props;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = (event) => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if (event === "profile") history.push("/profile");
    else if (event === "logout") {
      axios
        .get("http://localhost:3001/users/logout", { withCredentials: true })
        .then((json) => {
          if (json.data.loggedOut) {
            history.push(""); // still need?
          }
        });
    }
    else if (event === "myaccount") history.push("myaccount");
    else if (event === "messages") history.push("messages");
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    getUser();
  }, []);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => handleMenuClose("profile")}>Profile</MenuItem>
      <MenuItem onClick={() => handleMenuClose("myaccount")}>
        My account
      </MenuItem>
      <MenuItem onClick={() => handleMenuClose("messages")}>Messages</MenuItem>

      <MenuItem onClick={() => handleMenuClose("logout")}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <Typography>{username}</Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return isGuest ? (
    <div class="hi" style={{ margin: 0 }} className={classes.grow}>
      <AppBar
        style={{ margin: 0, padding: 10 }}
        color="transparent"
        position="static"
      >
        <Toolbar>
          <a href="http://localhost:3000/Feed">
            <img src={logo} alt="Logo" style={{ width: "70px" }} />
          </a>

          <IconButton color="inherit">
            <Typography
              className="menuButtons"
              onClick={() => history.push("/feed")}
            >
              Browse
            </Typography>
          </IconButton>

          <IconButton color="inherit">
            <Typography
              className="menuButtons"
              onClick={() => history.push("/forum")}
            >
              Forum
            </Typography>
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <Typography
                className="menuButtons"
                onClick={() => history.push("/signin")}
              >
                Sign In
              </Typography>
            </IconButton>
            <IconButton color="inherit">
              <Typography
                className="menuButtons"
                onClick={() => history.push("/signup")}
                style={{ color: "#af0303" }}
              >
                Sign Up
              </Typography>
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton color="inherit">
              <Typography
                className="menuButtons"
                onClick={() => history.push("/signin")}
              >
                Sign In
              </Typography>
            </IconButton>
            <IconButton color="inherit">
              <Typography
                className="menuButtons"
                onClick={() => history.push("/signup")}
              >
                Sign Up
              </Typography>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  ) : (
    <div class="hi" style={{ margin: 0 }} className={classes.grow}>
      <AppBar
        style={{ margin: 0, padding: 10 }}
        color="transparent"
        position="static"
      >
        <Toolbar>
          <a href="http://localhost:3000/Feed">
            <img src={logo} alt="Logo" style={{ width: "70px" }} />
          </a>

          <IconButton color="inherit">
            <Typography
              className="menuButtons"
              onClick={() => history.push("/Feed")}
            >
              Browse
            </Typography>
          </IconButton>

          <IconButton color="inherit">
            <Typography
              className="menuButtons"
              onClick={() => history.push("/Forum")}
            >
              Forum
            </Typography>
          </IconButton>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Typography className="userName">{username}</Typography>
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
/*
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
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
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        //event.SignIn();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'white',
    textColor: 'black',
    maxwidth: 500,
  },

}));
const useStyles1 = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

 

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes1 = useStyles1();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes1.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {['Sign Up', 'Login', 'My Profile', 'Trending'].map((text, index) => (
          <MenuItem button key={text} href="/signModal">
            <ListItemText primary={text} href="/signModal"/>
          </MenuItem>
        ))}
      </List>
      <Divider />
     
    </div>
  );

  return (
    <div className={classes.root}>
    <div style = {{display: 'inline-flex',}}>
    <img src = {logo} alt = "Logo" style = {{width: '16%', height: 76, marginTop: 5,}}/>

    <Search />
    
    </div>
    {/*<div style = {{display: 'inline-block', float: 'right', marginTop: 27, marginRight: 10,}}>
    <Button onClick={toggleDrawer('right', true)}><MenuIcon></MenuIcon></Button>
    <Drawer anchor="right" open={state.right} onClose={toggleDrawer('right', false)}>
    {sideList('right')}
  </Drawer>
  </div>
  }
      <AppBar position="static" elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          tabItemContainerStyle={{width: '400px'}}
          aria-label="nav tabs example"
          
          TabIndicatorProps={{
            style: {
              backgroundColor: "white "

            }
          }}
          style = {{backgroundColor: 'white', color: 'black'}}
        >
        
          <LinkTab label="My Profile" href="/" {...a11yProps(3)} />
          <LinkTab label="Trending" href="/Feed" {...a11yProps(4)} />
          <LinkTab label="Create Post" href="/CreatePost" {...a11yProps(5)} />
          <LinkTab label="My Feed" href="/MyFeed" {...a11yProps(6)} />

        </Tabs>
      </AppBar>
      
    </div>
  );
}
*/
// ReactDOM.render(routing, document.getElementById('root'))
