import axios from 'axios';

export default () => {
  console.log("on in build client");
  return axios.create({
    baseUrl: 'http://localhost:3000'
  });



  // if (typeof window === 'undefined') {
  //   // We are on the server
    
  //   console.log("on server............");
  //   return axios.create({
  //     baseURL:'/',
  //     host: 'http://localhost:3000',
  //     headers: req.headers,
  //   });
  // } else {
  //   // We must be on the browser
  //   console.log("on client............");
  //   return axios.create({
  //     baseUrl: 'http://localhost:3000'
  //   });
  // }
};