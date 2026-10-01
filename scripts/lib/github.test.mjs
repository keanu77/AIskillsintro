import { describe, expect, it } from "vitest";
import { githubClient } from "./github.mjs";
const sha = "b".repeat(40);
describe("GitHub request evidence", () => {
  it("pins the recursive tree to a validated commit and never sends tokens to raw hosts", async () => {
    const calls = [];
    const client = githubClient({ token: "fixture-token", fetchImpl: async (url, options) => {
      calls.push({ url, options });
      if (url.includes("raw.githubusercontent")) return new Response("body");
      return Response.json(url.endsWith("commits/HEAD") ? { sha } : url.includes("/git/trees/") ? { truncated: false, tree: [] } : { stargazers_count: 80, pushed_at: "2026-10-01" });
    } });
    await client.repository("owner/repo");
    await client.raw("owner/repo", sha, "skills/demo/SKILL.md");
    expect(calls.some(call => call.url.endsWith(`/git/trees/${sha}?recursive=1`))).toBe(true);
    expect(calls.at(-1).options.headers.Authorization).toBeUndefined();
    expect(calls.every(call => call.options.redirect === "error")).toBe(true);
  });
  it("rejects truncated tree results", async () => {
    const client = githubClient({ fetchImpl: async url => Response.json(url.endsWith("commits/HEAD") ? { sha } : url.includes("/git/trees/") ? { truncated: true, tree: [] } : { stargazers_count: 80, pushed_at: "2026-10-01" }) });
    await expect(client.repository("owner/repo")).rejects.toThrow(/Incomplete tree/);
  });
  it("blocks unsafe repo, path and non-pinned raw references before requests", async () => {
    let calls = 0;
    const client = githubClient({ fetchImpl: async () => { calls++; return new Response("x"); } });
    await expect(client.raw("owner/repo", "main", "SKILL.md")).rejects.toThrow(/Unsafe/);
    await expect(client.raw("owner/repo", sha, "../SKILL.md")).rejects.toThrow(/Unsafe/);
    await expect(client.repository("https://evil.example/repo")).rejects.toThrow(/Invalid/);
    expect(calls).toBe(0);
  });
});
