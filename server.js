const { createServer } = require("http");
const { join } = require("path");
const { parse } = require("url");
const next = require("next");

const app = next({ dev: process.env.NODE_ENV !== "production" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;

    if (
      pathname === "/sw.js" ||
      /^\/(workbox|worker|fallback)-\w+\.js$/.test(pathname)
    ) {
      const filePath = join(__dirname, ".next", pathname);
      app.serveStatic(req, res, filePath);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, () => {
    console.log(`> Ready on http://localhost:${3000}`);
  });
});
