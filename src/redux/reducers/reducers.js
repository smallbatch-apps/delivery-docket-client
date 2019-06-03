import { combineReducers } from "redux";

export const dockets = (state = [], action) => {
  switch(action.type){
    case 'RECEIVE_DOCKETS':
      return action.payload;
    case 'SAVE_LOT_ON_DOCKET':
      let docketList = state.map(docket => {
        if (docket._id === action.payload.docketId) {
          docket.lots = [...docket.lots, action.payload];
        }
        return docket;
      });
      return [...docketList];
    case 'SAVE_DECLARATION_ON_DOCKET':
      let docketList2 = state.map(docket => {
        if (docket._id === action.payload._id) {
          docket.declaration = action.payload.declaration;
        }
        return docket;
      });
      return [...docketList2];
    case 'REPLACE_DOCKET':
      console.log(action.payload);
      let docketList3 = state.map(docket => {
        return docket._id === action.payload._id ? action.payload : docket;
      });
      return [...docketList3];
    case 'RECEIVE_NEW_DOCKET':
      return [...state, action.payload];
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
  dockets, userDetails, loginStatus, errors
});