import React, { Component } from "react";
import {
  Container,
  Button,
  List,
  CssBaseline,
  Modal,
  Typography
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { connect } from "react-redux";

import { getQuestionsPage } from "../../actions/questionActions";

import QuestionListItem from "./QuestionListItem";
import AddQuestion from "./AddQuestion";

class QuestionList extends Component {
  state = {
    modal: false
  };

  constructor(props) {
    super(props);
    this.props.getItems(1);
  }

  handleOpen = () => {
    this.setState({ modal: true });
  };

  handleClose = () => {
    this.setState({ modal: false });
  };

  render() {
    const questions = this.props.questions;
    console.log("Questions: ", questions);
    let index = 0;
    const data = questions
      ? questions.questions.map(q => <QuestionListItem index={index++} question={q} />)
      : [];
    return (
      <Container minWidht="75%">
        <CssBaseline />
        <div className="list-title">
          <div>
    <Typography variant="h4">{this.props.title}</Typography>
          </div>
          {this.props.user.user && (
            <div>
              <Button
                color="primary"
                variant="contained"
                onClick={this.handleOpen}
              >
                <Add />
              </Button>
            </div>
          )}
        </div>
        <List>{data}</List>
        <Button
          variant="outlined"
          fullWidth
          onClick={() => this.props.getItems(this.props.questions.pageNumber)}
        >
          Load more...
        </Button>
        <Modal open={this.state.modal} onClose={this.handleClose}>
          <AddQuestion onClose={this.handleClose}/>
        </Modal>
      </Container>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
