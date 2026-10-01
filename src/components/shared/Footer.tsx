interface FooterProps {
  title: string;
}

export default function Footer({ title }: FooterProps) {
  return (
    <footer className="border-t border-slate-200/80 bg-gradient-to-b from-white to-slate-50 px-6 py-12">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm text-slate-600">
          {title} — Built for{" "}
          <span className="font-medium text-slate-800">Claude Code / Codex / Gemini CLI / Grok</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">Made with AI-assisted development</p>
      </div>
    </footer>
  );
}
