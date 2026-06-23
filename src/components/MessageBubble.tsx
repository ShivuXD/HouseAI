import { motion } from "framer-motion";
import type { ChatMessage } from "../types";
import TypewriterText from "./TypewriterText";

interface MessageBubbleProps {
  message: ChatMessage;
  animateTyping: boolean;
  onTypingDone?: () => void;
}

export default function MessageBubble({ message, animateTyping, onTypingDone }: MessageBubbleProps) {
  const isUser = message.sender === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 14, x: isUser ? 10 : -10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`flex max-w-[55%] flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed shadow-glass backdrop-blur-md ${
            isUser
              ? "rounded-br-sm border border-steel-light/30 bg-steel/40 text-paper"
              : "rounded-bl-sm border border-brass/15 bg-charcoal-glass/70 text-paper/90"
          }`}
        >
          {!isUser && animateTyping ? (
            <TypewriterText text={message.text} onDone={onTypingDone} />
          ) : (
            message.text
          )}
        </div>
        <span className="px-1 font-mono text-[10px] text-muted/60">
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </motion.div>
  );
}
