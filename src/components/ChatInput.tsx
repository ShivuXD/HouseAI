import { useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleInput = (
  e: React.ChangeEvent<HTMLTextAreaElement>
) => {
  e.target.style.height = "auto";
  e.target.style.height = `${e.target.scrollHeight}px`;
  setValue(e.target.value);
};

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="px-28 pb-0 pt-1">
      <div className="
flex
items-end
gap-3
rounded-2xl
border
border-white/10
bg-black/45
px-4
py-2
backdrop-blur-xl
shadow-2xl
transition-colors
focus-within:border-transparent
focus-within:ring-0
focus-within:outline-none
">
        <textarea
          value={value}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Lie to me."
          rows={1}
          disabled={disabled}
          className="max-h-64 flex-1 resize-none bg-transparent font-sans text-[14.5px] text-paper placeholder:text-muted/50 outline-none"
        />
        <motion.button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          whileHover={value.trim() ? { scale: 1.05 } : {}}
          whileTap={value.trim() ? { scale: 0.95 } : {}}
          className={`flex shrink-0 items-center justify-center rounded-full p-2.5 transition-all ${
            value.trim() && !disabled
              ? "bg-brass text-charcoal shadow-glow-brass"
              : "bg-white/5 text-muted/40"
          }`}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M22 2L11 13" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M22 2L15 22L11 13L2 9L22 2Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.button>
      </div>
      <p className="mt-2 px-1 font-mono text-[10px] text-muted/40">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}
