  import express from 'express'
  import cors from 'cors'
  import helmet from 'helmet'
  import morgan from 'morgan'
  import rateLimit from 'express-rate-limit'
  import path from 'path'
  import { fileURLToPath } from 'url'
  import { config } from './config/env.js'
  import router from './routes/index.js'
  import { errorHandler } from './middleware/errorHandler.js'

  const app = express()
  const __dirname = path.dirname(fileURLToPath(import.meta.url))
  const clientBuildPath = path.resolve(__dirname, '../../client/dist')

  app.use(helmet())
  app.use(
    cors(
      config.isDev
        ? { origin: true, methods: ['GET', 'POST'], allowedHeaders: ['Content-Type'] }
        : {
            origin: (origin, cb) => {
              if (!origin || config.allowedOrigins.includes(origin)) return cb(null, true)
              return cb(new Error('Blocked by CORS policy'))
            },
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type'],
          }
    )
  )

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
      message: { error: 'Too many requests. Please slow down.' },
    })
  )

  app.use(express.json({ limit: '10kb' }))
  app.use(morgan(config.isDev ? 'dev' : 'combined'))

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', env: config.nodeEnv, timestamp: new Date().toISOString() })
  })

  app.use('/api', router)

  if (config.nodeEnv === 'production') {
    app.use(express.static(clientBuildPath))
    app.get('*', (req, res) => {
      if (req.path.startsWith('/api')) return res.status(404).json({ error: 'Route not found' })
      res.sendFile(path.join(clientBuildPath, 'index.html'))
    })
  }

  app.use((req, res) => {
    res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` })
  })

  app.use(errorHandler)

  app.listen(config.port, () => {
    console.log(`Seeker server v2 running on port ${config.port}`)
    console.log(`Environment: ${config.nodeEnv}`)
    console.log(`Routes: /api/quiz/interpret-answer is registered`)
  })
