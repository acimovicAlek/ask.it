import React, { Component } from "react";
import { Paper, Grid} from "@material-ui/core";
import { connect } from "react-redux";

import QuestionList from "../QuestionList/QuestionList";

import {
    getMqQuestionsPage
} from "../../actions/questionActions";


import "./myquestions.css";

class MyQuestions extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let index = 0;
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={3} />
        <Grid item xs={12} sm={12} md={6}>
          <Paper className="paper-wrapper">
            <QuestionList title="My Questions" getItems={this.props.getMqQuestionsPage}/>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={3} />
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questionReducer,
  };
};

const mapDispatchToProps = dispatch => {
  return {
      getMqQuestionsPage: page=>{
          dispatch(getMqQuestionsPage(page));
      }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyQuestions);
