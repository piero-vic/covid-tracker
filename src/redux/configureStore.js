import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import dataReducer from './data/data';
import covidReducer from './covid/covid';

const reducer = combineReducers({
  data: dataReducer,
  covid: covidReducer,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
