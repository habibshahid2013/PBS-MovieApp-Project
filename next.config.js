/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'build',
  publicRuntimeConfig: {
    basePath: process.env.NODE_ENV === 'production' ? '/final-pbs-movie-app' : '',
  },
};

module.exports = nextConfig;