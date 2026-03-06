import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import { z } from 'zod'
import { sendMessage } from '../controllers/chat.controller.js'
import { validateBody } from '../middleware/validateBody.js'

const chatRateLimit = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: { error: 'Too many messages. Please wait a few minutes before continuing.' },
})

const chatSchema = z.object({
  messages: z.array(z.object({ role: z.enum(['user', 'assistant']), content: z.string().min(1).max(4000) })).min(1).max(50),
  contextCareer: z.any().optional().nullable(),
})

const router = Router()

router.post('/message', chatRateLimit, validateBody(chatSchema), sendMessage)

export default router