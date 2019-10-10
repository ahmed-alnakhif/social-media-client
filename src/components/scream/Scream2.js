import React, { Component } from "react";
import Link from "react-router-dom/Link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";
import SnackbarDelete from "./SnackbarDelete";
//redux
import { connect } from "react-redux";
//Material UI imports
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { shadows } from "@material-ui/system";
import Box from "@material-ui/core/Box";

//Icons
import ChatIcon from "@material-ui/icons/Chat";

const useStyles = {
  Card: {
    width: 475,
    marginBottom: "20px",
    position: "relative",
    ["@media (max-width:450px)"]: {
      width: 288,
      marginLeft: 10
    },
    ["@media (max-width:950px)"]: {
      marginLeft: 50
    }
  },
  media: {
    height: 0,
    paddingTop: "47.25%" // 16:9
  },
  bodyCard: {
    padding: "20px 30px 20px 30px",
    background: "#b3807d"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    cursor: "pointer"
  },
  deleteButton: {
    marginTop: "13px",
    ["@media (max-width:450px)"]: {
      marginTop: "2px"
    }
  },
  visibleSeparator: {
    width: "90%",
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    marginBottom: 0
  }
};

class Scream2 extends Component {
  render() {
    dayjs.extend(relativeTime); //to show date in screams in a different syntax
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        imageUrl,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      },
      scream
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <SnackbarDelete screamId={screamId} />
      ) : null;

    const media =
      imageUrl !==
      "https://firebasestorage.googleapis.com/v0/b/socialape-9484b.appspot.com/o/no-img.png?alt=media" ? (
        <CardMedia className={classes.media} image={imageUrl} />
      ) : null;

    return (
      <Card
        className={classes.Card}
        style={{ background: "linear-gradient(to bottom, #8D4F58, #c48980)" }}
      >
        <CardHeader
          avatar={
            <Avatar
              alt="avatar"
              src={userImage}
              className={classes.bigAvatar}
            />
          }
          action={<div className={classes.deleteButton}>{deleteButton}</div>}
          title={
            <Typography
              variant="h5"
              component={Link}
              to={`/users/${userHandle}`}
              style={{ fontFamily: "Saira Stencil One", color: "white" }}
            >
              {userHandle}
            </Typography>
          }
          subheader={dayjs(createdAt).fromNow()}
        />
        {media}
        <CardContent>
          <Paper className={classes.bodyCard}>
            <Typography variant="body1" component="p">
              {body}
            </Typography>
          </Paper>
        </CardContent>
        <hr className={classes.visibleSeparator} />
        <CardActions disableSpacing>
          <LikeButton  screamId={screamId} />
          <span>{likeCount} likes </span>
            <ScreamDialog
              screamId={screamId}
              userHandle={userHandle}
              scream={scream}
              openDialog={this.props.openDialog}
            />
          <span>{commentCount} comments</span>
        </CardActions>
      </Card>
    );
  }
}

Scream2.propTyoes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(withStyles(useStyles)(Scream2));
