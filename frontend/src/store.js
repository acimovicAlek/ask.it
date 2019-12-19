import { createStore, combineReducers, applyMiddleware, compose } from "redux";

import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import pendingReducer from "./reducers/pendingReducer"
import userReducer from "./reducers/userReducer";
import questionReducer from "./reducers/questionReducer";
import answerReducer from "./reducers/answerReducer"

export default createStore(
  combineReducers({
    pendingReducer,
    userReducer,
    questionReducer,
    answerReducer
  }),
  {},
  compose(
    applyMiddleware(thunk, promise),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
