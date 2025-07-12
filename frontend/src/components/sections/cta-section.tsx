import React from 'react'
import Link from 'next/link'
import { ArrowRight, Rocket, Shield, Zap } from 'lucide-react'

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-violet-500/5 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20h20v20H20V20zm-20 0h20v20H0V20z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main CTA Content */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Ready to Shape the
              <span className="bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                {' '}Future of Finance?
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed">
              Join thousands of users who are already experiencing true financial freedom 
              with privacy-first DeFi, AI governance, and community-driven innovation.
            </p>

            {/* Feature Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: Shield,
                  title: 'Complete Privacy',
                  description: 'Monero-level anonymity for all transactions'
                },
                {
                  icon: Zap,
                  title: 'AI-Powered',
                  description: 'Intelligent automation for optimal returns'
                },
                {
                  icon: Rocket,
                  title: 'Community First',
                  description: 'Governed by the people, for the people'
                }
              ].map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4">
                      <IconComponent className="w-8 h-8 text-purple-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/app/dashboard"
                className="group px-10 py-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-violet-700 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <span>Launch XMRT App</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                href="/whitepaper"
                className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                Read Whitepaper
              </Link>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="border-t border-white/10 pt-12">
            <p className="text-gray-400 text-sm mb-8">
              Trusted by leading organizations and backed by cutting-edge technology
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {[
                { value: '99.9%', label: 'Uptime' },
                { value: '$2.4M+', label: 'TVL' },
                { value: '12.5K+', label: 'Users' },
                { value: '24/7', label: 'Support' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-12 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-3 mb-3">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-semibold">Audited & Secure</span>
            </div>
            <p className="text-gray-300 text-sm">
              Smart contracts audited by leading security firms. Your funds are protected by 
              multi-signature wallets and battle-tested protocols.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
