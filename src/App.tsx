import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import AmbientBackground from "./components/AmbientBackground";
import Logo from "./components/Logo";
import ChatPanel from "./components/ChatPanel";
import type { ChatMessage } from "./types";
import "./index.css";

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "intro-1",
    sender: "house",
    text: "Everybody lies.",
    timestamp: Date.now(),
  },
];

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);

  const handleSend = useCallback((text: string) => {
    console.log("HANDLESEND START");
    console.log("HANDLESEND CALLED");
    
    const userMsg: ChatMessage = {
      id: makeId(),
      sender: "user",
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);


    (async () => {
  try {
   console.log("BEFORE FETCH");
   const response = await fetch("/api/chat", 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      }
    );

    const data = await response.json();
    console.log("FETCH FINISHED");
   console.log("DATA:", data);
    console.log("RESPONSE ARRIVED", data);

    const houseMsg: ChatMessage = {
  id: makeId(),
  sender: "house",
  text:
    String(
      data.reply ||
      data.error ||
      "Something broke. Congratulations."
    ),
  timestamp: Date.now(),
};

    setIsTyping(false);
    setTypingMessageId(houseMsg.id);

    setMessages((prev) => [
      ...prev,
      houseMsg,
    ]);
  } catch (error) {
    console.error(error);

    setIsTyping(false);

    const errorMsg: ChatMessage = {
      id: makeId(),
      sender: "house",
      text: "Something broke. Congratulations.",
      timestamp: Date.now(),
    };

    setMessages((prev) => [
      ...prev,
      errorMsg,
    ]);
  }
})();
  }, []);

  const handleTypingDone = useCallback(() => {
    setTypingMessageId(null);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden font-sans text-paper">
      <AmbientBackground />

      <div className="relative z-10 flex h-full w-full flex-col px-6 pb-6 pt-3 md:px-10 md:pb-8 md:pt-4">
        {/* Top bar */}
        <div className="mb-0 flex items-start justify-between">
          <Logo />
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="hidden flex-col items-end gap-1 md:flex"
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted/70">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
            <span className="font-serif text-[12px] italic text-muted/50">
              Office hours: long over.
              Princeton-Plainsboro Teaching Hospital

            </span>
          </motion.div>
        </div>

        {/* Main content: chat + side panel */}
        <div className="flex min-h-0 flex-1">
          <div className="min-h-0 flex-1">
            <ChatPanel
              messages={messages}
              isTyping={isTyping}
              typingMessageId={typingMessageId}
              onSend={handleSend}
              onTypingDone={handleTypingDone}
            />
          </div>
         
        </div>
      </div>
      <footer className="fixed bottom-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-white/25 hover:text-white/50 transition-all z-50">
  Created by{" "}
  <a
    href="https://github.com/ShivuXD"
    target="_blank"
    rel="noopener noreferrer"
    className="hover:text-white"
  >
    Shivam
  </a>
</footer>
    </div>
  );
}
