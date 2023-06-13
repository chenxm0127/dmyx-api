import axios from 'axios';

const baseUrl = 'https://livedata.pwnk.fun/api/';
//const baseUrl = 'http://localhost:3000/api/'
const apiRequest = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiRequest;
