import React, { Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import Link from "react-router-dom/Link";
//MUI
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";

// reactstrap components
import {
  Card,
  CardBody,
  CardText
} from "reactstrap";


const styles = {
  paper: {
    position: "fixed",
    padding: 20,
    maxWidth: "100%",
    marginRight: 10
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%"
      }
    },
    "& .profile-image": {
      width: 150,
      height: 150,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
      cursor: "pointer"
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle"
      }
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0"
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer"
      }
    }
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px"
    }
  }
};

const StaticProfile = props => {
  const {
    classes,
    profile: { handle, createdAt, imageUrl, bio, website, location }
  } = props;

  return (
    <Card className="card-user">
      <CardBody>
        <CardText />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />
          <Tooltip title="Edit profile pic" placement="top">
            <img
              alt="profile"
              className="avatar"
              src={imageUrl}
            />
          </Tooltip>
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
              <Typography style={{ fontFamily: "Poppins" }}>{bio}</Typography>
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
                  <LinkIcon style={{ marginRight: "10px", color: "#DB735A" }} />
                  <a href={website} target="_blank" rel="noopener noreferrer">
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
      </CardBody>
    </Card>
  );
};

StaticProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StaticProfile);
