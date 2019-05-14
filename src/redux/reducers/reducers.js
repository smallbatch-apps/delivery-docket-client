import { combineReducers } from "redux";

export const dockets = (state = [], action) => {
  switch(action.type){
    case 'RECEIVE_DOCKETS':
      return action.payload;
    case 'ADD_DOCKET':
      return [...state, action.payload];
    default: return state;
  }
}

export const fullDockets = (state = {}, action) => {
  switch(action.type){
    case 'SAVE_LOT_TO_DOCKET':
      console.log(action.payload);
      return {...state};
    case 'RECEIVE_SINGLE_DOCKET':
      return {...state, [action.payload._id]: action.payload};
    default: return state;
  }
}

export const userDetails = (state = null, action) => {
  switch(action.type){
    case 'RECEIVE_USER':
      return action.payload;
    default: return state;
  }
}

export const loginStatus = (state = !!localStorage.token, action) => {
  switch(action.type){
    case 'LOG_IN':
      return true;
    case 'LOG_OUT':
      localStorage.removeItem('token');
      return false;
    default: return state;
  }
}

export const errors = (state = {}, {type, payload}) => {
  switch(type) {
    case 'SET_ERROR':
      return {...state, [payload.section]: payload.fields};
    case 'REMOVE_ERROR':
      delete state[payload];
      return {...state};
    default: return state;
  }
}

export default combineReducers({
  dockets, fullDockets, userDetails, loginStatus, errors
});