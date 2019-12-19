import React, { Component } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { connect } from "react-redux";

import { voteAnswerDown, voteAnswerUp } from "../../actions/answerActions";

import "./question.css";

class Answer extends Component {
  constructor(props) {
    super(props);
  }

  onClickUp = () => {
    if (this.props.user.user)
      this.props.voteAnswerUp(this.props.answer._id, this.props.index);
  };

  onClickDown = () => {
    if (this.props.user.user)
      this.props.voteAnswerDown(this.props.answer._id, this.props.index);
  };

  render() {
    return (
      <ListItem className="item" divider="true">
        <div className="data">
          <Typography
            overflowWrap="break-word"
            className="title"
            variant="body2"
          >
            {this.props.answer.answer}
          </Typography>
          <Typography variant="caption">
            {this.props.answer.user.username + " " + this.props.answer.created}
          </Typography>
        </div>
        <div className="vote">
          <div>{this.props.answer.numberOfUpVotes}</div>
          <div>
            <ThumbUp
              fontSize="small"
              style={{
                color:
                  this.props.answer.vote > 0 && this.props.user.user
                    ? "green"
                    : "grey"
              }}
              onClick={this.onClickUp}
            />
          </div>
          <div>{this.props.answer.numberOfDownVotes}</div>
          <div>
            <ThumbDown
              fontSize="small"
              style={{
                color:
                  this.props.answer.vote < 0 && this.props.user.user
                    ? "red"
                    : "grey"
              }}
              onClick={this.onClickDown}
            />
          </div>
        </div>
      </ListItem>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userReducer,
    answers: state.answerReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteAnswerUp: (id, index) => {
      dispatch(voteAnswerUp(id, index));
    },
    voteAnswerDown: (id, index) => {
      dispatch(voteAnswerDown(id, index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Answer);
