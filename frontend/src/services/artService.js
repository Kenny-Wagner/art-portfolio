import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/art/`;

const getToken = () => {
  return JSON.parse(localStorage.getItem('user')).token;
}

const getArtPieces = () => {
  return axios.get(API_URL);
};

const createArtPiece = (data) => {
  return axios.post(API_URL, data, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

const updateArtPiece = (id, data) => {
  return axios.put(API_URL + id, data, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

const deleteArtPiece = (id) => {
  return axios.delete(API_URL + id, {
    headers: { 'Authorization': `Bearer ${getToken()}` },
  });
};

export default { getArtPieces, createArtPiece, updateArtPiece, deleteArtPiece };
