# XMRT Ecosystem V3 API Documentation

## Overview
The XMRT V3 API provides comprehensive endpoints for interacting with the decentralized ecosystem.

## Base URL
- Development: `http://localhost:8000/api`
- Production: `https://api.xmrt.io/api`

## Authentication
All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/refresh` - Refresh JWT token
- `POST /auth/logout` - User logout

### DAO Operations
- `GET /dao/proposals` - List all proposals
- `POST /dao/proposals` - Create new proposal
- `GET /dao/proposals/:id` - Get proposal details
- `POST /dao/vote` - Vote on proposal
- `GET /dao/votes/:proposalId` - Get votes for proposal

### Treasury Management
- `GET /treasury/balance` - Get treasury balance
- `GET /treasury/allocations` - Get fund allocations
- `POST /treasury/transfer` - Execute transfer
- `GET /treasury/history` - Transaction history

### AI Governance
- `GET /ai/agents/status` - Get AI agent status
- `POST /ai/analyze` - Request AI analysis
- `GET /ai/decisions` - AI decision history
- `GET /ai/recommendations/:proposalId` - Get AI recommendation

### Blockchain Integration
- `GET /blockchain/status` - Blockchain connection status
- `POST /blockchain/transaction` - Submit transaction
- `GET /blockchain/balance/:address` - Get address balance

## Error Responses
All errors follow this format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Rate Limits
- 100 requests per 15 minutes per IP
- Higher limits for authenticated users
