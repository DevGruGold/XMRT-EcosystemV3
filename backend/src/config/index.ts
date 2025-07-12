import dotenv from 'dotenv'
import path from 'path'

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') })

interface Config {
  env: string
  port: number
  frontend: {
    url: string
  }
  database: {
    url: string
  }
  redis: {
    url: string
    password?: string
  }
  jwt: {
    secret: string
    expiresIn: string
    refreshSecret: string
  }
  cors: {
    allowedOrigins: string[]
  }
  rateLimit: {
    max: number
  }
  blockchain: {
    rpcUrl: string
    chainId: number
    privateKey: string
  }
  monero: {
    rpcUrl: string
    walletRpcUrl: string
    testnet: boolean
  }
  ai: {
    openaiApiKey: string
    anthropicApiKey: string
    model: string
    maxTokens: number
    temperature: number
  }
  email: {
    sendgridApiKey: string
    fromEmail: string
  }
  sms: {
    twilioAccountSid: string
    twilioAuthToken: string
    fromNumber: string
  }
  aws: {
    accessKeyId: string
    secretAccessKey: string
    region: string
    s3Bucket: string
  }
  logging: {
    level: string
  }
  sentry: {
    dsn: string
  }
}

const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '8000', 10),

  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:3000',
  },

  database: {
    url: process.env.DATABASE_URL || 'postgresql://xmrt_user:xmrt_password@localhost:5432/xmrt_db',
  },

  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    password: process.env.REDIS_PASSWORD,
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret',
  },

  cors: {
    allowedOrigins: process.env.CORS_ORIGINS?.split(',') || [
      'http://localhost:3000',
      'https://xmrt.io',
      'https://app.xmrt.io',
    ],
  },

  rateLimit: {
    max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10),
  },

  blockchain: {
    rpcUrl: process.env.BLOCKCHAIN_RPC_URL || 'http://localhost:8545',
    chainId: parseInt(process.env.CHAIN_ID || '31337', 10),
    privateKey: process.env.PRIVATE_KEY || '',
  },

  monero: {
    rpcUrl: process.env.MONERO_RPC_URL || 'http://localhost:18081',
    walletRpcUrl: process.env.MONERO_WALLET_RPC_URL || 'http://localhost:18082',
    testnet: process.env.MONERO_TESTNET === 'true',
  },

  ai: {
    openaiApiKey: process.env.AI_API_KEY || '',
    anthropicApiKey: process.env.ANTHROPIC_API_KEY || '',
    model: process.env.AI_MODEL || 'gpt-4',
    maxTokens: parseInt(process.env.AI_MAX_TOKENS || '2000', 10),
    temperature: parseFloat(process.env.AI_TEMPERATURE || '0.7'),
  },

  email: {
    sendgridApiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@xmrt.io',
  },

  sms: {
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '',
    fromNumber: process.env.TWILIO_FROM_NUMBER || '',
  },

  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    region: process.env.AWS_REGION || 'us-east-1',
    s3Bucket: process.env.AWS_S3_BUCKET || 'xmrt-storage',
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
  },

  sentry: {
    dsn: process.env.SENTRY_DSN || '',
  },
}

// Validate required environment variables
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'REFRESH_TOKEN_SECRET',
]

const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar])

if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`)
}

export { config }
