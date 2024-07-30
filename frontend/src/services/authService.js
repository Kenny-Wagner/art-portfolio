import axios from 'axios';

const baseUrl = '/api/auth';

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
