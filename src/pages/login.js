import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import Link from "react-router-dom/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

//Redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

//Material UI import
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

const styles = {
  container: {
    marginTop: "80px",
    textAlign: "center"
  },
  card: {
    width: '400px',
    padding: "20px",
    borderRadius: '10%',
    background: '#e3e3e3'
  },
  image: {
    height: "120px",
    margin: "0px auto 0px auto"
  },
  pageTitle: {
    color:'#3B0A4D',
    margin: "7px auto 20px auto"
  },
  button: {
    background: "linear-gradient(to bottom, #c57b6f, #6d364a)",
    borderRadius: 8,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 30px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginTop: "10px",
    position: "relative"
  },
  textField: {
    margin: "5px auto 20px auto"
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: "10px"
  },
  progress: {
    position: "absolute"
  }
};

export class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {},
      speed: 6
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      classes,
      UI: { loading }
    } = this.props;
    const { errors } = this.state;

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.container}
      >
        <Card className={classes.card} >
          <img
            src={AppIcon}
            className={classes.image}
            style={{ animation: `spin ${this.state.speed}s linear infinite` }}
            alt="Icon"
          />
          <Typography
            variant="h3"
            style={{ fontFamily: "Monoton", fontSize: "45px" }}
            className={classes.pageTitle}
          >
            Login
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email address"
              helperText={errors.email} //to show errors
              error={errors.email ? true : false}
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password} //to show errors
              error={errors.password ? true : false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button type="submit" className={classes.button} disabled={loading}>
              LOGIN
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
            </Button>
            <br />
            <br />
            <small>
              dont have an account? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Card>
      </Grid>
    );
  }
}

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(login));
