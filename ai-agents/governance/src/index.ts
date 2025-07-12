import { OpenAI } from 'openai'
import { EventEmitter } from 'events'
import { logger } from '../shared/utils/logger'

export class GovernanceAgent extends EventEmitter {
  private openai: OpenAI
  private isActive: boolean = false

  constructor(apiKey: string) {
    super()
    this.openai = new OpenAI({ apiKey })
  }

  async start() {
    this.isActive = true
    logger.info('🤖 Governance Agent started')
    this.emit('started')
  }

  async analyzeProposal(proposalData: any) {
    try {
      const analysis = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an AI governance agent for the XMRT DAO. 
            Analyze proposals for feasibility, risk, and alignment with DAO goals.
            Provide structured recommendations.`
          },
          {
            role: 'user',
            content: `Analyze this proposal: ${JSON.stringify(proposalData)}`
          }
        ],
        max_tokens: 1000,
        temperature: 0.3
      })

      const recommendation = {
        proposalId: proposalData.id,
        recommendation: analysis.choices[0].message.content,
        confidence: 0.85,
        timestamp: new Date().toISOString()
      }

      this.emit('analysisComplete', recommendation)
      return recommendation
    } catch (error) {
      logger.error('Governance analysis failed:', error)
      throw error
    }
  }

  async stop() {
    this.isActive = false
    logger.info('🤖 Governance Agent stopped')
    this.emit('stopped')
  }
}