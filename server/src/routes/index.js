import { Router } from 'express'
import careersRouter from './careers.routes.js'
import quizRouter from './quiz.routes.js'
import chatRouter from './chat.routes.js'
import streamsRouter from './streams.routes.js'

const router = Router()

router.use('/careers', careersRouter)
router.use('/quiz', quizRouter)
router.use('/chat', chatRouter)
router.use('/streams', streamsRouter)

export default router