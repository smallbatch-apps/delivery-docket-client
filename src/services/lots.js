import axios from 'axios';

const lotUrl = 'https://localhost:3050/api/dockets/%docketId%/lots';

axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`;

export const addLotToDocket = async (docketId, lot) => {
  const lotUrlComplete = lotUrl.replace('%docketId%', docketId);
  return await axios.post(lotUrlComplete, {lot});
}