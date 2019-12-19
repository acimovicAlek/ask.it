const initialState = {
  questionId: "",
  pageNumber: 1,
  answers: []
};
const answerReducer = (state = initialState, action) => {
  let currentVote;
  let numberOfUpVotes;
  let numberOfDownVotes;
  switch (action.type) {
    case "CREATE_ANSWER_FULFILLED":
      return Object.assign({}, state, {
        ...state,
        answers: [
          ...state.answers,
          { ...action.payload.data, user: action.payload.data.user }
        ]
      });
      break;
    case "GET_ANSWERS_FULFILLED":
      if (action.payload.data.pageNumber == 1) state = initialState;
      return Object.assign({}, state, {
        ...state,
        questionId: action.payload.data.questionId,
        pageNumber: state.pageNumber + 1,
        answers: state.answers.concat(
          action.payload.data.answers.map(a => ({ ...a, user: a.user }))
        )
      });
      break;
    case "VOTE_ANSWER_UP_FULFILLED":
      currentVote = state.answers[action.payload].vote;
      numberOfUpVotes = state.answers[action.payload].numberOfUpVotes;
      numberOfDownVotes = state.answers[action.payload].numberOfDownVotes;

      return Object.assign({}, state, {
        ...state,
        answers: state.answers.map((item, index) => {
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
    case "VOTE_ANSWER_DOWN_FULFILLED":
      currentVote = state.answers[action.payload].vote;
      numberOfUpVotes = state.answers[action.payload].numberOfUpVotes;
      numberOfDownVotes = state.answers[action.payload].numberOfDownVotes;

      return Object.assign({}, state, {
        ...state,
        answers: state.answers.map((item, index) => {
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
    default:
      return state;
      break;
  }
};

export default answerReducer;
