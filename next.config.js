/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  publicExcludes: ["!robots.txt", "!sitemap.xml", "!sitemap-0.xml"],
  buildExcludes: [/middleware-manifest.json$/],
  runtimeCaching,
});

module.exports = withPWA({
  images: {
    domains: ["localhost", "alinavidi.ir", "i.scdn.co"],
  },
  nextConfig,
});
