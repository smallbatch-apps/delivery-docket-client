import { combineReducers } from "redux";

export const dockets = (state = [], action) => {
  switch(action.type){
    case 'RECEIVE_DOCKETS':
      return action.payload;
    case 'SAVE_LOT_TO_DOCKET':
      const dockets = state.map(docket => {
        if (docket.id !== action.payload.docketId) {
          docket.lots = [...docket.lots, action.payload];
          
        }
        return docket;
      });
      return [...dockets];
    case 'RECEIVE_NEW_DOCKET':
      return [...state, action.payload];
    default: return state;
  }
}

// 'RECEIVE_NEW_DOCKET'
// 'RECEIVE_DOCKETS'
// 'RECEIVE_SINGLE_DOCKET'
// 'SAVE_LOT_TO_DOCKET'

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
  dockets, userDetails, loginStatus, errors
});