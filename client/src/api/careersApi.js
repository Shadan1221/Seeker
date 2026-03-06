import apiClient from './client.js'

export const careersApi = {
  getAll: (params = {}) => apiClient.get('/careers', { params }).then((r) => r.data),
  getById: (id) => apiClient.get(`/careers/${id}`).then((r) => r.data.career),
  getColleges: (careerId) => apiClient.get(`/careers/${careerId}/colleges`).then((r) => r.data.colleges),
  getRecommended: (ids) => apiClient.get('/careers', { params: { ids: ids.join(',') } }).then((r) => r.data),
  getStreams: () => apiClient.get('/streams').then((r) => r.data),
}
