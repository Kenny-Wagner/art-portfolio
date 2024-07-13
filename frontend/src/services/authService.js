import axios from 'axios';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/auth/`;

const isAdmin = () => {
  return JSON.parse(localStorage.getItem('user')).isAdmin;
}

const register = (username, password) => {
  return axios.post(API_URL + 'register', { username, password });
};

const login = (username, password) => {
  return axios.post(API_URL + 'login', { username, password }).then(response => {
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem('user');
};

export default { register, login, logout, isAdmin };
