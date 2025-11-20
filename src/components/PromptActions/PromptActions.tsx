"use client";

import * as React from "react";
import { ExternalLink, Copy, Check } from "lucide-react";

interface PromptActionsProps {
  promptText: string;
  className?: string;
}

export function PromptActions({ promptText, className }: PromptActionsProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getDeeplinkUrl = (type: "cursor" | "claude" | "chatgpt") => {
    const encoded = encodeURIComponent(promptText);
    
    switch (type) {
      case "cursor":
        return `cursor://anysphere.cursor-deeplink/prompt?text=${encoded}`;
      case "claude":
        return `https://claude.ai/new?q=${encoded}`;
      case "chatgpt":
        return `https://chatgpt.com/?q=${encoded}`;
      default:
        return "";
    }
  };

  const handleDeeplink = (type: "cursor" | "claude" | "chatgpt") => {
    const url = getDeeplinkUrl(type);
    
    // For protocol handlers (cursor://), create a hidden link and click it
    // This allows the browser to handle the protocol appropriately
    // For web URLs, open in new tab
    if (type === "cursor") {
      // For cursor:// protocol, try to open the app
      // Create a temporary link element to trigger the protocol handler
      const link = document.createElement('a');
      link.href = url;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Fallback: if protocol handler doesn't work, try window.open
      // This ensures something happens even if the app isn't installed
      setTimeout(() => {
        try {
          window.open(url, "_blank");
        } catch (e) {
          // Silently fail if blocked
        }
      }, 100);
    } else {
      // For web URLs (Claude, ChatGPT), always open in new tab
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className={`wf-button-group ${className || ''}`}>
      <button
        onClick={handleCopy}
        className={`wf-button wf-button-secondary ${copied ? 'copied' : ''}`}
      >
        {copied ? (
          <>
            <Check className="wf-button-icon" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="wf-button-icon" />
            <span>Copy Prompt</span>
          </>
        )}
      </button>

      <button
        onClick={() => handleDeeplink("cursor")}
        className="wf-button wf-button-secondary"
      >
        <ExternalLink className="wf-button-icon" />
        <span>Open in Cursor</span>
      </button>

      <button
        onClick={() => handleDeeplink("claude")}
        className="wf-button wf-button-secondary"
      >
        <ExternalLink className="wf-button-icon" />
        <span>Open in Claude</span>
      </button>

      <button
        onClick={() => handleDeeplink("chatgpt")}
        className="wf-button wf-button-secondary"
      >
        <ExternalLink className="wf-button-icon" />
        <span>Open in ChatGPT</span>
      </button>
    </div>
  );
}

