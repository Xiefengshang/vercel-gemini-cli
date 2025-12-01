/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    runtime: 'edge',
  },
  // 确保 API 路由不被静态化
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};
