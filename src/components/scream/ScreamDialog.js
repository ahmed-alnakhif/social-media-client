import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import Link from "react-router-dom/Link";
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
//Redux
import { connect } from "react-redux";
import { getScream, clearErrors } from "../../redux/actions/dataActions";
//Material UI
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../../util/MyButton";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";



const styles = {
  LargeSeparator:{
    border: '3px dashed gray',
    borderRadius:20,
    width: '100%',
    marginBottom: 20,
  },
  invisibleSeparator: {
    border: "none",
    margin: 4
  },
  visibleSeparator:{
    width:'100%',
    borderBottom: '1px solid rgba(0,0,0,0.1)',
    marginBottom: 20,
  },
  profileImage: {
    maxWidth: 300,
    height: 150,
    border: "1px solid #ddd",
    borderRadius: "4px",
    objectFit: "cover",
    "&:hover": {
      boxShadow: "0 0 2px 1px rgba(231, 231, 231, 0.795)"
    }
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
    padding: 10,
    ['@media (max-width:650px)']: { 
      display:'none'
    }
  },
  spinner: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50
  },
  expandButton:{
  },
};

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath:'',
    newPath:''
  };

  componentDidMount(){
    if(this.props.openDialog){
      this.handleOpen();
    }
  }

  handleOpen = () => {
    let oldPath = window.location.pathname;
    const {userHandle, screamId} = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;
    window.history.pushState(null,null,newPath);

    this.setState({ open: true, oldPath, newPath});
    this.props.getScream(this.props.screamId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath)
    this.setState({ open: false});
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },  
    } = this.props;

  
    const dialogMarkup = loading ? (
      <div className={classes.spinner}>
        <CircularProgress size={100} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={16} className={classes.dialogContainer}>
        <Grid item sm={12}><hr className={classes.invisibleSeparator}/></Grid>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            @{userHandle}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a, MMM DD YYYY")}
          </Typography>
          <hr className={classes.invisibleSeparator} />
          <Typography variant1="body1">{body}</Typography>
          <LikeButton screamId={screamId} />
          <span>{likeCount} likes </span>
          <MyButton tip="comment">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>   
        <hr className={classes.LargeSeparator}/>     
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
      </Grid>
    );

    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="expand post"
          tipClassName={classes.expandButton}
        >
          <ChatIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.DialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScream,
  clearErrors
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
