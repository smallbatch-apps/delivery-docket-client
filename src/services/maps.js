import axios from 'axios';
import {API_LOCATION} from './interception';

export const getPostcodeFromLocation = async latlong => {
  return await axios.get(`${API_LOCATION}/address?latlong=${latlong}`);
}