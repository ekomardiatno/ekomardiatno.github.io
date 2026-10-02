/**
 * Single source of truth for per-route SEO metadata.
 *
 * Consumed by BOTH:
 *   - `vite/seo-html.ts` (build time — bakes metadata into one HTML file per route)
 *   - `src/seo/Seo.tsx`  (runtime — keeps head tags correct during SPA navigation)
 *
 * Because `vite.config.ts` imports this file, it MUST stay pure:
 * no `node:*`, no DOM APIs, no `import.meta.env`.
 */

export const CANONICAL_ORIGIN = "https://ekomardiatno.my.id";

export const DEFAULT_OG_IMAGE = "/og-image.png";

/** Share card for the EMVITE (wedding invitation) side of the site. */
export const EMVITE_OG_IMAGE = "/og-emvite.png";

export type SeoLang = "en" | "id";

export type SeoRoute = {
  /** Route path, no trailing slash. `/` for the homepage. */
  path: string;
  lang: SeoLang;
  title: string;
  description: string;
  /** Absolute-from-root image path. Defaults to `DEFAULT_OG_IMAGE`. */
  image?: string;
  noindex?: boolean;
  /** sitemap.xml priority. Omitted entries default to 0.5. */
  priority?: number;
  /** Raw JSON-LD object, serialised into a <script type="application/ld+json">. */
  jsonLd?: Record<string, unknown>;
};

const SITE_NAME = "EMDEV";

export const SEO_ROUTES: SeoRoute[] = [
  {
    path: "/",
    lang: "en",
    title: "Eko Mardiatno — Full Stack Developer | EMDEV",
    description:
      "Portfolio of Eko Mardiatno, a full stack developer building web and mobile apps with React, React Native, Node.js and TypeScript.",
    priority: 1.0,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Eko Mardiatno",
      alternateName: "Eko",
      jobTitle: "Full Stack Developer",
      url: CANONICAL_ORIGIN,
      email: "mailto:ekomardiatno@gmail.com",
      knowsAbout: [
        "React",
        "React Native",
        "Node.js",
        "TypeScript",
        "PostgreSQL",
      ],
      sameAs: [
        "https://github.com/ekomardiatno",
        "https://www.linkedin.com/in/ekomardiatno",
      ],
    },
  },
  {
    path: "/monflo",
    lang: "en",
    title: `Monflo — Personal Finance & Budgeting App | ${SITE_NAME}`,
    description:
      "Monflo is a simple React Native app for tracking personal finances and budgeting. Built by Eko Mardiatno.",
    priority: 0.7,
  },
  {
    path: "/eksamart",
    lang: "en",
    title: `Eksamart — Simple E-Commerce & POS App | ${SITE_NAME}`,
    description:
      "Eksamart is a React Native app for recording transactions and managing products. Built by Eko Mardiatno.",
    priority: 0.7,
  },
  {
    path: "/emvite/templates",
    lang: "id",
    title: `Template Undangan Pernikahan Digital — EMVITE | ${SITE_NAME}`,
    description:
      "Jelajahi koleksi template undangan pernikahan digital EMVITE. Lihat demo setiap desain sebelum memilih.",
    image: EMVITE_OG_IMAGE,
    priority: 0.9,
  },
  {
    path: "/emvite/demo/the-beginning",
    lang: "id",
    title: `Demo Template The Beginning — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital The Beginning: desain bersih bernuansa terang dengan navigasi gulir vertikal.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/demo/evergreen",
    lang: "id",
    title: `Demo Template Evergreen — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital Evergreen: palet batu dan hijau zamrud yang natural dan hangat.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/demo/celestial",
    lang: "id",
    title: `Demo Template Celestial — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital Celestial: latar langit malam biru tua bertabur bintang dengan aksen emas.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/demo/enchanted",
    lang: "id",
    title: `Demo Template Enchanted — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital Enchanted: nuansa putih hangat dan rose dengan kelopak bunga berguguran.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/demo/velvet",
    lang: "id",
    title: `Demo Template Velvet — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital Velvet: ungu kebiruan gelap dengan efek teks mesin tik dan navigasi samping.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/demo/opulent",
    lang: "id",
    title: `Demo Template Opulent — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital Opulent: krem dan emas mewah dengan partikel yang melayang lembut.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/demo/memoir",
    lang: "id",
    title: `Demo Template Memoir — Undangan Digital EMVITE | ${SITE_NAME}`,
    description:
      "Demo template undangan pernikahan digital Memoir: format cerita sinematik yang dibuka dengan geser atau ketuk.",
    image: EMVITE_OG_IMAGE,
    priority: 0.6,
  },
  {
    path: "/emvite/privacy-policy",
    lang: "en",
    title: `Privacy Policy — EMVITE | ${SITE_NAME}`,
    description:
      "How EMVITE collects, uses and protects the data you provide when creating or opening a digital wedding invitation.",
    image: EMVITE_OG_IMAGE,
    priority: 0.3,
  },
  {
    path: "/emsmbs/privacy-policy",
    lang: "en",
    title: `Privacy Policy — EMSMBS | ${SITE_NAME}`,
    description:
      "How EMSMBS handles data and device permissions when running an SMB file server on your Android phone.",
    priority: 0.3,
  },
];

