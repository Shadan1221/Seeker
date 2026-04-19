import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { getAllCareers, getCareerById, getCollegesByCareer, compareCareers, getExamsByCareer, getSalaryByCareer } from '../controllers/careers.controller.js'

const router = Router()

const compareLimit = rateLimit({
  windowMs: 10 * 60 * 1000,  // 10 minutes
  max: 10,                    // 10 comparisons per 10 min per IP
  message: { error: 'Too many comparisons. Please wait a moment.' }
})

router.get('/', getAllCareers)
router.get('/:id', getCareerById)
router.get('/:id/colleges', getCollegesByCareer)
router.get('/:id/exams', getExamsByCareer)
router.get('/:id/salary', getSalaryByCareer)
router.post('/compare', compareLimit, compareCareers)

export default router