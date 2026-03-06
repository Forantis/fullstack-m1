import axios from 'axios';

const api = axios.create({
  baseURL: '/api'
});

const userService = {
  getAll() {
    return api.get('/users');
  },
  getById(id) {
    return api.get(`/users/${id}`);
  },
  create(data) {
    return api.post('/users', data);
  },
  update(id, data) {
    return api.put(`/users/${id}`, data);
  },
  remove(id) {
    return api.delete(`/users/${id}`);
  }
};

export default userService;
