import axios from 'axios';

const api = axios.create({
  baseURL: 'https://project-5yfx.onrender.com/api', // Adjust to your Django backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
