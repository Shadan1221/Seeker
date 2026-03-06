import { Router } from 'express'
import { getStreams } from '../controllers/streams.controller.js'

const router = Router()

router.get('/', getStreams)

export default router