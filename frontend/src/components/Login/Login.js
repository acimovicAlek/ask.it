import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Avatar
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { connect } from "react-redux";

import { login } from "../../actions/userActions";

import "./login.css";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  constructor(props) {
    super(props);
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    const response = this.props.login({
      username: this.state.username,
      password: this.state.password
    });
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className="form" noValidate onSubmit={this.handleOnSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={this.state.username}
              onChange={this.handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: credentials => {
      dispatch(login(credentials));
    }
  };
};

export default connect(null, mapDispatchToProps)(Login);
