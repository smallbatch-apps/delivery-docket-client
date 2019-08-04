import axios from 'axios';
import {API_LOCATION} from './interception';

const url = `${API_LOCATION}/containers`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const getAll = async () => {
  return await axios.get(url);
}

export const getOne = async id => {
  return await axios.get(`${url}/${id}`);
}

export const create = async container => {
  return await axios.post(url, {container});
}

export const modify = async (id, container) => {
  return await axios.patch(`${url}/${id}`, {container});
}

export const deleteEntity = async id => {
  return await axios.delete(`${url}/${id}`);
}