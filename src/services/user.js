import axios from 'axios';

const api = 'https://api.capilano-demo.com/api/users';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const createUser = async user => {
  return await axios.post(api, {user}); 
}

export const getOne = async id => {
  return await axios.get(`${api}/${id}`);
}

export const modify = async (id, user) => {
  return await axios.patch(`${api}/${id}`, {user});
}

export const deleteEntity = async id => {
  return await axios.delete(`${api}/${id}`);
}