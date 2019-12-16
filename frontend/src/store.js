import {createStore, combineReducers, applyMiddleware} from 'redux';

import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default createStore(
    combineReducers({

    }),
    {},
    applyMiddleware(thunk, promise())
);