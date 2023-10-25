/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  images: { unoptimized: true },
  reactStrictMode: false,
  images: {
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;
