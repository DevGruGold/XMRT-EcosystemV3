# XMRT V3 Deployment Guide

## Prerequisites
- Node.js >= 18.0.0
- Docker & Docker Compose
- PostgreSQL database
- Redis instance
- Ethereum node access (Infura/Alchemy)

## Environment Setup

1. **Clone the repository:**
```bash
git clone https://github.com/DevGruGold/XMRT-EcosystemV3.git
cd XMRT-EcosystemV3
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment configuration:**
```bash
cp .env.example .env
# Edit .env with your configuration
```

## Development Deployment

1. **Start services:**
```bash
docker-compose up -d
```

2. **Run migrations:**
```bash
cd backend && npm run migrate
```

3. **Start development servers:**
```bash
npm run dev
```

## Production Deployment

1. **Build applications:**
```bash
npm run build
```

2. **Deploy smart contracts:**
```bash
cd contracts && npm run deploy:mainnet
```

3. **Start production services:**
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Monitoring
- Health check: `/health`
- Metrics: `/metrics`
- Logs: Check Docker logs or Winston log files

## Security Checklist
- [ ] Environment variables secured
- [ ] SSL certificates configured
- [ ] Firewall rules applied
- [ ] Database access restricted
- [ ] Smart contracts audited
