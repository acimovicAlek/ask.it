import React, { Component } from "react";
import {
  ListItem,
  Typography,
  Link
} from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { connect } from "react-redux";

import {
  voteQuestionDown,
  voteQuestionUp
} from "../../actions/questionActions";

import "./questionsList.css";

class QuestionListItem extends Component {
  state = {
    vote: 1
  };

  constructor(props) {
    super(props);
  }

  onClickUp = () => {
    if (this.props.user.user)
    this.props.voteQuestionUp(this.props.question._id, this.props.index);
  };

  onClickDown = () => {
    if (this.props.user.user)
    this.props.voteQuestionDown(this.props.question._id, this.props.index);
  };

  render() {
    return (
      <ListItem className="item" divider="true">
        <div className="data">
          <Link href={"/question/" + this.props.question._id}>
          <Typography overflowWrap="break-word" className="title" variant="h6">
            {this.props.question.title}
          </Typography>
          </Link>
          <Typography variant="caption">
            {this.props.question.user.username +
              " " +
              this.props.question.created}
          </Typography>
        </div>
        <div className="vote">
          <div>{this.props.question.numberOfUpVotes}</div>
          <div>
            <ThumbUp
              fontSize="small"
              style={{ color: this.props.question.vote > 0 && this.props.user.user ? "green" : "grey" }}
              onClick={this.onClickUp}
            />
          </div>
          <div>{this.props.question.numberOfDownVotes}</div>
          <div>
            <ThumbDown
              fontSize="small"
              style={{ color: this.props.question.vote < 0 && this.props.user.user ? "red" : "grey" }}
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
    questions: state.questionReducer
  };
};

const mapDispatchToProps = dispatch => {
  return {
    voteQuestionUp: (id, index) => {
      dispatch(voteQuestionUp(id, index));
    },
    voteQuestionDown: (id, index) => {
      dispatch(voteQuestionDown(id, index));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionListItem);
