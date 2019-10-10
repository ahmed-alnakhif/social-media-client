import React, { Component, Fragment } from "react";
import Link from "react-router-dom/Link";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MiniDrawer from "./MiniDrawer";

//Material UI
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";


const NavStyle = {
  background: "linear-gradient(to right, #e0765a, #36074d)",
  color: "white",
  boxShadow: "0 3px 5px 2px rgba(157,187,211, 0.3)",
};

class Navbar extends Component {
  render() {
    const { authenticated, user } = this.props;
    return (
      <div>
        {authenticated ? (
            <MiniDrawer user={this.props.user} />
        ) : (
          <AppBar style={NavStyle}>
            <Fragment>
              <Toolbar style={{margin:'auto'}}>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Signup
                </Button>
              </Toolbar>
            </Fragment>
          </AppBar>
        )}
      </div>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  authenticated: state.user.authenticated,
  user: state.user
});

export default connect(mapStateToProps)(Navbar);
