import { config } from '@/config'
import { logger } from '@/utils/logger'
import { connectDatabase } from '@/config/database'
import { connectRedis } from '@/config/redis'
import { server } from './app'

async function startServer() {
  try {
    // Connect to database
    await connectDatabase()
    logger.info('✅ Database connected successfully')

    // Connect to Redis
    await connectRedis()
    logger.info('✅ Redis connected successfully')

    // Start server
    server.listen(config.port, () => {
      logger.info(`🚀 Server running on port ${config.port}`)
      logger.info(`📱 Environment: ${config.env}`)
      logger.info(`🌐 Frontend URL: ${config.frontend.url}`)
    })

  } catch (error) {
    logger.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  logger.error('Unhandled Promise Rejection:', err)
  server.close(() => {
    process.exit(1)
  })
})

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.error('Uncaught Exception:', err)
  process.exit(1)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully')
  server.close(() => {
    logger.info('Process terminated')
    process.exit(0)
  })
})

startServer()
