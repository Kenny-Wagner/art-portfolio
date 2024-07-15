import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/art/`;

const getToken = () => {
  return JSON.parse(localStorage.getItem('user')).token;
}

const getArt = () => {
  return axios.get(API_URL);
};

const createArt = (data) => {
  return axios.post(API_URL, data, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

const updateArt = (id, data) => {
  return axios.put(API_URL + id, data, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

const deleteArt = (id) => {
  return axios.delete(API_URL + id, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

export default { getArt, createArt, updateArt, deleteArt };
