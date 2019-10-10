import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "../scream/EditDetails";
import ProfileSkeleton from "../../util/ProfileSkeleton";

//Redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../../redux/actions/userActions";

//Material UI imports
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import IconButton from "@material-ui/core/IconButton";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import UploadIcon from "@material-ui/icons/AddAPhoto";

// reactstrap components
import { Card, CardBody, CardText } from "reactstrap";

const styles = {
  paper: {
    padding: "10px",
    background: "linear-gradient(to bottom, #ffffff, #bdbdbd)",
    ["@media (max-width:651px)"]: {
      marginRight: "40px",
      marginBottom: "20px"
    }
  },
  buttons: {
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: "20px"
  }
};

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };

  //used as a button because we hide the upload input
  handleEditPic = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  handleLogout = () => {
    this.props.logoutUser();
  };

  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Card className="card-user">
          <CardBody>
            <CardText />
            <div className="author">
              <div className="block block-one" />
              <div className="block block-two" />
              <div className="block block-three" />
              <div className="block block-four" />
              <Tooltip title="Edit profile pic" placement="top">
                <div onClick={this.handleEditPic} style={{cursor:'pointer'}}>
                  <img
                    alt="profile"
                    className="avatar"
                    src={imageUrl}
                  />
                  <UploadIcon />
                </div>
              </Tooltip>

              <input
                type="file"
                id="imageInput"
                hidden="true"
                onChange={this.handleImageChange}
              />
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                <h3 className="title">@{handle}</h3>
              </MuiLink>
            </div>
            <div className="card-description">
              <h4>About Me</h4>
              <div style={{ marginBottom: "10px" }}>
                {bio && (
                  <Typography style={{ fontFamily: "Poppins" }}>
                    {bio}
                  </Typography>
                )}
              </div>
              <div className="card-details">
                <div className="icons-details">
                  {location && (
                    <Fragment>
                      <LocationOn
                        style={{ marginRight: "10px", color: "#DB735A" }}
                      />
                      {location}
                    </Fragment>
                  )}
                </div>
                <hr />
                <div className="icons-details">
                  {website && (
                    <Fragment>
                      <LinkIcon
                        style={{ marginRight: "10px", color: "#DB735A" }}
                      />
                      <a
                        href={website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {website}
                      </a>
                    </Fragment>
                  )}
                </div>
                <hr />
                <div className="icons-details">
                  <CalendarToday
                    style={{ marginRight: "10px", color: "#DB735A" }}
                  />
                  <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
                </div>
              </div>
            </div>

            <div className="edit-details">
              <Tooltip title="logout" placement="top" style={{ color: "red" }}>
                <IconButton onClick={this.handleLogout}>
                  <KeyboardReturn />
                </IconButton>
              </Tooltip>
              <EditDetails />
            </div>
          </CardBody>
        </Card>
      ) : null
    ) : (
      <ProfileSkeleton />
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = {
  logoutUser,
  uploadImage
};

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Profile));
