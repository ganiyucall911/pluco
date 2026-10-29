const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a /public path with the deploy base path (e.g. /pluco on GitHub Pages). */
export function asset(path: string) {
  return basePath + path;
}
