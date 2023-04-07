/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const withPWA = require("next-pwa")({
  dest: "public",
  publicExcludes: ["!robots.txt", "!sitemap.xml", "!sitemap-0.xml"],
});

module.exports = withPWA({
  images: {
    domains: ["localhost", "alinavidi.ir", "i.scdn.co"],
  },
  nextConfig,
});
