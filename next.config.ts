import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sheen-bot-user-avatar-uploads.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  /* redirect options for SEO improvement */
  async redirects() {
    return [
      {
        source: '/manual/:path*',
        destination: '/sheenbotInfinity/manual/:path*',
        permanent: true, // true 表示返回 308 永久重定向
      },
      {
        source: '/enrollment/:path*',
        destination: '/academy/enrollment/:path*',
        permanent: true, // true 表示返回 308 永久重定向
      },
    ];
  },

};
export default nextConfig;