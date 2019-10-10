import React from "react";
import PostScream from "../scream/PostScream";
import Notifications from "./Notifications";
import Clock from "./Clock";
import clsx from "clsx";

//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "react-router-dom/Link";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

//Icons
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeIcon from "@material-ui/icons/Home";
import PeopleAlt from "@material-ui/icons/PeopleAlt";
import MailIcon from "@material-ui/icons/Mail";
import Alarm from "@material-ui/icons/Alarm";
import FacebookIcon from "../../images/facebook.png";
import InstagramIcon from "../../images/instagram.png";
import LinkedinIcon from "../../images/linkedin.png";
import Logo from "../../images/icon.png";

const drawerWidth = 155;
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  iconsMenu: {
    marginRight: "0px"
  },
  postIcon: {
    margin: "auto"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    color: "white"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background: "linear-gradient(to bottom, #e0765a, #36074d)"
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background: "linear-gradient(to bottom, #e0765a, #36074d)",
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(8.5) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  clock: {
    display: "none",
    ["@media (min-width:950px)"]: {
      display: "inline-block"
    }
  },
  homeIcon: {
    display: "none",
    ["@media (min-width:550px)"]: {
      display: "inline-block"
    }
  },
  profileIcon: {
    display: "none",
    ["@media (min-width:550px)"]: {
      display: "inline-block"
    }
  }
}));

const bigAvatar = {
  width: 30,
  height: 30,
  marginRight: 6,
  cursor: "pointer"
};

export default function MiniDrawer(props) {
  const [speed, setSpeed] = React.useState(6); //logo spinning speed
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [soonOpen, setSoonOpen] = React.useState(false); //soon dialog
  
  const {
    user: { credentials }
  } = props;
  const userPage = `/users/${credentials.handle}`;

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSoonOpen = () => {
    setSoonOpen(true);
  };
  const handleSoonClose = () => {
    setSoonOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open
        })}
      >
        <Toolbar
          style={{
            background: "linear-gradient(to right, #e0765a, #36074d)"
          }}
          className={classes.toolbar}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open
            })}
          >
            <MenuIcon />
          </IconButton>

          <div className="logoPic">
            <img
              src={Logo}
              alt="logo"
              style={{
                width: "45px",
                animation: `spin ${speed}s linear infinite`
              }}
            />
          </div>
          <Typography
            className="logoText"
            style={{ fontSize: "23px", fontFamily: "Lemon" }}
          >
            <span style={{ display: "block", marginBottom: -10 }}>BLACK</span>{" "}
            <span style={{ marginLeft: "20px" }}>SPACE</span>
          </Typography>

          <div className={classes.postIcon}>
            <PostScream />
          </div>

          <div className={classes.clock}>
            <Clock />
          </div>

          <div className={classes.iconsMenu}>
            <Notifications />

            <Link className={classes.homeIcon} to="/">
              <Tooltip title="Home" placement="top">
                <IconButton>
                  <HomeIcon style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </Link>

            <Link className={classes.profileIcon} to={userPage}>
              <Tooltip title="profile" placement="top">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  style={{ color: "white" }}
                >
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </Link>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open
          })
        }}
        open={open}
      >
        <div className={classes.toolbar}>
          <IconButton style={{ color: "white" }} onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          <Link to={userPage}>
            <ListItem button>
              <ListItemIcon>
                <Avatar
                  style={bigAvatar}
                  alt="Stock avatar"
                  src={credentials.imageUrl}
                />
              </ListItemIcon>
              <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
                Profile
              </Typography>
            </ListItem>
          </Link>

          <Link to="/">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon style={{ color: "fff4e8" }} />
              </ListItemIcon>
              <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
                Home
              </Typography>
            </ListItem>
          </Link>

          <Divider />
          <Dialog
            fullWidth
            maxWidth="sm"
            open={soonOpen}
            onClose={handleSoonClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"This feature is coming soon!"}
            </DialogTitle>
            <DialogActions>
              <Button
                onClick={handleSoonClose}
                color="primary"
                autoFocus
                style={{ margin: "auto" }}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <ListItem button onClick={handleSoonOpen}>
            <ListItemIcon>
              <PeopleAlt style={{ color: "fff4e8" }} />
            </ListItemIcon>
            <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
              Friends
            </Typography>
          </ListItem>
        </List>

        <ListItem button onClick={handleSoonOpen}>
          <ListItemIcon>
            <MailIcon style={{ color: "fff4e8" }} />
          </ListItemIcon>
          <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
            Inbox
          </Typography>
        </ListItem>

        <ListItem button onClick={handleSoonOpen}>
          <ListItemIcon>
            <Alarm style={{ color: "fff4e8" }} />
          </ListItemIcon>
          <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
            Alarm
          </Typography>
        </ListItem>

        <Divider />

        <List>
          <a href="https://www.facebook.com/ahmed.nakhif" target="_blank">
            <ListItem style={{ marginTop: "10px" }} button>
              <ListItemIcon>
                <img
                  src={FacebookIcon}
                  alt="facebook"
                  style={{ width: "29px",height:'29px' }}
                />
              </ListItemIcon>
              <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
                Facebook
              </Typography>
            </ListItem>
          </a>

          <ListItem style={{ marginTop: "10px" }} button>
            <ListItemIcon>
              <img
                src={InstagramIcon}
                alt="Instagram"
                style={{ width: "27px",height:'27px' }}
              />
            </ListItemIcon>
            <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
              Instagram
            </Typography>{" "}
          </ListItem>

          <a
            href="https://www.linkedin.com/in/ahmed-alnakhif-4bba4b158/"
            target="_blank"
          >
            <ListItem style={{ marginTop: "10px" }} button>
              <ListItemIcon>
                <img
                  src={LinkedinIcon}
                  alt="Linkedin"
                  style={{ width: "29px",height:'29px' }}
                />
              </ListItemIcon>
              <Typography style={{ fontFamily: "Pacifico", color: "#fff4e8" }}>
                Linkedin
              </Typography>
            </ListItem>
          </a>
        </List>
      </Drawer>
    </div>
  );
}
