import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/art`;

const getArtPieces = () => {
  return axios.get(API_URL);
};

const createArtPiece = (data, token) => {
  return axios.post(API_URL, data, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
};

const updateArtPiece = (id, data, token) => {
  return axios.put(API_URL + id, data, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
};

const deleteArtPiece = (id, token) => {
  return axios.delete(API_URL + id, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
};

export default { getArtPieces, createArtPiece, updateArtPiece, deleteArtPiece };
