import { CAREERS } from '../data/careers.js'
import { COLLEGES } from '../data/colleges.js'
import { STREAMS } from '../data/streams.js'
import { buildComparison, getComparisonExplanation } from '../services/comparison.service.js'
import { getLiveColleges, getLiveSalary } from '../services/dataApi.service.js'

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
