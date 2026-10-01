/** Resolve upstream Markdown resources against the exact reviewed source tree. */
export function skillResourceUrl(url: string, sourceUrl: string, image = false): string {
  if (!url || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) return url;
  const source = new URL(sourceUrl);
  const match = source.pathname.match(/^\/([^/]+)\/([^/]+)\/blob\/([^/]+)\/(.+)$/);
  if (!match) return url;
  const [, owner, repo, sha, path] = match;
  const root = image
    ? `https://raw.githubusercontent.com/${owner}/${repo}/${sha}/`
    : `https://github.com/${owner}/${repo}/blob/${sha}/`;
  return new URL(url.startsWith("/") ? url.slice(1) : url, url.startsWith("/") ? root : `${root}${path}`).href;
}
