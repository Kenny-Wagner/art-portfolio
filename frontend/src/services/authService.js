import axios from 'axios';

const devHost = import.meta.env.VITE_BACKEND_URL || '';
const baseUrl = `${devHost}/api/auth`;

const register = (username, password) => {
  return axios.post(baseUrl + '/register', { username, password });
};

const login = (username, password) => {
  return axios.post(baseUrl + '/login', { username, password }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

export default {register, login };
