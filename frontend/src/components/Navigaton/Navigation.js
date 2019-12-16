import React from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid
} from "@material-ui/core";
import { Lock, LockOpen, Person, QuestionAnswer } from "@material-ui/icons";
import "./navigation.css";

export const Navigation = props => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container spacing={24}>
          <Grid item>
            <Typography variant="h6">
              Ask.it
            </Typography>
          </Grid>
          <Grid item>
            {true ? (
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
                <Button color="inherit">
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
};
