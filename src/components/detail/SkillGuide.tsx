"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface SkillGuideProps {
  content: string;
}

export default function SkillGuide({ content }: SkillGuideProps) {
  return (
    <section className="bg-white px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-10">
          使用教學
        </h2>
        <article className="prose prose-slate prose-lg max-w-none prose-headings:scroll-mt-20 prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h2:font-semibold prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-2 prose-h3:text-lg prose-code:before:content-none prose-code:after:content-none prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-normal prose-code:text-pink-600 prose-pre:bg-slate-900 prose-pre:text-slate-200 prose-pre:rounded-xl prose-pre:shadow-lg prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-table:text-sm prose-th:bg-slate-50 prose-img:rounded-xl">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>
      </div>
    </section>
  );
}
