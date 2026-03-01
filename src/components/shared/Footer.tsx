interface FooterProps {
  skillName: string;
}

export default function Footer({ skillName }: FooterProps) {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-12">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm text-slate-500">
          {skillName} — Built as a{" "}
          <span className="font-medium text-slate-700">Claude Code / Gemini CLI Skill</span>
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Made with AI-assisted development
        </p>
      </div>
    </footer>
  );
}
