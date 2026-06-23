import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CaseNote } from "../types";

interface CaseNotesPanelProps {
  notes: CaseNote[];
}

const SEVERITY_STYLES: Record<CaseNote["severity"], { dot: string; label: string }> = {
  low: { dot: "bg-muted/60", label: "text-muted" },
  moderate: { dot: "bg-brass shadow-[0_0_6px_rgba(201,169,97,0.6)]", label: "text-brass" },
  high: { dot: "bg-rose-400/80 shadow-[0_0_6px_rgba(244,114,182,0.5)]", label: "text-rose-300/90" },
};

export default function CaseNotesPanel({ notes }: CaseNotesPanelProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{
        opacity: 1,
        x: 0,
        width: collapsed ? 56 : 300,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative hidden h-full shrink-0 overflow-hidden rounded-[24px] border border-white/[0.08] bg-charcoal/50 shadow-glass backdrop-blur-2xl lg:flex lg:flex-col"
    >
      <div className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/[0.04]" />

      {/* Header / toggle */}
      <button
        onClick={() => setCollapsed((c) => !c)}
        className="flex items-center justify-between gap-2 border-b border-white/[0.06] px-4 py-4 text-left transition-colors hover:bg-white/[0.02]"
        aria-label={collapsed ? "Expand case notes" : "Collapse case notes"}
      >
        {!collapsed && (
          <div>
            <h2 className="font-serif text-[15px] font-medium text-paper">Case Notes</h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
              Differential · Live
            </p>
          </div>
        )}
        <motion.svg
          animate={{ rotate: collapsed ? 180 : 0 }}
          transition={{ duration: 0.4 }}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="shrink-0 text-muted"
        >
          <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </button>

      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            key="notes-body"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex-1 overflow-y-auto px-4 py-4"
          >
            {notes.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-3 px-4 text-center">
                <span className="font-serif text-[28px] text-brass/30">∅</span>
                <p className="font-serif text-[13px] italic leading-relaxed text-muted/60">
                  No observations yet. House needs more lies to work with.
                </p>
              </div>
            ) : (
              <ul className="space-y-3">
                <AnimatePresence initial={false}>
                  {notes.map((note, idx) => (
                    <motion.li
                      key={note.id}
                      initial={{ opacity: 0, y: 12, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, delay: idx === notes.length - 1 ? 0.1 : 0 }}
                      className="rounded-xl border border-white/[0.06] bg-black/20 p-3"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${SEVERITY_STYLES[note.severity].dot}`}
                        />
                        <div className="min-w-0">
                          <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted/50">
                            Obs. {String(idx + 1).padStart(2, "0")}
                          </p>
                          <p className="mt-0.5 font-sans text-[13px] font-medium leading-snug text-paper/90">
                            {note.label}
                          </p>
                          <p className="mt-1 font-serif text-[12px] italic leading-snug text-muted/70">
                            {note.detail}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {collapsed && (
        <div className="flex flex-1 flex-col items-center justify-start gap-4 py-4">
          <span className="rotate-180 font-mono text-[10px] uppercase tracking-[0.2em] text-muted/60 [writing-mode:vertical-rl]">
            Case Notes
          </span>
          {notes.length > 0 && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brass/20 font-mono text-[10px] text-brass">
              {notes.length}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}
