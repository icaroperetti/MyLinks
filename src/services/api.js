import axios from 'axios';

//key:f23ffb158e5236e07a6f110c0ec40e460a3f44c0

//base url:https://api-ssl.bitly.com/v4/

export const key = 'f23ffb158e5236e07a6f110c0ec40e460a3f44c0';

const api = axios.create({
  baseURL: 'https://api-ssl.bitly.com/v4',
  headers: {
    'Content-Type':'application/json',
    'Authorization':`Bearer ${key}`
  }
})

export default api;