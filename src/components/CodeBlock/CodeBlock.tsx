"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlock({ code, language = "text", className }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={`relative group ${className || ''}`}>
      <div className="absolute top-3 right-3 z-10">
        <button
          onClick={handleCopy}
          className={`wf-copy-button ${copied ? 'copied' : ''}`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="wf-button-icon" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="wf-button-icon" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-[8px] bg-muted border border-border p-5 text-sm leading-relaxed font-mono max-h-[600px] overflow-y-auto">
        <code className="text-foreground">{code}</code>
      </pre>
    </div>
  );
}

