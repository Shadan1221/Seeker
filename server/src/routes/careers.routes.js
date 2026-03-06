import { Router } from 'express'
import { getAllCareers, getCareerById, getCollegesByCareer } from '../controllers/careers.controller.js'

const router = Router()

router.get('/', getAllCareers)
router.get('/:id', getCareerById)
router.get('/:id/colleges', getCollegesByCareer)

export default router