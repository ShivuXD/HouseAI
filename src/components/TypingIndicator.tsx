import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TYPING_STATUSES } from "../houseEngine";

export default function TypingIndicator() {
  const [statusIndex, setStatusIndex] = useState(() =>
    Math.floor(Math.random() * TYPING_STATUSES.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex((i) => (i + 1) % TYPING_STATUSES.length);
    }, 1700);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      className="flex w-full justify-start"
    >
      <div className="flex max-w-[78%] flex-col items-start gap-1">
        <div className="flex items-center gap-2.5 rounded-2xl rounded-bl-sm border border-brass/15 bg-charcoal-glass/70 px-4 py-3 shadow-glass backdrop-blur-md">
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-brass/70"
                animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                transition={{
                  duration: 1.1,
                  repeat: Infinity,
                  delay: i * 0.18,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={statusIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="font-serif text-[13px] italic text-muted"
            >
              {TYPING_STATUSES[statusIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
