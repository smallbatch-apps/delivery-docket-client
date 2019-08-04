import axios from 'axios';
import {API_LOCATION} from './interception';

const api = `${API_LOCATION}/lots`;
const declarationUrl = `${API_LOCATION}/declaration`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const addLotToDocket = async (docket_id, lot) => {
  return await axios.patch(`${api}/${lot.id}`, {...lot, docket_id});
}

export const getAll = async () => {
  return await axios.get(api);
}

export const getOne = async id => {
  return await axios.get(`${api}/${id}`);
}

export const create = async lot => {
  return await axios.post(api, {lot});
}

export const modify = async lot => {
  return await axios.patch(`${api}/${lot.id}`, {lot});
}

export const addDeclarationToLot = async declaration => {
  return await axios.post(declarationUrl, {declaration});
}

export const deleteEntity = async id => {
  return await axios.delete(`${api}/${id}`);
}