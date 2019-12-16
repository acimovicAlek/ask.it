import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

import "./login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
  }

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
          <form className="form" noValidate>
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
