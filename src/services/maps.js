import axios from 'axios';

// restricted to my localhost IP

export const getPostcodeFromLocation = async latlong => {
  return await axios.get(`https://api.capilano-demo.com/api/address?latlong=${latlong}`);
}