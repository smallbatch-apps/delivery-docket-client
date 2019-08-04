import axios from 'axios';
import {API_LOCATION} from './interception';

const url = `${API_LOCATION}/varieties`;

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const getAll = async () => {
  return await axios.get(url);
}
