import { config } from '../config/env.js'

const DATA_API_HEADERS = {
  'X-Internal-Key': config.dataApiKey,
  'Content-Type': 'application/json',
}

/**
 * Fetch data from the internal FastAPI data intelligence service.
 * Returns null on any error — callers MUST handle fallback to static data.
 */
async function fetchFromDataApi(path) {
  try {
    const response = await fetch(`${config.dataApiUrl}${path}`, {
      headers: DATA_API_HEADERS,
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    if (!response.ok) throw new Error(`Data API ${response.status}`)
    return await response.json()
  } catch (err) {
    console.warn(`[DataAPI] ${path} failed: ${err.message} — using fallback`)
    return null
  }
}

export async function getLiveColleges(careerId) {
  return fetchFromDataApi(`/colleges/${careerId}`)
}

export async function getLiveSalary(careerId) {
  return fetchFromDataApi(`/salaries/${careerId}`)
}

export async function getLiveExams(examSlug) {
  return fetchFromDataApi(`/exams/${examSlug}`)
}

export async function getLiveExamsForCareer(careerId) {
  return fetchFromDataApi(`/exams/career/${careerId}`)
}
