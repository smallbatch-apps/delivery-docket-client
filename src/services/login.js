import axios from 'axios';

const loginUrl = 'https://localhost:3050/api/login';

export const login = async (email, password) => {
  return await axios.post(loginUrl, {email, password});
}