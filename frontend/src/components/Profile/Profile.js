import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button
} from "@material-ui/core";
import { PersonOutlined } from "@material-ui/icons";

import { resetPassword } from "../../actions/userActions";

import "./profile.css";

class Profile extends Component {
  state = {
    password: "",
    passwordCheck: "",
    newPassword: ""
  };

  constructor(props) {
    super(props);
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    if (
      this.state.newPassword === this.state.passwordCheck &&
      this.state.newPassword.trim() !== ""
    )
      this.props.resetPassword({
        newPassword: this.state.newPassword,
        password: this.state.password
      });
      this.setState({
        password: "",
        passwordCheck: "",
        newPassword: ""
      })
  };

  render() {
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className="paper">
          <div className="basic-info">
            <div>
              <Avatar className="avatar">
                <PersonOutlined />
              </Avatar>
            </div>
            <div>
              <Typography variant="h4">
                {this.props.user.user.username}
              </Typography>
            </div>
          </div>
          <Typography component="h1" variant="h6">
            Reset the password
          </Typography>
          <form className="form" noValidate onSubmit={this.handleOnSubmit}>
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
              name="newPassword"
              label="New password"
              type="password"
              id="password"
              value={this.state.newPassword}
              onChange={this.handleOnChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="passwordCheck"
              label="Repeat new password"
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
              Reset
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: password => {
      dispatch(resetPassword(password));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
