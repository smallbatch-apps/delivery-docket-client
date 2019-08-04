import axios from 'axios';
import {successHandler, requestHandler, errorHandler, API_LOCATION} from './interception';

axios.interceptors.response.use(
  request => requestHandler(request),
  response => successHandler(response),
  error => errorHandler(error)
);

const url = `${API_LOCATION}/robbings`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const getAll = async () => {
  return await axios.get(url);
}

export const getOne = async id => {
  return await axios.get(`${url}/${id}`);
}

export const create = async robbing => {
  return await axios.post(url, {robbing});
}

export const modify = async (id, robbing) => {
  return await axios.patch(`${url}/${id}`, {robbing});
}

export const deleteEntity = async id => {
  return await axios.delete(`${url}/${id}`);
}