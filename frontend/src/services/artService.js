import axios from 'axios';

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api/art/`;
import auth from './authService'

const getArt = () => {
  return axios.get(baseUrl);
};

const createArt = (data) => {
  return axios.post(baseUrl, data, {
    headers: { 'Authorization': `Bearer ${auth.getToken()}` },
  });
};

const updateArt = (id, data) => {
  return axios.put(baseUrl + id, data, {
    headers: { 'Authorization': `Bearer ${auth.getToken()}` },
  });
};

const deleteArt = (id) => {
  return axios.delete(baseUrl + id, {
    headers: { 'Authorization': `Bearer ${auth.getToken()}` },
  });
};

export default { getArt, createArt, updateArt, deleteArt, devHost };
