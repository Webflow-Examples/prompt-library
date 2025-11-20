import * as React from "react";
import { cn } from "@/lib/utils";

export interface Prompt {
  id: string;
  icon?: string;
  description: string;
  tags: string[];
  href: string;
  variables?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
  contentFile?: string;
}

interface PromptCardProps {
  prompt: Prompt;
  className?: string;
}

export function PromptCard({ prompt, className }: PromptCardProps) {
  // Extract title from id (convert kebab-case to Title Case)
  const getTitle = (id: string) => {
    return id
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Handle click to break out of iframe with correct URL
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Only handle if we're in an iframe
    if (window.top && window.top !== window.self) {
      // If href is already absolute, use it as-is
      if (prompt.href.startsWith("http")) {
        e.preventDefault();
        window.top.location.href = prompt.href;
        return;
      }

      // For relative URLs, try to get parent window's origin
      try {
        // Try to access parent origin (works if same-origin)
        const parentOrigin = window.top.location.origin;
        const absoluteHref = `${parentOrigin}${prompt.href}`;
        e.preventDefault();
        window.top.location.href = absoluteHref;
      } catch (error) {
        // Cross-origin: can't access parent origin directly
        // Fallback: use document.referrer to get parent URL
        if (document.referrer) {
          try {
            const referrerUrl = new URL(document.referrer);
            const absoluteHref = `${referrerUrl.origin}${prompt.href}`;
            e.preventDefault();
            window.top.location.href = absoluteHref;
          } catch {
            // If referrer parsing fails, let target="_top" handle it
            // (relative URL will resolve relative to parent's origin)
          }
        }
        // If all else fails, target="_top" will handle it
      }
    }
    // If not in iframe, let default behavior handle it
  };

  return (
    <a
      href={prompt.href}
      onClick={handleClick}
      target="_top"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex flex-col rounded-[8px] bg-white p-5 pb-[60px] text-left shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out cursor-pointer no-underline border border-[#D8D8D8]",
        "hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:scale-[1.02]",
        className
      )}
    >
      {/* Card Header with Icon */}
      <div className="flex items-center mb-2.5">
        {prompt.icon && (
          <div className="flex w-10 h-10 shrink-0 items-center justify-center mr-2.5">
            <img
              src={prompt.icon}
              alt=""
              className="w-10 h-10"
              loading="lazy"
            />
          </div>
        )}
        <h3 className="m-0 text-[1.25rem] font-semibold text-[#333] group-hover:text-[#146ef5] transition-colors">
          {getTitle(prompt.id)}
        </h3>
      </div>

      {/* Card Body */}
      <div className="mt-2.5 flex-grow flex flex-col">
        <p className="m-0 text-base leading-normal text-[#555] line-clamp-3">
          {prompt.description}
        </p>
      </div>
    </a>
  );
}
