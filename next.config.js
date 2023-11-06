/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["161.97.142.215", "localhost"],
  },
  // experimental: {
  //   appDir: true,
  //   // optimizeCss: true,
  // },
  output: "standalone",
};

module.exports = nextConfig;
