/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "i.dummyjson.com",
      "lh3.googleusercontent.com",
      "i.ibb.co",
      "firebasestorage.googleapis.com",
    ],
  },
};

module.exports = nextConfig;
