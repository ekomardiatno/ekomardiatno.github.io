import type { Plugin } from "vite";
import {
  CANONICAL_ORIGIN,
  DEFAULT_OG_IMAGE,
  NOT_FOUND_SEO,
  ROBOTS_TXT,
  ROBOTS_TXT_NOINDEX,
  SEO_ROUTES,
  type SeoRoute,
} from "../src/seo/routes";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function canonicalUrl(path: string) {
  return path === "/" ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
}

function headBlock(route: SeoRoute, forceNoindex: boolean) {
  const url = canonicalUrl(route.path);
  const image = `${CANONICAL_ORIGIN}${route.image ?? DEFAULT_OG_IMAGE}`;
  const robots =
    forceNoindex || route.noindex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large";

  const tags = [
    `<title>${escapeHtml(route.title)}</title>`,
    `<meta name="description" content="${escapeHtml(route.description)}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="EMDEV" />`,
    `<meta property="og:locale" content="${route.lang === "id" ? "id_ID" : "en_US"}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(route.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(route.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
  ];

  if (route.jsonLd && !forceNoindex && !route.noindex) {
    // `</script>` cannot appear inside an inline script; `<` is the only
    // character that can terminate it early.
    const json = JSON.stringify(route.jsonLd).replace(/</g, "\\u003c");
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.map((tag) => `    ${tag}`).join("\n");
}

/** Strip the placeholder tags from the base HTML so we never emit duplicates. */
function stripBaseSeoTags(html: string) {
  return html
    .replace(/[ \t]*<title>[\s\S]*?<\/title>\s*\n?/i, "")
    .replace(/[ \t]*<meta\s+name="description"[^>]*>\s*\n?/i, "")
    .replace(/[ \t]*<meta\s+name="robots"[^>]*>\s*\n?/i, "")
    .replace(/[ \t]*<link\s+rel="canonical"[^>]*>\s*\n?/i, "");
}

function renderRoute(baseHtml: string, route: SeoRoute, forceNoindex: boolean) {
  const stripped = stripBaseSeoTags(baseHtml).replace(
    /<html\s+lang="[^"]*"/i,
    `<html lang="${route.lang}"`,
  );

  const injected = stripped.replace(
    /<\/head>/i,
    `${headBlock(route, forceNoindex)}\n  </head>`,
  );

  if (injected === stripped) {
    throw new Error(
      `[seo-html] could not find </head> in index.html while rendering ${route.path}`,
    );
  }

  return injected;
}

function sitemap(routes: SeoRoute[]) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const entries = routes
    .filter((route) => !route.noindex)
    .map(
      (route) =>
        `  <url>\n` +
        `    <loc>${canonicalUrl(route.path)}</loc>\n` +
        `    <lastmod>${lastmod}</lastmod>\n` +
        `    <priority>${(route.priority ?? 0.5).toFixed(1)}</priority>\n` +
        `  </url>`,
    )
    .join("\n");

  return (
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `${entries}\n` +
    `</urlset>\n`
  );
}

/**
 * Clones the FINAL `dist/index.html` — already carrying hashed asset URLs and
 * vite-plugin-pwa's injected tags — into one file per static route with that
 * route's metadata baked in.
 *
 * Runs in `generateBundle` (not `closeBundle`) because Rollup flushes all
 * `generateBundle` emissions to disk before any `closeBundle` hook, and
 * vite-plugin-pwa builds the service worker in `closeBundle` by globbing the
 * output dir. That ordering is what gets the emitted HTML into the Workbox
 * precache manifest.
 *
 * Keep this plugin LAST in the `plugins` array.
 */
export default function seoHtmlPlugin(): Plugin {
  const noindexSite =
    process.env.VITE_SITE_NOINDEX === "true" ||
    process.env.GITHUB_BRANCH === "main";

  return {
    name: "emdev:seo-html",
    apply: "build",
    enforce: "post",
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const indexAsset = bundle["index.html"];
        if (!indexAsset || indexAsset.type !== "asset") {
          throw new Error("[seo-html] index.html not found in the bundle");
        }

        const baseHtml = String(indexAsset.source);

        // Guard against a future plugin-ordering regression silently shipping
        // per-route HTML without the PWA tags.
        for (const marker of ["manifest.webmanifest", "registerSW"]) {
          if (!baseHtml.includes(marker)) {
            throw new Error(
              `[seo-html] "${marker}" missing from index.html — seoHtmlPlugin() must run after VitePWA(). Keep it last in the plugins array.`,
            );
          }
        }

        const home = SEO_ROUTES.find((route) => route.path === "/");
        if (!home) throw new Error('[seo-html] no SEO_ROUTES entry for "/"');

        // Rewrite the root index.html itself.
        indexAsset.source = renderRoute(baseHtml, home, noindexSite);

        for (const route of SEO_ROUTES) {
          if (route.path === "/") continue;
          const html = renderRoute(baseHtml, route, noindexSite);
          const slug = route.path.replace(/^\//, "");
          // Both forms: nginx `try_files $uri.html $uri/` resolves either, and
          // Workbox's generateURLVariations only appends `index.html` for paths
          // ending in `/` while appending `.html` unconditionally.
          this.emitFile({ type: "asset", fileName: `${slug}.html`, source: html });
          this.emitFile({
            type: "asset",
            fileName: `${slug}/index.html`,
            source: html,
          });
        }

        this.emitFile({
          type: "asset",
          fileName: "404.html",
          source: renderRoute(baseHtml, NOT_FOUND_SEO, noindexSite),
        });

        this.emitFile({
          type: "asset",
          fileName: "robots.txt",
          source: noindexSite ? ROBOTS_TXT_NOINDEX : ROBOTS_TXT,
        });

        if (!noindexSite) {
          this.emitFile({
            type: "asset",
            fileName: "sitemap.xml",
            source: sitemap(SEO_ROUTES),
          });
        }
      },
    },
  };
}
