import React, { Component } from "react";
import { Paper, Typography, Grid, List, Button } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { connect } from "react-redux";

import Answer from "./Answer";
import AnswerForm from "./AnswerForm";

import {
  getQuestion,
  voteQuestionDown,
  voteQuestionUp
} from "../../actions/questionActions";

import { getAnswerPage } from "../../actions/answerActions";

import "./question.css";

class Question extends Component {
  constructor(props) {
    super(props);
    this.props.getQuestion(this.props.match.params.id);
    this.props.getAnswerPage(this.props.match.params.id, 1);
  }

  onClickUp = () => {
    if (this.props.user.user)
      this.props.voteQuestionUp(this.props.questions.currentQuestion._id, -1);
  };

  onClickDown = () => {
    if (this.props.user.user)
      this.props.voteQuestionDown(this.props.questions.currentQuestion._id, -1);
  };

  render() {
    let question = {};
    if (
      this.props.pending.GET_QUESTION &&
      this.props.pending.GET_QUESTION.pending &&
      !this.props.pending.GET_QUESTION.success
    )
      this.props.history.push("/");
    if (
      this.props.pending.GET_QUESTION &&
      this.props.pending.GET_QUESTION.success
    ) {
      question = {
        ...this.props.questions.currentQuestion
      };
    }
    let index = 0;
    const data = this.props.answers.answers.map(a => <Answer index={index++} answer={a} />);
    return this.props.pending.GET_QUESTION &&
      !this.props.pending.GET_QUESTION.pending ? (
      <Grid container>
        <Grid item xs={12} sm={12} md={3} />
        <Grid item xs={12} sm={12} md={6}>
          <Paper className="paper-wrapper">
            <div className="question-wrapper">
              <div className="question-content">
                <Typography variant="h4">{question.title}</Typography>
                <Typography variant="body1">{question.question}</Typography>
                <Typography variant="caption">
                  {question.user.username + " " + question.created}
                </Typography>
              </div>
              <div>
                <div>
                  <div>{question.numberOfUpVotes}</div>
                  <div className="question-vote">
                    <ThumbUp
                      onClick={this.onClickUp}
                      style={{
                        color:
                          question.vote > 0 && this.props.user.user
                            ? "green"
                            : "grey"
                      }}
                    />
                  </div>
                </div>
                <div>
                  <div>{question.numberOfDownVotes}</div>
                  <div className="question-vote">
                    <ThumbDown
                      onClick={this.onClickDown}
                      style={{
                        color:
                          question.vote < 0 && this.props.user.user
                            ? "red  "
                            : "grey"
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="answer-list">
              <List>{data}</List>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => this.props.getAnswerPage(
                  this.props.match.params.id,
                  this.props.answers.pageNumer
                )}
              >
                Load more...
              </Button>
            </div>
            <AnswerForm questionId={this.props.match.params.id} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={3} />
      </Grid>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    questions: state.questionReducer,
    answers: state.answerReducer,
    pending: state.pendingReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestion: id => {
      dispatch(getQuestion(id));
    },
    voteQuestionUp: (id, index) => {
      dispatch(voteQuestionUp(id, index));
    },
    voteQuestionDown: (id, index) => {
      dispatch(voteQuestionDown(id, index));
    },
    getAnswerPage: (id, page) => {
      dispatch(getAnswerPage(id, page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
