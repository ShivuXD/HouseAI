import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text?: string;
  speed?: number;
  onDone?: () => void;
}
export default function TypewriterText({ text = "", speed = 7, onDone }: TypewriterTextProps) {
  const [shown, setShown] = useState("");

  const safeText = text || "";
  useEffect(() => {
    setShown("");
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setShown(safeText.slice(0, i));
      if (i >= safeText.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  
  const isComplete = shown.length === safeText.length;

  return (
    <span>
      {shown}
      {!isComplete && (
        <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-brass align-middle" />
      )}
    </span>
  );
}
