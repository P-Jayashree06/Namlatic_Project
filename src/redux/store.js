import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { hotelReducer } from './hotelSlice';

const rootReducer = combineReducers({
  hotels: hotelReducer,
});

function thunkMiddleware({ dispatch, getState }) {
  return (next) => (action) =>
    typeof action === 'function' ? action(dispatch, getState) : next(action);
}

export const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunkMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (next) => next,
  ),
);
