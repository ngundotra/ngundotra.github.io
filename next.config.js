/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    // unoptimized: true,
    loader: "custom",
  },
}

module.exports = nextConfig
