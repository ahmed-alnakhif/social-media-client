import React, { Fragment } from "react";
import noImg from "../images/no-img.png";
import PropTypes from "prop-types";

//MUI
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/Card";
import withStyles from "@material-ui/core/styles/withStyles";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";

//Icon
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

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
    background: "#d4b7b2"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
    cursor: "pointer"
  },
  loadingSpinner: {
    paddingTop:'30px',
    paddingBottom:'30px',
    textAlign: "center",
    marginBottom: "30px",
    //color:"#cccecf"
  },
  handle: {
    width: 100,
    height: 20,
    backgroundColor: "#cccecf",
    marginBottom: 7
  },
  date:{
    width: 50,
    height: 20,
    backgroundColor: "#cccecf",
  },
  likeIcon:{
    marginLeft:'20px',
    marginBottom:'10px',
    color:'#CCCECF'
  },
  chatIcon:{
    marginLeft:'40px',
    color:'#CCCECF',
    marginBottom:'10px',
  }
};

const styles = {
  card: {
    display: "flex",
    marginBottom: 20
  },
  cardContent: {
    width: "100%",
    flexDirection: "column",
    padding: 25
  },
  cover: {
    minWidth: 200,
    objectFit: "cover"
  },

  handle: {
    width: 60,
    height: 20,
    backgroundColor: "grey",
    marginBottom: 7
  }
};

const ScreamSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.Card} style={{ background: "#d4b7b2" }}>
      <CardHeader
        avatar={
          <Avatar alt="avatar" src={noImg} className={classes.bigAvatar} />
        }
        title={
          <Typography variant="h5">
            <div className={classes.handle} />
          </Typography>
        }
        subheader={
            <Typography variant="h5">
            <div className={classes.date} />
          </Typography>
        }
      />
      <div className={classes.loadingSpinner}>
        <CircularProgress style={{ color: "#909191" }} size={50}/>
      </div>
      <CardActions >
        <FavoriteBorder className={classes.likeIcon}/>
        <ChatIcon className={classes.chatIcon} />
      </CardActions>
    </Card>
  ));

  return <Fragment>{content}</Fragment>;
};

ScreamSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(useStyles)(ScreamSkeleton);
