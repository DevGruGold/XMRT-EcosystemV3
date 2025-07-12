import React from 'react'
import { TrendingUp, Users, DollarSign, Zap, Shield, Globe } from 'lucide-react'

export function StatsSection() {
  const stats = [
    {
      icon: DollarSign,
      value: '$2.4M+',
      label: 'Total Value Locked',
      description: 'Assets secured in XMRT ecosystem',
      color: 'from-green-500 to-emerald-500',
      change: '+24.5%'
    },
    {
      icon: Users,
      value: '12.5K+',
      label: 'Active Users',
      description: 'Community members worldwide',
      color: 'from-blue-500 to-cyan-500',
      change: '+18.2%'
    },
    {
      icon: TrendingUp,
      value: '450K+',
      label: 'Transactions',
      description: 'Private transactions processed',
      color: 'from-purple-500 to-violet-500',
      change: '+32.1%'
    },
    {
      icon: Zap,
      value: '1.2K+',
      label: 'AI Decisions',
      description: 'Autonomous governance actions',
      color: 'from-yellow-500 to-orange-500',
      change: '+45.8%'
    },
    {
      icon: Shield,
      value: '99.9%',
      label: 'Uptime',
      description: 'Network reliability',
      color: 'from-red-500 to-pink-500',
      change: '+0.1%'
    },
    {
      icon: Globe,
      value: '15+',
      label: 'Supported Chains',
      description: 'Cross-chain integrations',
      color: 'from-indigo-500 to-purple-500',
      change: '+25.0%'
    }
  ]

  return (
    <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-violet-600" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ecosystem by the Numbers
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Real-time metrics showcasing the growth and impact of the XMRT ecosystem.
            Our community-driven platform continues to break new ground in decentralized finance.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={index}
                className="group relative bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl border border-gray-200 dark:border-gray-700"
              >
                {/* Icon */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>

                {/* Value and Change */}
                <div className="flex items-end justify-between mb-2">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="flex items-center text-green-500 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    {stat.change}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {stat.description}
                </p>

                {/* Progress Bar */}
                <div className="mt-4 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${stat.color} rounded-full transition-all duration-1000 ease-out group-hover:w-full`}
                    style={{ width: '70%' }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-violet-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Join the Revolution
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Be part of the fastest-growing privacy-focused DeFi ecosystem. 
              Experience true financial freedom with XMRT.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-300">
                Start Trading
              </button>
              <button className="px-8 py-3 bg-purple-700 text-white font-semibold rounded-lg hover:bg-purple-800 transition-colors duration-300 border border-purple-500">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
