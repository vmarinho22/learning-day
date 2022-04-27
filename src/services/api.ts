import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 3000,
});

api.interceptors.response.use(
  response => {
    return { data: response.data, status: response.status }
  },
  error => {
    console.error('API ERROR ==>', error);
    return { data: error.response.data }
  }
)

export default api;