import React, { Component } from "react";
import { Grid, Paper } from "@material-ui/core";
import { connect } from "react-redux";

import QuestionList from "../QuestionList/QuestionList";
import { TopQuestionsList } from "./TopQuestions/TopQuestionsList";
import { TopUsersList } from "./TopUsers/TopUsersList";

import { getTopUsers } from "../../actions/userActions";
import {getHotQuestions, getQuestionsPage} from "../../actions/questionActions";

import "./homepage.css";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.props.getTopUsers();
    this.props.getHotQuestions();
  }
  render() {
    return (
      <div className="main-wrapper">
        <Grid container spacing={1} direction="row">
          <Grid item xs={12} sm={12} md={6}>
            <Paper className="main-wrapper_paper">
              <QuestionList getItems={this.props.getQuestionsPage} title="Questions Thread"/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Paper className="main-wrapper_paper">
              <TopQuestionsList hotQuestions={this.props.question.hotQuestions}/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={2}>
            <Paper className="main-wrapper_paper">
              <TopUsersList topUsers={this.props.user.topUsers}/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    question: state.questionReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTopUsers: () => {
      dispatch(getTopUsers());
    },
    getHotQuestions:() =>{
      dispatch(getHotQuestions());
    },
    getQuestionsPage: (page) => {
      dispatch(getQuestionsPage(page))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
