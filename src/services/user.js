import axios from 'axios';

const api = 'https://localhost:3050/api/users';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const createUser = async user => {
  return await axios.post(api, {user}); 
}