import { useQuery } from '@tanstack/react-query'
import { careersApi } from '../api/careersApi.js'

export function useCareers(params = {}) {
  return useQuery({ queryKey: ['careers', params], queryFn: () => careersApi.getAll(params) })
}

export function useCareer(id) {
  return useQuery({ queryKey: ['career', id], queryFn: () => careersApi.getById(id), enabled: !!id })
}

export function useRecommendedCareers(ids) {
  return useQuery({
    queryKey: ['careers', 'recommended', ids],
    queryFn: () => careersApi.getRecommended(ids),
    enabled: Array.isArray(ids) && ids.length > 0,
  })
}

export function useColleges(careerId) {
  return useQuery({ queryKey: ['colleges', careerId], queryFn: () => careersApi.getColleges(careerId), enabled: !!careerId })
}

export function useStreams() {
  return useQuery({ queryKey: ['streams'], queryFn: () => careersApi.getStreams() })
}