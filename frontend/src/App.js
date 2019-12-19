import React, {Component} from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";

import "./App.css";

import Navigation from "./components/Navigaton/Navigation";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import HomePage from "./components/HomePage/HomePage";
import Question from "./components/Question/Question";
import MyQuestions from "./components/MyQuestions/MyQuestions";
import Profile from "./components/Profile/Profile";

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Navigation />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {this.props.user.user && <Route exact path="/myquestions" component={MyQuestions} />}
            {this.props.user.user && <Route exact path="/profile" component={Profile} />}
            <Route path="/question/:id" component={Question} />
            {!this.props.user.user && <Route exact path="/login" component={Login} />}
            {!this.props.user.user && <Route exact path="/register" component={Registration} />}
            {!this.props.user.user && <Redirect to="/login" exact/>}
            {this.props.user.user && <Redirect to="/" exact/>}
          </Switch>
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
  };
};


export default connect(mapStateToProps, null)(App);
