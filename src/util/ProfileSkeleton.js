import React, { Fragment } from "react";
import noImg from "../images/no-img.png";
import PropTypes from "prop-types";

//MUI
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import CalendarToday from "@material-ui/icons/CalendarToday";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';

// reactstrap components
import { Card, CardBody, CardText } from "reactstrap";

const useStyles = {
  handle: {
    width: 100,
    height: 20,
    backgroundColor: "#cccecf",
    marginBottom: 7
  }
};

function ProfileSkeleton(props) {
  const { classes } = props;

  return (
    
    <Card className="card-user" style={{ background: "#d4b7b2" }}>
      <CardBody>
        <CardText />
        <div className="author">
          <div className="block block-one" />
          <div className="block block-two" />
          <div className="block block-three" />
          <div className="block block-four" />

          <img alt="profile" className="avatar" src={noImg} />
          <div className="icons-details">
              <div className={classes.handle} />
            </div>
        </div>
        <div className="card-description">
          <div style={{ marginBottom: "10px" }}>
            <Typography style={{ fontFamily: "Poppins" }}>
              <div className={classes.loadingSpinner}>
                <CircularProgress  style={{ color: "#909191" }} size={50} />
              </div>
            </Typography>
          </div>
          <div className="card-details">
            <div className="icons-details">
              <div className={classes.handle} />
            </div>
            <hr />
            <div className="icons-details">
              <div className={classes.handle} />
            </div>
            <hr />
            <div className="icons-details">
              <div className={classes.handle} />
            </div>
          </div>
        </div>

        <div className="edit-details"></div>
      </CardBody>
    </Card>
    
  );
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(ProfileSkeleton);
