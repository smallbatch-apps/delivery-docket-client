import axios from 'axios';

const loginUrl = 'https://api.capilano-demo.com/api/auth/attempt';

export const login = async (beekeeper_id, password) => {
  return await axios.post(loginUrl, { user: {beekeeper_id, password}});
}