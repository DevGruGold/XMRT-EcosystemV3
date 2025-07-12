import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import { createServer } from 'http'
import { Server } from 'socket.io'
import 'express-async-errors'

import { config } from '@/config'
import { logger } from '@/utils/logger'
import { errorHandler } from '@/middleware/error-handler'
import { notFoundHandler } from '@/middleware/not-found'
import { authMiddleware } from '@/middleware/auth'
import { validateRequest } from '@/middleware/validation'

// Import routes
import authRoutes from '@/routes/auth'
import userRoutes from '@/routes/user'
import daoRoutes from '@/routes/dao'
import treasuryRoutes from '@/routes/treasury'
import governanceRoutes from '@/routes/governance'
import aiRoutes from '@/routes/ai'
import blockchainRoutes from '@/routes/blockchain'
import moneroRoutes from '@/routes/monero'
import webhookRoutes from '@/routes/webhooks'

const app = express()
const server = createServer(app)

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: config.frontend.url,
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1)

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "wss:", "https:"],
      fontSrc: ["'self'"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
    },
  },
  crossOriginEmbedderPolicy: false,
}))

// CORS configuration
app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = config.cors.allowedOrigins
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: config.rateLimit.max, // limit each IP to 100 requests per windowMs
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use('/api/', limiter)

// Body parsing middleware
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Compression middleware
app.use(compression())

// Logging middleware
if (config.env !== 'test') {
  app.use(morgan('combined', {
    stream: {
      write: (message: string) => logger.info(message.trim()),
    },
  }))
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: config.env,
    version: process.env.npm_package_version || '1.0.0',
  })
})

// API routes
app.use('/api/auth', authRoutes)
app.use('/api/users', authMiddleware, userRoutes)
app.use('/api/dao', authMiddleware, daoRoutes)
app.use('/api/treasury', authMiddleware, treasuryRoutes)
app.use('/api/governance', authMiddleware, governanceRoutes)
app.use('/api/ai', authMiddleware, aiRoutes)
app.use('/api/blockchain', authMiddleware, blockchainRoutes)
app.use('/api/monero', authMiddleware, moneroRoutes)
app.use('/api/webhooks', webhookRoutes)

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`)

  socket.on('join-room', (room: string) => {
    socket.join(room)
    logger.info(`Client ${socket.id} joined room: ${room}`)
  })

  socket.on('leave-room', (room: string) => {
    socket.leave(room)
    logger.info(`Client ${socket.id} left room: ${room}`)
  })

  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`)
  })
})

// Make io available to routes
app.set('io', io)

// Error handling middleware (must be last)
app.use(notFoundHandler)
app.use(errorHandler)

export { app, server, io }
