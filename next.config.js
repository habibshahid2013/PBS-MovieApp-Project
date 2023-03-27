/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  exportPathMap: async function (defaultPathMap) {
    return {
   
    }
  }
}

module.exports = nextConfig