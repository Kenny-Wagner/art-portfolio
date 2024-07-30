import axios from 'axios';

const baseUrl = '/api/art/';

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

export default { getArt, createArt, updateArt, deleteArt };
