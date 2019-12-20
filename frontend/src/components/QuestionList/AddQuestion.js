import React, { Component } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";

import {createQuestion} from "../../actions/questionActions";

import "./questionsList.css";

class AddQuestion extends Component {
  
  state = {
    title:"",
    question:""
  }
  
  constructor(props){
    super(props);
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.props.createQuestion({...this.state});
    this.props.onClose();
  }

  render() {
    return (
      <div className="add-form">
        <form noValidate autoComplete="off" onSubmit={this.handleOnSubmit}>
          <div>
            <Typography variant="h4">Ask a question!</Typography>
          </div>
          <div>
            <TextField
              required
              fullWidth
              id="questionTitle"
              name="title"
              label="Question title"
              variant="filled"
              onChange={this.handleOnChange}
            />
          </div>
          <div>
            <TextField
              id="question"
              name="question"
              label="Add more what you want to ask about..."
              multiline
              fullWidth
              rows="8"
              defaultValue=""
              variant="outlined"
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
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createQuestion: question => {
      dispatch(createQuestion(question));
    }
  };
};

export default connect(null, mapDispatchToProps)(AddQuestion);