import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

//Icons
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import Notifications from "@material-ui/icons/Notifications";

const NavStyle = {
  background: "linear-gradient(45deg, #9DBBD3 20%, #FF8E53 90%)",
  color: "white",
  boxShadow: "0 3px 5px 2px rgba(157,187,211, 0.3)"
};

class Navbar extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div>
        <AppBar style={NavStyle}>
          {authenticated ? (
            <Fragment>
              <Toolbar className="nav-container">
                <Tooltip title="Post a scream" placement="top">
                  <IconButton>
                    <AddIcon style={{color:'white'}} />
                  </IconButton>
                </Tooltip>

                <Link to="/">
                  <Tooltip title="Home" placement="top">
                    <IconButton>
                      <HomeIcon style={{color:'white'}} />
                    </IconButton>
                  </Tooltip>
                </Link>

                <Tooltip title="notifications" placement="top">
                  <IconButton>
                    <Notifications  style={{color:'white'}}/>
                  </IconButton>
                </Tooltip>
              </Toolbar>
            </Fragment>
          ) : (
            <Fragment>
              <Toolbar className="nav-container">
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Toolbar>
            </Fragment>
          )}
        </AppBar>
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(Navbar);
