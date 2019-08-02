import axios from 'axios';

const url = 'https://api.capilano-demo.com/api/varieties';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const getAll = async () => {
  return await axios.get(url);
}
