import axios from 'axios';

const API_URL = 'https://fake-server-0ie6.onrender.com';

export const contactAPI = {
  getAll: () => axios.get(`${API_URL}/contact`),
  getById: (id) => axios.get(`${API_URL}/contact/${id}`),
  create: (contact) => axios.post(`${API_URL}/contact`, contact),
  update: (id, contact) => axios.put(`${API_URL}/contact/${id}`, contact),
  delete: (id) => axios.delete(`${API_URL}/contact/${id}`)
};