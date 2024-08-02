import axios from 'axios';

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api/art/`;

const getToken = () => {
  return JSON.parse(localStorage.getItem('user')).token;
}

const getArt = () => {
  return axios.get(baseUrl);
};

const createArt = (data) => {
  return axios.post(baseUrl, data, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

const updateArt = (id, data) => {
  return axios.put(baseUrl + id, data, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

const deleteArt = (id) => {
  return axios.delete(baseUrl + id, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

export default { getArt, createArt, updateArt, deleteArt, devHost };
