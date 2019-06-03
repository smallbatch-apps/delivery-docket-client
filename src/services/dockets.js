import axios from 'axios';

const docketUrl = 'https://localhost:3050/api/dockets';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const getAll = async () => {
  return await axios.get(docketUrl);
}

export const getOne = async id => {
  return await axios.get(`${docketUrl}/${id}`);
}

export const createDocket = async docket => {
  return await axios.post(docketUrl, {docket});
}

export const modifyDocket = async (id, docket) => {
  return await axios.patch(`${docketUrl}/${id}`, {docket});
}

export const addDeclarationToDocket = async (id, declaration) => {
  return await axios.patch(`${docketUrl}/${id}`, {docket: {declaration}});
}