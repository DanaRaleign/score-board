"use client";

import { useState } from "react";

export function CopyScoreButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button className="copy-button" onClick={onCopy}>
      {copied ? "Copied" : "Copy Record"}
    </button>
  );
}
