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
    <Command className="bg-white" shouldFilter={false}>
      <CommandInput
        placeholder="Search prompts..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList className="max-h-[calc(100vh-200px)]">
        {filteredPrompts.length === 0 ? (
          <CommandEmpty className="py-6 text-center text-base text-[#555]">
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
