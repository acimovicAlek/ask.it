import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Avatar
} from "@material-ui/core";
import { PersonAddOutlined } from "@material-ui/icons";
import { connect } from "react-redux";

import { registerUser } from "../../actions/userActions";
import { reset } from "../../actions/pendingActions";

import "./registration.css";

class Registration extends Component {
  state = {
    username: "",
    password: "",
    passwordCheck: ""
  };

  constructor(props) {
    super(props);
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = event => {
    event.preventDefault();

    if (
      this.state.passwordCheck === this.state.password &&
      this.state.username.trim() !== ""
    ) {
      const response = this.props.registerUser({
        username: this.state.username,
        password: this.state.password
      });
    }
  };

  render() {
    const reqStatus = this.props.pending.USER_REGISTER;
    console.log(reqStatus);
    if (reqStatus && !reqStatus.pending && reqStatus.success) {
      this.props.reset();
      this.props.history.push("/");
    }
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <Avatar className="avatar">
            <PersonAddOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registration
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
              value={this.state.username}
              onChange={this.handleOnChange}
              autoFocus
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
              value={this.state.password}
              onChange={this.handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordCheck"
              label="Repeat password"
              type="password"
              id="passwordCheck"
              value={this.state.passwordCheck}
              onChange={this.handleOnChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    registerUser: credentials => {
      dispatch(registerUser(credentials));
    },
    reset: () => {
      dispatch(reset());
    }
  };
};

const mapStateToProps = state => {
  return {
    pending: state.pendingReducer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
