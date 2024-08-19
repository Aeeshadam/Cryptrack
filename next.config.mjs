/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ["coin-images.coingecko.com"],
  },
};

export default nextConfig;
