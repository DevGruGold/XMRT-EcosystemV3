import React from 'react'
import { Shield, Brain, Users, Zap, Lock, Globe } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: 'Privacy-First Architecture',
      description: 'Built on Monero's proven privacy technology, ensuring complete transaction anonymity and user protection.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Brain,
      title: 'AI Governance',
      description: 'Autonomous AI agents make intelligent decisions for treasury management, proposals, and ecosystem optimization.',
      color: 'from-purple-500 to-violet-500'
    },
    {
      icon: Users,
      title: 'DAO Framework',
      description: 'Decentralized autonomous organization with community-driven governance and transparent decision-making.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized for speed and scalability with advanced caching, efficient algorithms, and modern architecture.',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Lock,
      title: 'Multi-Signature Security',
      description: 'Enterprise-grade security with multi-signature wallets, smart contract audits, and penetration testing.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Globe,
      title: 'Cross-Chain Compatible',
      description: 'Seamless integration across multiple blockchains with bridges and interoperability protocols.',
      color: 'from-indigo-500 to-purple-500'
    }
  ]

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience the next generation of decentralized finance with cutting-edge technology,
            uncompromising privacy, and intelligent automation.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
              >
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-purple-600 dark:text-purple-400 font-semibold">
            <span>Ready to experience the future?</span>
            <Zap className="w-5 h-5" />
          </div>
          <div className="mt-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
