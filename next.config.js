const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  optimizeImages: false,
  optimizeCss: true,
  experimental: { 
    esmExternals: true,
    outputFileTracing: true
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      'assets.coingecko.com',
      'logos.covalenthq.com',
      'www.covalenthq.com',
      's2.coinmarketcap.com',
    ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false
    }
    return config
  },
})
// Don't delete this console log, useful to see the config in Vercel deployments
console.log('next.config.js', JSON.stringify(module.exports, null, 2))