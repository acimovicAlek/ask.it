import React, { Component } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import { createAnswer } from "../../actions/answerActions";

import "./question.css";

class AnswerForm extends Component {
  state = {
    answer: ""
  };

  constructor(props) {
    super(props);
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.createAnswer({
      answer: this.state.answer,
      question: this.props.questionId
    });
    this.setState({answer:""});
  };

  render() {
    return (
      <div>
        <form noValidate autoComplete="off" onSubmit={this.handleOnSubmit}>
          <div>
            <TextField
              id="answer"
              name="answer"
              label="Add a comment here..."
              multiline
              fullWidth
              rows="3"
              defaultValue=""
              variant="outlined"
              value={this.state.answer}
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
              disabled={
                !this.props.user.user &&
                !(
                  this.props.pending.CREATE_QUESTION &&
                  !this.props.pending.CREATE_QUESTION.pending
                )
              }
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    pending: state.pendingReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createAnswer: answer => {
      dispatch(createAnswer(answer));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AnswerForm);
