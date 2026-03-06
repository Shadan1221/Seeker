import { CAREERS } from '../data/careers.js'
import { COLLEGES } from '../data/colleges.js'
import { STREAMS } from '../data/streams.js'

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

export function getCollegesByCareer(req, res) {
  const colleges = COLLEGES[req.params.id] || []
  return res.json({ colleges, careerId: req.params.id })
}
