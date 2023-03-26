const withStandalone = require('@vercel/next-standalone')

const nextConfig = {
  reactStrictMode: true,
  // other Next.js config settings
}

module.exports = withStandalone(nextConfig, {
  standaloneFile: true,
  standaloneDirectory: true,
})