/**
 * Wedding invitation routes. Always `noindex` — they contain real guests'
 * names, photos and addresses. Excluded from sitemap.xml and blocked in
 * robots.txt. Paths use react-router patterns and are resolved with
 * `matchPath` at runtime only; no HTML is baked for them.
 */
export const DYNAMIC_SEO_ROUTES: SeoRoute[] = [
  {
    path: "/emvite/wedding/preview/:id",
    lang: "id",
    title: "Undangan Pernikahan — EMVITE",
    description: "Pratinjau undangan pernikahan digital EMVITE.",
    image: EMVITE_OG_IMAGE,
    noindex: true,
  },
  {
    path: "/emvite/wedding/guest/:id",
    lang: "id",
    title: "Undangan Pernikahan — EMVITE",
    description: "Undangan pernikahan digital EMVITE.",
    image: EMVITE_OG_IMAGE,
    noindex: true,
  },
];

export const NOT_FOUND_SEO: SeoRoute = {
  path: "/404",
  lang: "en",
  title: `Page Not Found | ${SITE_NAME}`,
  description: "The page you are looking for does not exist.",
  noindex: true,
};

/**
 * Origin-root robots.txt. This repo owns `/robots.txt` for ekomardiatno.my.id,
 * so PingWin's rules are mirrored here verbatim.
 *
 * SYNC OBLIGATION: if `/var/www/pingwin/web/robots.txt` changes on the VPS,
 * mirror the change in the PingWin block below.
 */
export const ROBOTS_TXT = `User-agent: *
Allow: /

# Private wedding invitations — contain guest names, photos and addresses
Disallow: /emvite/wedding/

# PingWin (separate app at /pingwin/ — keep in sync with /var/www/pingwin/web/robots.txt)
Allow: /pingwin/
Allow: /pingwin/login
Allow: /pingwin/download
Disallow: /pingwin/overview
Disallow: /pingwin/messages
Disallow: /pingwin/inbound
Disallow: /pingwin/devices
Disallow: /pingwin/keys
Disallow: /pingwin/webhooks
Disallow: /pingwin/billing
Disallow: /pingwin/admin
Disallow: /pingwin/dashboard/
Disallow: /pingwin/v1/
Disallow: /pingwin/gateway/

# Admin / internal
Disallow: /phpmyadmin
Disallow: /empidgeon/
Disallow: /emvite-node/
Disallow: /copek-node/
Disallow: /whatsapp-api/
Disallow: /serenchat/

# Link unfurlers must be able to read the server-rendered Open Graph document
# for private invitations and fetch its share card. Both responses carry
# \`X-Robots-Tag: noindex, nofollow\`, so allowing the fetch does not index them.
# facebookexternalhit honours robots.txt for the og:image request too — if this
# group is removed, Facebook previews silently lose their thumbnail.
#
# A User-agent-specific group REPLACES the \`*\` group for that agent, so this
# does not rely on longest-match Allow/Disallow precedence. \`/emvite/og/\` is
# under no Disallow anywhere — do not add one that would catch it.
#
# Googlebot and bingbot are deliberately absent: serving them different HTML
# than a browser is cloaking, and /emvite/wedding/ is Disallowed for them above.
User-agent: facebookexternalhit
User-agent: facebookcatalog
User-agent: meta-externalagent
User-agent: WhatsApp
User-agent: Twitterbot
User-agent: TelegramBot
User-agent: Slackbot
User-agent: Slackbot-LinkExpanding
User-agent: Discordbot
User-agent: LinkedInBot
Allow: /
Disallow: /phpmyadmin
Disallow: /emvite-node/

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
Sitemap: ${CANONICAL_ORIGIN}/pingwin/sitemap.xml
`;

export const ROBOTS_TXT_NOINDEX = `User-agent: *
Disallow: /
`;
