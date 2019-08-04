import axios from 'axios';
import {API_LOCATION} from './interception';

const loginUrl = `${API_LOCATION}/auth/attempt`;

export const login = async (beekeeper_id, password) => {
  return await axios.post(loginUrl, { user: {beekeeper_id, password}});
}