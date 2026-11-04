"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  words: readonly string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pause?: number;
  className?: string;
}

export function TypingText({
  words,
  typingSpeed = 70,
  deletingSpeed = 40,
  pause = 1800,
  className,
}: TypingTextProps) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Re-mount with a `key` prop to reset when `words` changes.
  useEffect(() => {
    const word = words[index % words.length];
    let delay: number;
    let next: () => void;

    if (!deleting && text === word) {
      delay = pause;
      next = () => setDeleting(true);
    } else if (deleting && text === "") {
      delay = deletingSpeed;
      next = () => {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else {
      delay = deleting ? deletingSpeed : typingSpeed;
      next = () => setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }

    const timeout = setTimeout(next, delay);
    return () => clearTimeout(timeout);
  }, [text, deleting, index, words, typingSpeed, deletingSpeed, pause]);

  return (
    <span className={className} aria-live="polite">
      {text}
      <span className="ml-0.5 inline-block w-[2px] h-[1em] align-middle bg-current animate-blink" aria-hidden />
    </span>
  );
}
