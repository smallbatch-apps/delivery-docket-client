import * as LoginService from '../../services/login';
import * as UserService from '../../services/user';
import * as DocketService from '../../services/dockets';
import * as LotService from '../../services/lots';
import * as ContainerService from '../../services/containers';
import * as RobbingService from '../../services/robbings';
import * as VarietyService from '../../services/varieties';

export const logInUser = (email, password) => {
  return async dispatch => {
    dispatch(deleteError('loginForm'));
    try {
      const {data} = await LoginService.login(email, password);
      localStorage.setItem("token", data.token.token);
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

export const createNewDocket = docket => {
  return async dispatch => {
    const { data } = await DocketService.create(docket);
    dispatch(receiveNewDocket(data));
  }
}

export const createNewLot = lot => {
  return async dispatch => {
    const { data } = await LotService.create(lot);
    dispatch(receiveNewLot(data));
  }
}

export const createNewRobbing = robbing => {
  return async dispatch => {
    const { data } = await RobbingService.create(robbing);
    dispatch(receiveNewRobbing(data));
  }
}

export const createNewContainer = container => {
  return async dispatch => {
    const { data } = await ContainerService.create(container);
    dispatch(receiveNewContainer(data));
  }
}

export const fetchAllDockets = () => {
  return async dispatch => {
    const { data } = await DocketService.getAll();
    dispatch(receiveDockets(data.dockets));
  }
}

export const fetchAllLots = () => {
  return async dispatch => {
    const { data } = await LotService.getAll();
    dispatch(receiveLots(data.lots));
  }
}

export const fetchAllContainers = () => {
  return async dispatch => {
    const { data } = await ContainerService.getAll();
    dispatch(receiveContainers(data.containers));
  }
}

export const fetchAllRobbings = () => {
  return async dispatch => {
    const { data } = await RobbingService.getAll();
    dispatch(receiveRobbings(data.robbings));
  }
}

export const editDocket = (id, edit) => {
  return async dispatch => {
    const { data } = await DocketService.modify(id, edit);
    dispatch(replaceDocket(data.docket));
  }
}

export const editContainer = (id, edit) => {
  return async dispatch => {
    const { data } = await ContainerService.modify(id, edit);
    dispatch(replaceContainer(data.container));
  }
}

export const editRobbing = (id, edit) => {
  return async dispatch => {
    const { data } = await RobbingService.modify(id, edit);
    dispatch(replaceRobbing(data.robbing));
  }
}

export const fetchAllVarieties = () => {
  return async dispatch => {
    const { data } = await VarietyService.getAll();
    dispatch(receiveVarieties(data.varieties));
  }
}

export const fetchSingleDocket = id => {
  return async dispatch => {
    const { data } = await DocketService.getOne(id);
    dispatch(receiveSingleDocket(data.docket));
  }
}

export const lodgeDocket = docketId => {
  return async dispatch => {
    const { data } = await DocketService.modify(docketId, {lodgementDate: new Date()});
    dispatch(replaceDocket(data.docket));
  }
}

export const createDeclarationOnLot = (docketId, declaration) => {
  return async dispatch => {
    const { data } = await LotService.addDeclarationToLot(docketId, declaration);
    dispatch(saveDeclarationOnLot(data));
  }
}

export const receiveNewDocket = payload => ({type: 'RECEIVE_NEW_DOCKET', payload});
export const receiveDockets = payload => ({type: 'RECEIVE_DOCKETS', payload});
export const receiveSingleDocket = payload => ({type: 'RECEIVE_SINGLE_DOCKET', payload});
export const saveLotOnDocket = payload => ({type: 'SAVE_LOT_ON_DOCKET', payload});
export const saveDeclarationOnLot = payload => ({type: 'SAVE_DECLARATION_ON_LOT', payload});
export const replaceDocket = payload => ({type: 'REPLACE_DOCKET', payload});

export const receiveNewLot = payload => ({type: 'RECEIVE_NEW_LOT', payload});
export const receiveLots = payload => ({type: 'RECEIVE_LOTS', payload});
export const replaceLot = payload => ({type: 'REPLACE_LOTS', payload});

export const receiveNewContainer = payload => ({type: 'RECEIVE_NEW_CONTAINER', payload});
export const receiveContainers = payload => ({type: 'RECEIVE_CONTAINERS', payload});
export const replaceContainer = payload => ({type: 'REPLACE_CONTAINER', payload});

export const receiveNewRobbing = payload => ({type: 'RECEIVE_NEW_ROBBING', payload});
export const receiveRobbings = payload => ({type: 'RECEIVE_ROBBINGS', payload});
export const replaceRobbing = payload => ({type: 'REPLACE_ROBBING', payload});

export const receiveVarieties = payload => ({type: 'RECEIVE_VARIETIES', payload});

export const deleteError = payload => ({ type: 'DELETE_ERROR', payload });
export const setError = (section, fields) => ({type: 'SET_ERROR', payload: { section, fields } });
