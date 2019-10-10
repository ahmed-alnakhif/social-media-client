import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

//MUI
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";
import { amber, green } from "@material-ui/core/colors";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import WarningIcon from "@material-ui/icons/Warning";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Tooltip from '@material-ui/core/Tooltip';

//Redux
import { connect } from "react-redux";
import { deleteScream } from "../../redux/actions/dataActions";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon
};

const styles = {

};

const useStyles1 = makeStyles(theme => ({
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: "flex",
    alignItems: "center"
  }
}));

function MySnackbarContentWrapper(props) {
  const classes = useStyles1();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(["error", "info", "success", "warning"]).isRequired
};

const useStyles2 = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

function SnackbarDelete({deleteScream,screamId}) {
  const classes = useStyles2();
  const [open, setOpen] = React.useState(false);//for delete button
  const [Open, SetOpen] = React.useState(false);//for notification

  //handle delete button
  const handleClose = ()=>{
    setOpen(false);
  }
  const handleOpen = () => {
    setOpen(true);
  };
  const deleteScreamFunc = () => {
    deleteScream(screamId);
    setOpen(false); //
  };


  //handle notification on successful delete
  const handleOpenSnackbar = ()=>{
    deleteScreamFunc();
    SetOpen(true);
  }
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    SetOpen(false);
  };

  return (
    <div>
      <Tooltip title="delete" placement='top'>
      <Button
        className={classes.margin}
        onClick={handleOpen}
        
      >
        <DeleteOutline style={{color:'#f5aeae'}} />
      </Button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Are you sure you want to delete the post?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleOpenSnackbar} style={{ color: "red" }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        open={Open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}

      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant="success"
          message="Post deleted successfully!"
        />
      </Snackbar>
    </div>
  );
}

SnackbarDelete.propTypes = {
  deleteScream: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteScream }
)(withStyles(styles)(SnackbarDelete));
