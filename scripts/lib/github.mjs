import { isSafePath, isSafeRepo } from "./sync-core.mjs";

const SHA = /^[a-f0-9]{40}$/;
const MAX_BYTES = 20 * 1024 * 1024;
export function githubClient({ token = process.env.GITHUB_TOKEN, fetchImpl = fetch } = {}) {
  async function request(url, authenticated = true) {
    const response = await fetchImpl(url, {
      headers: { Accept: "application/vnd.github+json", ...(authenticated && token ? { Authorization: `Bearer ${token}` } : {}) },
      signal: AbortSignal.timeout(30_000),
      redirect: "error",
    });
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    if (Number(response.headers.get("content-length")) > MAX_BYTES) throw new Error("GitHub response exceeds size limit");
    const text = await response.text();
    if (Buffer.byteLength(text) > MAX_BYTES) throw new Error("GitHub response exceeds size limit");
    return text;
  }
  async function api(suffix) { return JSON.parse(await request(`https://api.github.com/${suffix}`)); }
  async function repository(repo) {
    if (!isSafeRepo(repo)) throw new Error("Invalid repository name");
    const [metadata, commit] = await Promise.all([api(`repos/${repo}`), api(`repos/${repo}/commits/HEAD`)]);
    if (!SHA.test(commit.sha)) throw new Error(`Invalid commit SHA for ${repo}`);
    const result = await api(`repos/${repo}/git/trees/${commit.sha}?recursive=1`);
    if (result.truncated || !Array.isArray(result.tree)) throw new Error(`Incomplete tree for ${repo}`);
    if (!Number.isFinite(metadata.stargazers_count) || typeof metadata.pushed_at !== "string") throw new Error(`Missing repository evidence for ${repo}`);
    return { sha: commit.sha, stars: metadata.stargazers_count, pushedAt: metadata.pushed_at, tree: result.tree };
  }
  async function raw(repo, sha, filePath) {
    if (!isSafeRepo(repo) || !SHA.test(sha) || !isSafePath(filePath)) throw new Error("Unsafe raw content reference");
    const encoded = filePath.split("/").map(encodeURIComponent).join("/");
    return request(`https://raw.githubusercontent.com/${repo}/${sha}/${encoded}`, false);
  }
  async function search(query) {
    return api(`search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=10`);
  }
  return { repository, raw, search };
}
