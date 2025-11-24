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
      <CommandInput
        placeholder="Search prompts..."
        value={search}
        onValueChange={setSearch}
      />

      {/* Getting Started Callout */}
      {!search.trim() && (
        <div className="w-full max-w-[800px] mx-auto px-4 pt-6 pb-6">
          <div className="relative flex items-start gap-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 border border-blue-100 dark:border-blue-900/50 shadow-sm">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/50">
              <svg
                className="w-6 h-6 text-blue-600 dark:text-blue-400"
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
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Welcome to the Prompt Library
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                Browse our collection of ready-to-use prompts for the Webflow
                MCP below, or use the search bar above to find prompts by name,
                description, or tags.
              </p>
              <div className="flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-medium">
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

      <CommandList className="max-h-[calc(100vh-200px)]">
        {filteredPrompts.length === 0 ? (
          <CommandEmpty className="py-6 text-center text-base text-muted-foreground">
            No prompts found.
          </CommandEmpty>
        ) : (
          <CommandGroup>
            <div className="grid gap-5 py-[30px] w-full max-w-[800px] mx-auto md:grid-cols-2">
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
