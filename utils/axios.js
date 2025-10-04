import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://easeyourappointmentbackend.onrender.com', //'http://localhost:3000/'
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user?.jwtToken) {
        config.headers['Authorization'] = `Bearer ${user.jwtToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance; 