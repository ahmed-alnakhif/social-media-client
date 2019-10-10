import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import Snackbar from './SnackbarDelete';

//Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

//Material UI
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { withStyles } from "@material-ui/styles";

const styles = {
    deleteButton:{
        
    }
  };

class DeleteScream extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteScream(this.props.screamId);
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="delete"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline style={{color:'red'}} />
        </MyButton>
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            fullWidth
            maxWidth="sm"
            >
                <DialogTitle>
                    Are you sure you want to delete this post?
                </DialogTitle>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Close
                </Button>
                <Button onClick={this.deleteScream} style={{color:'red'}}>
                    Delete
                </Button>
                </DialogActions>
            </Dialog>
      </Fragment>
    );
  }
}

DeleteScream.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(DeleteScream));
