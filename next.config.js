/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  images: {
    loader: 'imgix',
    path: '',
  },
}
module.exports = nextConfig