/** Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL in your host's environment settings. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://dedeepya-abbagani.com").replace(/\/+$/, "");

/** Set NEXT_PUBLIC_ALLOW_INDEXING=false on demo / preview deployments so search engines ignore them. */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING !== "false";
