import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Grid } from "@material-ui/core";
import { Lock, LockOpen, Person, QuestionAnswer } from "@material-ui/icons";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { logout } from "../../actions/userActions";

import "./navigation.css";

class Navigation extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppBar position="static" className="wrapper">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography variant="h6"><NavLink to="/" className="logo">Ask.it</NavLink></Typography>
            </Grid>
            <Grid item>
              {this.props.user.user? (
                <div className="navigation-buttons">
                  <NavLink to="/myquestions">
                    <Button color="inherit">
                      <QuestionAnswer />
                    </Button>
                  </NavLink>
                  <NavLink color="inherit" to="/profile">
                    <Button color="inherit">
                      <Person />
                    </Button>
                  </NavLink>
                  <Button onClick={this.props.logout} color="inherit">
                    <LockOpen />
                  </Button>
                </div>
              ) : (
                <div className="navigation-buttons">
                  <NavLink to="/register">
                    <Button color="inherit">register</Button>
                  </NavLink>
                  <NavLink to="/login">
                    <Button color="inherit">
                      <Lock />
                    </Button>
                  </NavLink>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user:state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
