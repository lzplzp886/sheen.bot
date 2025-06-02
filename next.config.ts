import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['sheen-bot-user-avatar-uploads.s3.eu-west-1.amazonaws.com'],
  },

  /* 访问 /manual 时重定向到 /sheenbotInfinity/manual */
  async redirects() {
    return [
      {
        source: '/manual',
        destination: '/sheenbotInfinity/manual',
        permanent: true, // true 表示返回 308 永久重定向
      },
    ];
  },

};
export default nextConfig;