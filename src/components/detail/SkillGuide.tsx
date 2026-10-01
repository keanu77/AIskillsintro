import ReactMarkdown, { defaultUrlTransform, type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { skillResourceUrl } from "@/lib/skillResourceUrl";

// Wide tables and code blocks scroll inside their own box instead of the page;
// tabIndex lets keyboard users scroll them (axe: scrollable-region-focusable).
const MARKDOWN_COMPONENTS: Components = {
  table: ({ node, ...props }) => (
    <div role="group" aria-label="可水平捲動的表格" tabIndex={0} className="not-prose my-6 overflow-x-auto border-2 border-ink bg-white">
      <table {...props} className="w-full text-left text-sm [&_td]:border-t [&_td]:border-ink/15 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top [&_th]:bg-paper [&_th]:px-3 [&_th]:py-2 [&_th]:font-bold" />
    </div>
  ),
  pre: ({ node, ...props }) => <pre {...props} tabIndex={0} />,
};

const PROSE = [
  "prose prose-neutral prose-lg max-w-none break-words text-ink-soft",
  "prose-headings:scroll-mt-20 prose-headings:text-ink prose-h1:text-2xl prose-h1:font-black",
  "prose-h2:text-xl prose-h2:font-bold prose-h2:border-b-2 prose-h2:border-ink prose-h2:pb-2 prose-h3:text-lg",
  "prose-code:before:content-none prose-code:after:content-none prose-code:bg-white prose-code:px-1.5 prose-code:py-0.5",
  "prose-code:text-sm prose-code:font-normal prose-code:text-ink prose-code:outline prose-code:outline-1 prose-code:outline-ink/20",
  // Code blocks share the dark style of the install panel.
  "prose-pre:rounded-none prose-pre:bg-ink prose-pre:text-paper",
  "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-paper [&_pre_code]:outline-0",
  "prose-a:text-accent prose-a:underline-offset-2 hover:prose-a:text-accent-strong prose-strong:text-ink",
].join(" ");

interface SkillGuideProps {
  content: string;
  /** Pinned upstream SKILL.md URL; relative links in the guide resolve against it. */
  sourceUrl: string;
}

export default function SkillGuide({ content, sourceUrl }: SkillGuideProps) {
  return (
    <section aria-labelledby="guide-heading" className="max-w-[820px]">
      <h2 id="guide-heading" className="font-wide text-[28px] font-black">使用教學</h2>
      <p className="mt-3 mb-8 border-l-4 border-ink pl-3 text-sm leading-relaxed text-ink-soft">
        以下為上游 SKILL.md 原文：常見段落標題譯為中文，其餘保留英文。中文重點請看頁首摘要。
      </p>
      <article className={PROSE}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={MARKDOWN_COMPONENTS}
          urlTransform={(url, key) => skillResourceUrl(defaultUrlTransform(url), sourceUrl, key === "src")}
        >
          {content}
        </ReactMarkdown>
      </article>
      {/* Plain "#" scrolls to the top natively; html's scroll-behavior handles smoothing. */}
      <a href="#" className="mt-12 inline-flex min-h-11 items-center gap-2 border-2 border-ink px-5 text-sm font-bold hover:bg-ink hover:text-paper">
        ↑ 回到頁首
      </a>
    </section>
  );
}
