import 'dotenv/config'

function requireEnv(key) {
  const val = process.env[key]
  if (!val) {
    console.error(`FATAL: Missing required environment variable: ${key}`)
    process.exit(1)
  }
  return val
}

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  groqApiKey: requireEnv('GROQ_API_KEY'),
  allowedOrigins: (process.env.ALLOWED_ORIGINS || 'http://localhost:5173').split(',').map((s) => s.trim()),
  isDev: process.env.NODE_ENV !== 'production',
}
