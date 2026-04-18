import { useQuery } from '@tanstack/react-query'
import { careersApi } from '../api/careersApi.js'

// Career data is static — keep it fresh for 10 min, in memory for 30 min
const CAREER_CACHE = {
  staleTime: 10 * 60 * 1000,   // 10 minutes
  gcTime: 30 * 60 * 1000,       // 30 minutes
}

export function useCareers(params = {}) {
  return useQuery({ queryKey: ['careers', params], queryFn: () => careersApi.getAll(params), ...CAREER_CACHE })
}

export function useCareer(id) {
  return useQuery({ queryKey: ['career', id], queryFn: () => careersApi.getById(id), enabled: !!id, ...CAREER_CACHE })
}

export function useRecommendedCareers(ids) {
  return useQuery({
    queryKey: ['careers', 'recommended', ids],
    queryFn: () => careersApi.getRecommended(ids),
    enabled: Array.isArray(ids) && ids.length > 0,
    ...CAREER_CACHE
  })
}

export function useColleges(careerId) {
  return useQuery({ queryKey: ['colleges', careerId], queryFn: () => careersApi.getColleges(careerId), enabled: !!careerId, staleTime: 5 * 60 * 1000 })
}

export function useStreams() {
  return useQuery({ queryKey: ['streams'], queryFn: () => careersApi.getStreams(), ...CAREER_CACHE })
}