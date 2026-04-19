import apiClient from './client.js'

export const careersApi = {
  getAll: (params = {}) => apiClient.get('/careers', { params }).then((r) => r.data),
  getById: (id) => apiClient.get(`/careers/${id}`).then((r) => r.data.career),
  getColleges: (careerId) => apiClient.get(`/careers/${careerId}/colleges`).then((r) => r.data),
  getExams: (careerId) => apiClient.get(`/careers/${careerId}/exams`).then((r) => r.data),
  getSalary: (careerId) => apiClient.get(`/careers/${careerId}/salary`).then((r) => r.data),
  getRecommended: (ids) => apiClient.get('/careers', { params: { ids: ids.join(',') } }).then((r) => r.data),
  getStreams: () => apiClient.get('/streams').then((r) => r.data),
  compare: (careerAId, careerBId) => apiClient.post('/careers/compare', { careerAId, careerBId }).then((r) => r.data),
}

export const compareCareers = (careerAId, careerBId) =>
  apiClient.post('/careers/compare', { careerAId, careerBId }).then((r) => r.data)
