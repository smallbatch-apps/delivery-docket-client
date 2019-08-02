import { combineReducers } from "redux";

const containerTypes = ['Select Container Type', 'IBC', 'Drum', 'Block'];

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

    case 'REPLACE_DOCKET':
      let docketList3 = state.map(docket => {
        return docket._id === action.payload._id ? action.payload : docket;
      });
      return [...docketList3];
    case 'RECEIVE_NEW_DOCKET':
      return [...state, action.payload];
    default: return state;
  }
}

export const lots = (state = [], action) => {
  switch(action.type) {
    case 'RECEIVE_LOTS':
      return action.payload;
    case 'RECEIVE_NEW_CONTAINER':
      return state.map(lot => {
        if (+lot.id === +action.payload.lot_id) {
          action.payload.type = {type: containerTypes[action.payload.container_type_id]}
          lot.containers.push(action.payload);
        }
        return lot;
      });
    case 'REPLACE_LOT':
      return state.map(lot => lot.id === action.payload.id ? action.payload : lot);
    default: return state;
  }
}

export const containers = (state = [], action) => {

  switch(action.type) {
    case 'RECEIVE_CONTAINERS':
      return action.payload;
    case 'RECEIVE_NEW_CONTAINER':
      return state;
    case 'REPLACE_CONTAINER':
      return state.map(container => container.id === action.payload.id ? action.payload : container);
    default: return state;
  }
}

export const robbings = (state = [], action) => {
  switch(action.type) {
    case 'RECEIVE_ROBBINGS':
      return action.payload;
    case 'REPLACE_ROBBING':
      return state.map(robbing => robbing.id === action.payload.id ? action.payload : robbing);
    default: return state;
  }
}

export const varieties = (state = [], action) => {
  switch(action.type) {
    case 'RECEIVE_VARIETIES':
      return action.payload;
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

export const offline = (state = {offline: false, containers: [], robbings: [], dockets: []}, {type, payload}) => {
  switch(type) {
    case 'SET_OFFLINE':
      return {...state, offline: payload};
    default: return {...state};
  }
}

export default combineReducers({
  containers, robbings, varieties, lots, dockets, userDetails, loginStatus, errors
});