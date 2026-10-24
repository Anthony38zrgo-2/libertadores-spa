import { writeFile } from "node:fs/promises";

const siteUrl = (process.env.VITE_SITE_URL || "").trim().replace(/\/$/, "");

if (!siteUrl) {
  console.log("VITE_SITE_URL no está definido: no se genera sitemap.xml.");
  process.exit(0);
}

if (!/^https:\/\//.test(siteUrl)) {
  console.error("VITE_SITE_URL debe ser una URL https absoluta.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;

await writeFile("public/sitemap.xml", xml, "utf8");
console.log(`✓ public/sitemap.xml generado para ${siteUrl}`);
