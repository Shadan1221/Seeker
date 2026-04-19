import { CAREERS } from '../data/careers.js'
import { COLLEGES } from '../data/colleges.js'
import { STREAMS } from '../data/streams.js'
import { buildComparison, getComparisonExplanation } from '../services/comparison.service.js'
import { getLiveColleges, getLiveSalary, getLiveExamsForCareer } from '../services/dataApi.service.js'

export function getAllCareers(req, res) {
  const { category, stream, ids } = req.query
  let result = [...CAREERS]

  if (ids) {
    const idList = ids.split(',').map((s) => s.trim())
    result = result.filter((c) => idList.includes(c.id))
  }

  if (category) {
    result = result.filter((c) => c.category.toLowerCase().includes(category.toLowerCase()))
  }

  if (stream) {
    const streamData = STREAMS.find((s) => s.id === stream)
    if (streamData) result = result.filter((c) => streamData.careers.includes(c.id))
  }

  res.json({ careers: result, total: result.length })
}

export function getCareerById(req, res, next) {
  const career = CAREERS.find((c) => c.id === req.params.id)
  if (!career) {
    const err = new Error(`Career not found: ${req.params.id}`)
    err.status = 404
    return next(err)
  }

  return res.json({ career })
}

export async function compareCareers(req, res, next) {
  try {
    const { careerAId, careerBId } = req.body

    const careerA = CAREERS.find(c => c.id === careerAId)
    const careerB = CAREERS.find(c => c.id === careerBId)

    if (!careerA || !careerB) {
      return res.status(404).json({ error: 'One or both careers not found' })
    }

    // Build structured comparison from existing career data
    const comparison = buildComparison(careerA, careerB)

    // Get AI explanation
    const aiExplanation = await getComparisonExplanation(careerA, careerB, comparison)

    res.json({ careerA, careerB, comparison, aiExplanation })
  } catch (err) {
    next(err)
  }
}

export async function getCollegesByCareer(req, res) {
  const careerId = req.params.id

  // Try live data first (from FastAPI → Supabase intelligence tables)
  const liveData = await getLiveColleges(careerId)

  if (liveData && liveData.colleges && liveData.colleges.length > 0) {
    return res.json({
      colleges: liveData.colleges,
      careerId,
      dataSource: 'live',
      lastUpdated: liveData.colleges[0]?.last_scraped_at || null,
    })
  }

  // Fallback to static data — always works even if pipeline has not run yet
  const staticColleges = COLLEGES[careerId] || []
  return res.json({
    colleges: staticColleges,
    careerId,
    dataSource: 'static',
    lastUpdated: null,
  })
}

export async function getExamsByCareer(req, res) {
  const careerId = req.params.id

  // Try live exam data from FastAPI → Supabase
  const liveData = await getLiveExamsForCareer(careerId)
  if (liveData && liveData.exams && liveData.exams.length > 0) {
    return res.json({
      exams: liveData.exams,
      careerId,
      dataSource: 'live',
      lastUpdated: liveData.exams[0]?.last_scraped_at || null,
    })
  }

  // Fallback: derive exam names from static career data
  const career = CAREERS.find(c => c.id === careerId)
  const staticExams = career?.education?.entrance_exams?.map(name => ({ exam_name: name })) || []
  return res.json({
    exams: staticExams,
    careerId,
    dataSource: 'static',
    lastUpdated: null,
  })
}

export async function getSalaryByCareer(req, res) {
  const careerId = req.params.id

  // Try live salary data from FastAPI → Supabase
  const liveData = await getLiveSalary(careerId)
  if (liveData && liveData.salary_tiers && liveData.salary_tiers.length > 0) {
    return res.json({
      salary_tiers: liveData.salary_tiers,
      careerId,
      dataSource: 'live',
      lastUpdated: liveData.salary_tiers[0]?.last_verified || null,
    })
  }

  // Fallback: return static salary strings from careers.js
  const career = CAREERS.find(c => c.id === careerId)
  const staticSalary = career?.salary || {}
  return res.json({
    salary_tiers: null,
    staticSalary,
    careerId,
    dataSource: 'static',
    lastUpdated: null,
  })
}
