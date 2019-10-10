import React, { Component } from "react";
import PropTypes from "prop-types";
import Scream2 from "../components/scream/Scream2";
import Profile from "../components/profile/Profile";
import Profile2 from "../components/profile/Profile2";
import ScreamSkeleton from '../util/ScreamSkeleton';

//Redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

//MUI
import Box from "@material-ui/core/Box";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";

const styles = {
  homeContainer: {
    marginTop: "80px",
    ['@media (max-width:640px)']: { 
      marginTop: '100px',
      flexDirection: 'column-reverse'
    }
  }
};



export class home extends Component {
  componentDidMount() {
    this.props.getScreams();
  }

  render() {
    const { screams, loading } = this.props.data;
    const { authenticated} = this.props.user;
    const { classes } = this.props;

    let recentScaremMarkup;
   
    if (authenticated) {
      if (!loading) {
        recentScaremMarkup = screams.map(scream => (
          <Scream2
            key={scream.screamId}
            scream={scream}
            createdAt={screams[0].createdAt}
          />
        ));
      } else {
        recentScaremMarkup = <ScreamSkeleton/>
      }
    } else {
      window.location = "/login"
    }

    return (
      <Grid  container  className={classes.homeContainer} >
        <Grid item  sm={1} xs={1.5}/>
        <Grid item  sm={6} xs={12} >
            <Grid container justify='flex-end'>
            {recentScaremMarkup}
            </Grid>
        </Grid>
        
        <Grid item sm={4} xs={12} className="profile-col">
          <Profile2 />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(
  mapStateToProps,
  { getScreams }
)(withStyles(styles)(home));
