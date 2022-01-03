import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import dataReducer from './data/data';

const reducer = combineReducers({
  data: dataReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
