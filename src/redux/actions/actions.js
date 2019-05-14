import * as LoginService from '../../services/login';
import * as UserService from '../../services/user';
import * as DocketService from '../../services/dockets';
import * as LotService from '../../services/lots';

export const deleteError = payload => ({ type: 'DELETE_ERROR', payload });

export const setError = (section, fields) => ({
  type: 'SET_ERROR',
  payload: { section, fields }
});

export const logInUser = (email, password) => {
  return async dispatch => {
    dispatch(deleteError('loginForm'));
    try {
      const {data} = await LoginService.login(email, password);
      localStorage.setItem("token", data.token);
      dispatch({type: 'LOG_IN'});
    } catch (error) {
      dispatch(setError('loginForm', ['email', 'password']));
    }
  }
};

export const logOutUser = () => {
  return async dispatch => {
    localStorage.removeItem("token");
    dispatch({type: 'LOG_OUT'});
  }
}

export const createNewUser = user => {
  return async dispatch => {
    await UserService.createUser(user);
  }
}

export const fetchAllDockets = () => {
  return async dispatch => {
    const { data } = await DocketService.getAll();
    dispatch(receiveDockets(data.dockets));
  }
}

export const fetchSingleDocket = id => {
  return async dispatch => {
    const { data } = await DocketService.getOne(id);
    dispatch(receiveSingleDocket(data.docket));
  }
}

export const createLotOnDocket = (docketId, lot) => {
  return async dispatch => {
    const { data } = await LotService.addLotToDocket(docketId, lot)
    dispatch(saveLotOnDocket(data));
  }
}

export const receiveDockets = payload => ({type: 'RECEIVE_DOCKETS', payload});
export const receiveSingleDocket = payload => ({type: 'RECEIVE_SINGLE_DOCKET', payload});
export const saveLotOnDocket = payload => ({type: 'SAVE_LOT_TO_DOCKET', payload});