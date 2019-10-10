import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Scream2 from "../components/scream/Scream2";
import StaticProfile from "../components/profile/StaticProfile";
import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";

//Redux
import { connect } from "react-redux";
import { getUserData } from "../redux/actions/dataActions";

const styles = {
  homeContainer: {
    marginTop: "20px",
    ["@media (max-width:650px)"]: {
      flexDirection: "column-reverse"
    }
  },
  TitleStyles: {
    textAlign: "center",
    fontFamily: "Fredericka the Great",
    fontSize: "25px",
    color: "black"
  },
  banner:{
    marginTop:'80px',
  },
  CardStyles: {
    background: "linear-gradient(to bottom, #ffffff, #bdbdbd)",
    padding: "10px 100px 10px 100px",
  }
};

class user extends Component {
  state = {
    profile: null,
    screamIdParam: null
  };

  componentDidMount() {
    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;
    if (screamId) this.setState({ screamIdParam: screamId });

    this.props.getUserData(handle);
    axios
      .get(`/user/${handle}`)
      .then(res => {
        this.setState({
          profile: res.data.user
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { screams, loading } = this.props.data;
    const { screamIdParam } = this.state;

    const screamsMarkup = loading ? (
      <ScreamSkeleton/>
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      screams.map(scream => <Scream2 key={scream.screamId} scream={scream} />)
    ) : (
      screams.map(scream => {
        if (scream.screamId !== screamIdParam)
          return <Scream2 key={scream.screamId} scream={scream} />;
        else {
          return <Scream2 key={scream.screamId} scream={scream} openDialog />;
        }
      })
    );

    return (
      <Fragment>
        <Grid item sm={12} xs={12} className={classes.banner}>
          <Grid container justify="center">
            <Card className={classes.CardStyles}>
              <Typography className={classes.TitleStyles}>
                Welcome to{" "}
                <span className="handleStyles">
                  {this.props.match.params.handle}
                </span>{" "}
                Profile
              </Typography>
            </Card>
          </Grid>
        </Grid>

        <Grid container className={classes.homeContainer}>
          <Grid item sm={8} xs={12}>
            <Grid container justify="center">
              {screamsMarkup}
            </Grid>
          </Grid>
          <Grid item sm={4} xs={12} className="profile-col">
            {this.state.profile === null ? (
              <ProfileSkeleton />
            ) : (
              <StaticProfile profile={this.state.profile} />
            )}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

user.propTypes = {
  getUserData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const MapStateToProps = state => ({
  data: state.data
});

export default connect(
  MapStateToProps,
  { getUserData }
)(withStyles(styles)(user));
