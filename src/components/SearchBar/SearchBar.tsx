"use client";

import * as React from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { PromptCard, type Prompt } from "@/components/PromptCard/PromptCard";

interface SearchProps {
  prompts: Prompt[];
}

export function Search({ prompts }: SearchProps) {
  const [search, setSearch] = React.useState("");

  // Filter prompts based on search query
  const filteredPrompts = React.useMemo(() => {
    if (!search.trim()) {
      return prompts;
    }

    const query = search.toLowerCase();
    return prompts.filter((prompt) => {
      // Search in id, description, and tags
      const matchesId = prompt.id.toLowerCase().includes(query);
      const matchesDescription = prompt.description
        .toLowerCase()
        .includes(query);
      const matchesTags = prompt.tags?.some((tag) =>
        tag.toLowerCase().includes(query)
      );
      return matchesId || matchesDescription || matchesTags;
    });
  }, [prompts, search]);

  return (
    <Command className="bg-background" shouldFilter={false}>
      {/* Getting Started Callout */}
      {!search.trim() && (
        <div className="w-full max-w-[1200px] mx-auto px-4 pt-8 pb-4">
          <div className="relative flex items-start gap-4 rounded-[4px] bg-card p-6 border border-border shadow-[0_1px_2px_0_rgba(8,8,8,0.20),0_4px_4px_0_rgba(8,8,8,0.08)]">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-[4px] bg-primary/10">
              <svg
                className="w-6 h-6 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-[1.5rem] leading-[1.3] font-semibold tracking-[0.02em] text-card-foreground mb-2">
                Welcome to the Prompt Library
              </h3>
              <p className="text-base leading-[1.6] text-muted-foreground mb-3">
                Browse our collection of ready-to-use prompts for the Webflow
                MCP below, or use the search bar to find prompts by name,
                description, or tags.
              </p>
              <div className="flex items-center gap-2 text-sm text-primary font-medium">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
                <span>Click any prompt card to get started</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="w-full max-w-[1200px] mx-auto px-4 py-6">
        <CommandInput
          placeholder="Search prompts..."
          value={search}
          onValueChange={setSearch}
        />
      </div>

      <CommandList className="max-h-[calc(100vh-200px)]">
        {filteredPrompts.length === 0 ? (
          <CommandEmpty className="py-6 text-center text-base text-muted-foreground">
            No prompts found.
          </CommandEmpty>
        ) : (
          <CommandGroup>
            <div className="grid gap-8 pb-8 w-full max-w-[1200px] mx-auto px-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {filteredPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </CommandGroup>
        )}
      </CommandList>
    </Command>
  );
}
