import axios from 'axios';

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api/auth`;

const getToken = () => {
  return JSON.parse(localStorage.getItem('user')).token;
}

const register = (username, password) => {
  return axios.post(baseUrl + '/register', { username, password });
};

const login = async (username, password) => {
  const response = await axios.post(baseUrl + '/login', { username, password });
  if (response.data.token) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

export default {register, login, getToken };
