import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import Link from 'react-router-dom/Link';
import CircularProgress from '@material-ui/core/CircularProgress';

//Redux imports
import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userActions';

//Material UI import
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';
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
  pageTitle:{
    color:'#3B0A4D',
    margin: "7px auto 20px auto",
  },
  button: {
    background:"linear-gradient(to bottom, #c57b6f, #6d364a)",
    borderRadius: 8,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginTop:'20px',
    position:'relative'
  },
  textField:{
      margin: "2px auto 10px auto",
      
  },
  customError:{
      color:'red',
      fontSize: '0.8rem',
      marginTop: '10px'
  },
  progress:{
      position: 'absolute'
  }
};


export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword:'',
      handle:'',
      speed: 6,
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({errors: nextProps.UI.errors})
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
        loading: true
    });
    const newUserData={
        email: this.state.email,
        password: this.state.password,
        confirmPassword : this.state.confirmPassword,
        handle: this.state.handle
    }
    this.props.signupUser(newUserData,this.props.history);
  };

  handleChange = event =>{
      this.setState({
          [event.target.name]: event.target.value
      })
  }
  render() {
    const { classes, UI:{loading} } = this.props;
    const {errors } = this.state;

    return (
      <Grid
      container
      justify="center"
      alignItems="center"
      className={classes.container}
    >
        <Card className={classes.card}>
          <img src={AppIcon} className={classes.image} style={{ animation: `spin ${this.state.speed}s linear infinite` }} alt="Icone" />
          <Typography variant="h3" style={{fontFamily:'Monoton',fontSize:'45px'}} className={classes.pageTitle}>
            Signup
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email address"
              helperText={errors.email} //to show errors
              error={errors.email?true:false}
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
              error={errors.password?true:false}
              className={classes.textField}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
            />
             <TextField
              className={classes.textField}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              helperText={errors.confirmPassword} //to show errors
              error={errors.confirmPassword?true:false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
            />
             <TextField
              className={classes.textField}
              id="handle"
              name="handle"
              type="text"
              label="Handle name"
              helperText={errors.handle} //to show errors
              error={errors.handle?true:false}
              value={this.state.handle}
              onChange={this.handleChange}
              fullWidth
            />
            {errors.general && (
                <Typography variant="body2" className={classes.customError}>
                    {errors.general}
                </Typography>
            )}
            <Button type="submit" className={classes.button} disabled={loading}>
                SIGNUP
                {loading && (
                    <CircularProgress size={30} className={classes.progress}/>
                )}
            </Button>
            <br/><br/>
            <small>Already have an account? login <Link to="/login">here</Link></small>
          </form>
        </Card>
      </Grid>
    );
  }
}

signup.propTypes = {
    classes:PropTypes.object.isRequired,
    user:PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired
};

const mapStateToProps = (state)=>({
  user: state.user,
  UI: state.UI,
})

export default connect(mapStateToProps,{signupUser})(withStyles(styles)(signup));
