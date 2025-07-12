import Link from 'next/link'
import { 
  TwitterIcon, 
  GitHubIcon, 
  DiscordIcon, 
  TelegramIcon 
} from '@/components/ui/icons'

const footerNavigation = {
  main: [
    { name: 'About', href: '/about' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' },
  ],
  ecosystem: [
    { name: 'DAO', href: '/dao' },
    { name: 'Treasury', href: '/treasury' },
    { name: 'Governance', href: '/governance' },
    { name: 'Staking', href: '/staking' },
    { name: 'Bridge', href: '/bridge' },
  ],
  developers: [
    { name: 'API Documentation', href: '/docs/api' },
    { name: 'SDK', href: '/docs/sdk' },
    { name: 'Smart Contracts', href: '/docs/contracts' },
    { name: 'GitHub', href: 'https://github.com/DevGruGold/XMRT-EcosystemV3' },
    { name: 'Bug Bounty', href: '/security' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Disclaimer', href: '/disclaimer' },
  ],
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/XMRT_io',
      icon: TwitterIcon,
    },
    {
      name: 'GitHub',
      href: 'https://github.com/DevGruGold/XMRT-EcosystemV3',
      icon: GitHubIcon,
    },
    {
      name: 'Discord',
      href: 'https://discord.gg/xmrt',
      icon: DiscordIcon,
    },
    {
      name: 'Telegram',
      href: 'https://t.me/xmrt_official',
      icon: TelegramIcon,
    },
  ],
}

export function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-dark-surface border-t border-neutral-200 dark:border-dark-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 lg:py-16">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            {/* Brand Section */}
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center space-x-2">
                <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">X</span>
                </div>
                <span className="text-2xl font-bold text-gradient-primary">XMRT</span>
              </div>
              <p className="text-neutral-600 dark:text-neutral-400 text-base max-w-md">
                Decentralized Monero-based ecosystem with AI governance, 
                empowering the future of privacy-focused DeFi.
              </p>
              <div className="flex space-x-6">
                {footerNavigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-400 hover:text-primary-500 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Section */}
            <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.main.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">
                    Ecosystem
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.ecosystem.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">
                    Developers
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.developers.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    {footerNavigation.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-base text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 border-t border-neutral-200 dark:border-neutral-700 pt-8">
            <div className="md:flex md:items-center md:justify-between">
              <div className="flex space-x-6 md:order-2">
                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                  Built with ❤️ by the XMRT Community
                </p>
              </div>
              <p className="mt-8 text-sm text-neutral-600 dark:text-neutral-400 md:order-1 md:mt-0">
                &copy; {new Date().getFullYear()} XMRT Ecosystem. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
