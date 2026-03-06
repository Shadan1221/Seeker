import { Router } from 'express'
import { z } from 'zod'
import { getQuiz, scoreQuiz } from '../controllers/quiz.controller.js'
import { validateBody } from '../middleware/validateBody.js'

const scoreSchema = z.object({
  answers: z.record(z.string(), z.string()),
})

const router = Router()

router.get('/', getQuiz)
router.post('/score', validateBody(scoreSchema), scoreQuiz)

export default router