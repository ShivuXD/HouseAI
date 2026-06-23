import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatMessage } from "../types";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  messages: ChatMessage[];
  isTyping: boolean;
  typingMessageId: string | null;
  onSend: (text: string) => void;
  onTypingDone: () => void;
}

export default function ChatPanel({
  messages,
  isTyping,
  typingMessageId,
  onSend,
  onTypingDone,
}: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative flex h-full w-full flex-col overflow-hidden"
    >
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-6 overflow-y-auto px-12 pt-2 pb-32">
        <AnimatePresence initial={false}>
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              animateTyping={m.id === typingMessageId}
              onTypingDone={onTypingDone}
            />
          ))}
          {isTyping && (
            <motion.div key="typing-indicator">
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-0 right-0">
  <ChatInput
  onSend={onSend}
  disabled={isTyping}
/>
</div>
    </motion.div>
  );
}
