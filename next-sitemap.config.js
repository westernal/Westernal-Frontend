/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://www.westernal.net/",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/likes" },
      { userAgent: "*", disallow: "/user/search" },
      { userAgent: "*", disallow: "/user/notifications" },
      { userAgent: "*", disallow: "/post/edit" },
      { userAgent: "*", disallow: "/post/new" },
      { userAgent: "*", disallow: "/home" },
      { userAgent: "*", disallow: "/comments" },
      { userAgent: "*", allow: "/" },
    ],
    additionalSitemaps: ["https://www.westernal.net/server-sitemap.xml"],
  },
  exclude: [
    "/likes",
    "/user/search",
    "/user/chats",
    "/user/chats/*",
    "/user/notifications",
    "/post/edit",
    "/post/new",
    "/home",
    "/comments",
    "/server-sitemap.xml",
  ],
};
