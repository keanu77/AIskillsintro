#!/usr/bin/env node
// Minimal static server for out/ that mimics Cloudflare Pages clean URLs
// (/skills/x → skills/x.html, unknown paths → 404.html). Used by e2e tests.

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import zlib from "node:zlib";

const ROOT = path.resolve(import.meta.dirname, "../out");
const PORT = Number(process.env.PORT ?? 4173);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
};

function resolveFile(urlPath) {
  const clean = path.normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const base = path.join(ROOT, clean);
  if (!base.startsWith(ROOT)) return null;
  const candidates = [base, `${base}.html`, path.join(base, "index.html")];
  return candidates.find((f) => fs.existsSync(f) && fs.statSync(f).isFile()) ?? null;
}

http
  .createServer((req, res) => {
    const { pathname } = new URL(req.url ?? "/", "http://localhost");
    const file = resolveFile(pathname);
    const status = file ? 200 : 404;
    const target = file ?? path.join(ROOT, "404.html");
    const type = pathname === "/opengraph-image" ? "image/png" : TYPES[path.extname(target)];
    // gzip text like Cloudflare does, so local performance runs are comparable.
    const compressible = /^(text\/|application\/(json|xml)|image\/svg)/.test(type ?? "");
    const gzip = compressible && /\bgzip\b/.test(req.headers["accept-encoding"] ?? "");
    res.writeHead(status, {
      "Content-Type": type ?? "application/octet-stream",
      ...(gzip && { "Content-Encoding": "gzip", Vary: "Accept-Encoding" }),
    });
    const stream = fs.createReadStream(target);
    (gzip ? stream.pipe(zlib.createGzip()) : stream).pipe(res);
  })
  .listen(PORT, () => console.log(`serving ${ROOT} on http://localhost:${PORT}`));
