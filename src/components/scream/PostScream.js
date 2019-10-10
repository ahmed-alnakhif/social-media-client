import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
//redux
import { connect } from "react-redux";
import { postScream, clearErrors } from "../../redux/actions/dataActions";

//Material UI
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../../util/MyButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import CreateIcon from "@material-ui/icons/Create";

const styles = {
  submitButton: {
    position: "relative",
    float: "right",
    marginTop: 10
  },
  progressSpinner: {
    position: "absolute"
  },
  closeButton: {
    position: "absolute",
    left: "91%",
    top: "6%",
    ['@media (max-width:650px)']: { 
      display:'none'
    }
  }
};

class PostScream extends Component {
  state = {
    open: false,
    body: "",
    errors: {},
    file:''
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        body: "",
        open: false,
        errors: {},
      });
    }
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.postScream({ body: this.state.body },this.state.file);
    this.setState({file:''});
  };

  pop = (event)=>{
    event.preventDefault()
    const postImage = event.target.files[0];
    const formData = new FormData();
    formData.append("PostImage", postImage, postImage.name);
    this.setState({file:formData})
  }

  handleImageChange = (event) => {//new
    const postImage = event.target.files[0];
    console.log('postImage:',postImage);
    //send file to server
    const FormData = new FormData();
    FormData.append("PostImage", postImage, postImage.name);
    //this.props.uploadImage(formData);
    
    this.setState({file:FormData})
    console.log('file:',this.state.file)
  };

  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <Fab
          variant="extended"
          size="medium"
          color="linear-gradient(to top, #23074d, #cc5333)"
          aria-label="add"
          className={classes.margin}
          onClick={this.handleOpen}
        >
          <CreateIcon style={{ marginRight: "4px" }} />
          <Typography style={{ fontFamily: "Pacifico" }}>POST</Typography>
        </Fab>
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
          <DialogTitle> Write a new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Spread your thoughts!!"
                multiline
                rows="3"
                placeholder="Post to your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
               
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
              
              <input type="file" id="imageInput" onChange={this.pop}/>
              
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps,{ postScream, clearErrors })(withStyles(styles)(PostScream));
