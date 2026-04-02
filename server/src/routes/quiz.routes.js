import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { getQuiz, scoreQuiz, interpretCustomAnswer } from '../controllers/quiz.controller.js'

const router = Router()

const interpretLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,   // 20 custom answers per 10 minutes per IP
  message: { error: 'Too many custom answers. Please wait a moment or use the standard options.' }
})

router.get('/', getQuiz)
router.post('/score', scoreQuiz)
router.post('/interpret-answer', interpretLimit, interpretCustomAnswer)
router.post('/interpret', interpretLimit, interpretCustomAnswer)
router.post('/interpret_answer', interpretLimit, interpretCustomAnswer)

export default router