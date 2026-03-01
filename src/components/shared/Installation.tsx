"use client";

import { useState } from "react";

type Tab = "claude" | "gemini";

interface InstallationProps {
  slug: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 transition-all hover:bg-white/20 hover:text-white active:scale-95"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          <span className="text-emerald-400">已複製</span>
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          複製
        </>
      )}
    </button>
  );
}

function makeSnippets(slug: string) {
  return {
    claude: `# 安裝 ${slug} skill 到 Claude Code
# 方法一：從 claude-scientific-skills 安裝（推薦）
git clone https://github.com/anthropics/claude-scientific-skills.git
cp -r claude-scientific-skills/skills/${slug} ~/.claude/skills/

# 方法二：手動建立
mkdir -p ~/.claude/skills/${slug}
# 將 SKILL.md 放入上述目錄即可

# 安裝完成後，在 Claude Code 中即可使用此 skill`,
    gemini: `# 安裝 ${slug} skill 到 Gemini CLI
mkdir -p ~/.gemini/skills/${slug}

# 複製 SKILL.md 到目錄
cp SKILL.md ~/.gemini/skills/${slug}/

# 在 ~/.gemini/settings.toml 中加入
# [[skills]]
# name = "${slug}"
# path = "~/.gemini/skills/${slug}/SKILL.md"

# 重啟 Gemini CLI 即可使用`,
  };
}

export default function Installation({ slug }: InstallationProps) {
  const [activeTab, setActiveTab] = useState<Tab>("claude");

  const snippets = makeSnippets(slug);
  const snippet = activeTab === "claude" ? snippets.claude : snippets.gemini;

  return (
    <section id="installation" className="relative bg-gradient-to-b from-slate-900 to-slate-950 px-6 py-20 sm:py-24">
      <div className="absolute inset-0 grid-pattern" />
      <div className="relative mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            安裝教學
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            選擇你使用的 AI CLI 工具，按照步驟安裝即可
          </p>
        </div>

        <div className="mt-12">
          {/* Tab buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab("claude")}
              className={`rounded-t-xl px-6 py-3 text-sm font-semibold transition-all ${
                activeTab === "claude"
                  ? "bg-slate-800/80 text-white shadow-inner"
                  : "bg-slate-800/30 text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                Claude Code
              </span>
            </button>
            <button
              onClick={() => setActiveTab("gemini")}
              className={`rounded-t-xl px-6 py-3 text-sm font-semibold transition-all ${
                activeTab === "gemini"
                  ? "bg-slate-800/80 text-white shadow-inner"
                  : "bg-slate-800/30 text-slate-400 hover:text-slate-300 hover:bg-slate-800/50"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" />
                </svg>
                Gemini CLI
              </span>
            </button>
          </div>

          {/* Code block */}
          <div className="relative overflow-hidden rounded-b-2xl rounded-tr-2xl bg-slate-800/80 ring-1 ring-white/5">
            {/* Top shimmer bar */}
            <div className="h-px animate-shimmer" />
            <div className="absolute right-4 top-4 z-10">
              <CopyButton text={snippet} />
            </div>
            <div className="overflow-x-auto p-6 pt-12">
              <pre className="font-mono text-sm leading-7 text-slate-300">
                {snippet}
              </pre>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            安裝完成後，在 CLI 中即可開始使用此 Skill。
          </p>
        </div>
      </div>
    </section>
  );
}
