import axios from 'axios';
import {collectionOptions, singleOptions, API_LOCATION} from './interception';
// import {successHandler} from './interception';

// axios.interceptors.response.use(
//   response => successHandler(response)
// );

const api = `${API_LOCATION}/dockets`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const getAll = async () => {
  return await axios.get(api, collectionOptions('dockets'));
}

export const getOne = async id => {
  return await axios.get(`${api}/${id}`, singleOptions('docket'));
}

export const create = async docket => {
  return await axios.post(api, {docket}, singleOptions('docket'));
}

export const modify = async (id, docket) => {
  return await axios.patch(`${api}/${id}`, {docket}, singleOptions('docket'));
}

export const deleteEntity = async id => {
  return await axios.delete(`${api}/${id}`, singleOptions('docket'));
}

