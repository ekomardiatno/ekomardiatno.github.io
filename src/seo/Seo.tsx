import { useEffect } from "react";
import { matchPath, useLocation } from "react-router";
import {
  CANONICAL_ORIGIN,
  DEFAULT_OG_IMAGE,
  DYNAMIC_SEO_ROUTES,
  NOT_FOUND_SEO,
  SEO_ROUTES,
  type SeoRoute,
} from "./routes";

/**
 * Keeps head tags in sync during client-side navigation by mutating the tags
 * baked into the HTML in place.
 *
 * Deliberately not rendering <title>/<meta> as React 19 elements: React hoists
 * them but appends without deduping against tags already in the document, and
 * HTML uses the FIRST <title>, so the update would silently do nothing.
 */

function setMeta(selector: string, attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function setLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function resolve(pathname: string): SeoRoute {
  const normalized =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") || "/" : pathname;

  const exact = SEO_ROUTES.find((route) => route.path === normalized);
  if (exact) return exact;

  const dynamic = DYNAMIC_SEO_ROUTES.find((route) =>
    matchPath(route.path, normalized),
  );
  return dynamic ?? NOT_FOUND_SEO;
}

export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const route = resolve(pathname);
    const url = `${CANONICAL_ORIGIN}${pathname === "/" ? "/" : pathname.replace(/\/+$/, "")}`;
    const image = `${CANONICAL_ORIGIN}${route.image ?? DEFAULT_OG_IMAGE}`;

    document.title = route.title;
    document.documentElement.lang = route.lang;

    setMeta('meta[name="description"]', "name", "description", route.description);
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      route.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    setLink("canonical", url);

    setMeta('meta[property="og:url"]', "property", "og:url", url);
    setMeta('meta[property="og:title"]', "property", "og:title", route.title);
    setMeta('meta[property="og:description"]', "property", "og:description", route.description);
    setMeta('meta[property="og:image"]', "property", "og:image", image);
    setMeta(
      'meta[property="og:locale"]',
      "property",
      "og:locale",
      route.lang === "id" ? "id_ID" : "en_US",
    );
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", route.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", route.description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", image);
  }, [pathname]);

  return null;
}
