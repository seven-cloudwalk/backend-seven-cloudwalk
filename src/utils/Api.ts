const axios = require('axios');

const api = axios.create({
  baseURL: process.env.FILEEXCEL_URL,
})

export default api;