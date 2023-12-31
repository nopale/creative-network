/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'links.papareact.com' },
      { protocol: 'https', hostname: 'localhost:3000' },
      { protocol: 'https', hostname: 'creative-network-ten.vercel.app' },
      { protocol: 'https', hostname: 'platform-lookaside.fbsbx.com' },
      { protocol: 'https', hostname: 'firebasestorage.googleapis.com' },
      // 'links.papareact.com',
      // 'platform-lookaside.fbsbx.com',
      // 'firebasestorage.googleapis.com'
    ],
  },
}

module.exports = nextConfig
