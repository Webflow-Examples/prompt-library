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
  // Extract title from id (convert kebab-case to Sentence case, preserving acronyms)
  const getTitle = (id: string) => {
    if (!id) return '';

    const acronyms = ['SEO', 'CMS', 'API', 'URL', 'HTML', 'CSS', 'JS', 'MCP'];
    const words = id.split("-");

    const title = words.map((word, index) => {
      const upperWord = word.toUpperCase();
      // Keep acronyms in uppercase
      if (acronyms.includes(upperWord)) {
        return upperWord;
      }
      // Capitalize first word, lowercase the rest
      return index === 0
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase();
    }).join(" ");

    return title;
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
        "group relative flex flex-col rounded-[8px] bg-card p-5 pb-[60px] text-left shadow-[0_2px_4px_rgba(0,0,0,0.1)] transition-all duration-300 ease-in-out cursor-pointer no-underline border border-border",
        "hover:shadow-[0_4px_8px_rgba(0,0,0,0.15)] hover:scale-[1.02]",
        className
      )}
    >
      {/* Card Header with Icon */}
      <div className="flex items-center mb-2.5">
        {prompt.icon && (
          <div className="flex w-10 h-10 shrink-0 items-center justify-center mr-2.5 relative">
            {/* Light mode icon */}
            <img
              src={prompt.icon}
              alt=""
              className="w-10 h-10 light-icon"
              loading="lazy"
            />
            {/* Dark mode icon */}
            <img
              src={prompt.icon.replace('/Light/', '/Dark/')}
              alt=""
              className="w-10 h-10 dark-icon absolute top-0 left-0"
              loading="lazy"
            />
          </div>
        )}
        <h3 className="m-0 text-[1.25rem] font-semibold text-card-foreground group-hover:text-[#146ef5] transition-colors">
          {getTitle(prompt.id)}
        </h3>
      </div>

      {/* Card Body */}
      <div className="mt-2.5 flex-grow flex flex-col">
        <p className="m-0 text-base leading-normal text-muted-foreground line-clamp-3">
          {prompt.description}
        </p>
      </div>

      {/* Tag Badges */}
      {prompt.tags && prompt.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {prompt.tags.includes("designer") && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium border border-purple-200 dark:border-purple-800/50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              Designer
            </span>
          )}
          {prompt.tags.includes("mcp") && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium border border-blue-200 dark:border-blue-800/50">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Additional Setup
            </span>
          )}
        </div>
      )}
    </a>
  );
}
