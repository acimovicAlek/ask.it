import React, { Component } from "react";
import {
  Container,
  CssBaseline,
  Typography,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
import { PersonAddOutlined } from "@material-ui/icons";

import "./registration.css"
export default class Registration extends Component {
  constructor(props) {
    super(props);
  }

  render() {
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
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password-check"
              label="Repeat password"
              type="password"
              id="password-check"
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
