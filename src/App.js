import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import jwtDecode from "jwt-decode";
import axios from "axios";
import * as Video from "./background4.mp4";

//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//Pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
//import landingpage from "./pages/landingpage";
import user from './pages/user';
//Components
import Navbar2 from "./components/layout/Navbar2";
import AuthRoute from "./util/AuthRoute";


axios.defaults.baseURL =
  'https://us-central1-socialape-9484b.cloudfunctions.net/api';

//check if user loggedin
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

const videoStyle={
  zIndex: '-2',
  right: 0,
  bottom: 0,
  position:'fixed'
}
// <video style={videoStyle} src={Video} autoPlay type="video/mp4" loop muted/>   



class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <Router>
            <Navbar2 />
            <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login} />
                <AuthRoute exact path="/signup" component={signup} />
                <Route exact path="/users/:handle" component={user}/>
                <Route exact path="/users/:handle/scream/:screamId" component={user}/>
            </Switch>
          </Router>
      </Provider>
    );
  }
}

export default App;
