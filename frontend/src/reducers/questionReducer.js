import update from "immutability-helper";
import axios from "axios";
import { env } from "../configs/env";

const initialState = {
  pageNumber: 1,
  questions: [],
  hotQuestions: [],
  currentQuestion: {}
};

const questionReducer = (state = initialState, action) => {
  let currentVote;
  let numberOfUpVotes;
  let numberOfDownVotes;
  switch (action.type) {
    case "GET_QUESTIONS_PAGE_FULFILLED":
      const questionsPage = action.payload.data.questions;
      console.log("Log questionsPage :", questionsPage);
      if (action.payload.data.pageNumber == 1) {
        state.pageNumber = 1;
        state.questions = [];
      }
      return Object.assign({}, state, {
        ...state,
        pageNumber: state.pageNumber + 1,
        questions: state.questions.concat(
          questionsPage.map(q => ({ ...q, user: q.user }))
        )
      });
      break;
    case "GET_QUESTION_FULFILLED":
      return Object.assign({}, state, {
        ...state,
        currentQuestion: {
          ...action.payload.data,
          user: { ...action.payload.data.user }
        }
      });
      break;
    case "VOTE_QUESTION_UP_FULFILLED":
      currentVote =
        action.payload >= 0
          ? state.questions[action.payload].vote
          : state.currentQuestion.vote;
      numberOfUpVotes =
        action.payload >= 0
          ? state.questions[action.payload].numberOfUpVotes
          : state.currentQuestion.numberOfUpVotes;
      numberOfDownVotes =
        action.payload >= 0
          ? state.questions[action.payload].numberOfDownVotes
          : state.currentQuestion.numberOfDownVotes;

      //Vote for question in the single view
      if (action.payload < 0) {
        return Object.assign({}, state, {
          ...state,
          currentQuestion: {
            ...state.currentQuestion,
            vote: currentVote > 0 ? 0 : 1,
            numberOfUpVotes:
              currentVote > 0 ? numberOfUpVotes - 1 : numberOfUpVotes + 1,
            numberOfDownVotes:
              currentVote < 0 ? numberOfDownVotes - 1 : numberOfDownVotes
          }
        });
      }
      //Vote for question in the list
      return Object.assign({}, state, {
        ...state,
        questions: state.questions.map((item, index) => {
          if (index !== action.payload) return item;
          return {
            ...item,
            vote: currentVote > 0 ? 0 : 1,
            numberOfUpVotes:
              currentVote > 0 ? numberOfUpVotes - 1 : numberOfUpVotes + 1,
            numberOfDownVotes:
              currentVote < 0 ? numberOfDownVotes - 1 : numberOfDownVotes
          };
        })
      });
      break;
    case "VOTE_QUESTION_DOWN_FULFILLED":
      currentVote =
        action.payload >= 0
          ? state.questions[action.payload].vote
          : state.currentQuestion.vote;
      numberOfUpVotes =
        action.payload >= 0
          ? state.questions[action.payload].numberOfUpVotes
          : state.currentQuestion.numberOfUpVotes;
      numberOfDownVotes =
        action.payload >= 0
          ? state.questions[action.payload].numberOfDownVotes
          : state.currentQuestion.numberOfDownVotes;

      //Vote for the question in the single view
      if (action.payload < 0) {
        return Object.assign({}, state, {
          ...state,
          currentQuestion: {
            ...state.currentQuestion,
            vote: currentVote < 0 ? 0 : -1,
            numberOfUpVotes:
              currentVote > 0 ? numberOfUpVotes - 1 : numberOfUpVotes,
            numberOfDownVotes:
              currentVote < 0 ? numberOfDownVotes - 1 : numberOfDownVotes + 1
          }
        });
      }
      //Vote for the question in the list
      return Object.assign({}, state, {
        ...state,
        questions: state.questions.map((item, index) => {
          if (index !== action.payload) return item;
          return {
            ...item,
            vote: currentVote < 0 ? 0 : -1,
            numberOfUpVotes:
              currentVote > 0 ? numberOfUpVotes - 1 : numberOfUpVotes,
            numberOfDownVotes:
              currentVote < 0 ? numberOfDownVotes - 1 : numberOfDownVotes + 1
          };
        })
      });
      break;
    case "GET_HOT_QUESTIONS_FULFILLED":
      return Object.assign({}, state, {
        ...state,
        hotQuestions: action.payload.data.map(q => ({ ...q, user: q.user }))
      });
      break;
    default:
      return state;
      break;
  }
};

export default questionReducer;
