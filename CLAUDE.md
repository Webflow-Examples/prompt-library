# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a prompt library for Webflow MCP tools, built with Astro and deployed to Cloudflare Workers. The application provides an interactive searchable interface for reusable prompts, designed to be embedded as an iFrame in Webflow documentation. This repository is a subpackage of the [openapi repo](https://github.com/webflow-examples/openapi) and stays in sync with it.

## Development Commands

```bash
# Install dependencies
npm install

# Start local dev server at localhost:4321
npm run dev

# Build production site to ./dist/
npm run build

# Preview build locally (builds first, then runs wrangler dev)
npm run preview

# Build and deploy to Cloudflare Workers
npm run deploy

# Generate Cloudflare Worker types
npm run cf-typegen
```

## Architecture

### Tech Stack
- **Framework**: Astro 5 with React integration
- **Styling**: Tailwind CSS v4 with @tailwindcss/vite
- **UI Components**: Radix UI primitives, shadcn-style components in `src/components/ui/`
- **Deployment**: Cloudflare Workers with SSR adapter
- **Content**: YAML + JSON for prompt definitions

### Prompt Structure

Prompts are stored in `src/prompts/{prompt-id}/` with two files:

1. **`prompt.json`** - Metadata for the UI:
   - `id`: Unique identifier (kebab-case)
   - `icon`: URL to icon image
   - `description`: Brief description shown on the card
   - `tags`: Array of tags for search/filtering
   - `href`: Link destination (typically to Webflow docs)
   - `variables`: Optional variable definitions for dynamic prompts
   - `metadata`: Additional metadata
   - `contentFile`: Optional reference to external content

2. **`prompt.yml`** - Actual prompt content:
   - Structured YAML with sections: `role`, `context`, `task`, `instructions`
   - Supports variable interpolation using `{{variableName}}` syntax
   - Parsed and formatted by `src/lib/promptFormatter.ts`

### Key Components

- **`SearchBar`** (`src/components/SearchBar/`): Main search and filter interface, client-side React component
- **`PromptCard`** (`src/components/PromptCard/`): Individual prompt card display
- **`PromptWithVariables`** (`src/components/PromptWithVariables/`): Handles prompts with variable substitution
- **`CodeBlock`** (`src/components/CodeBlock/`): Code display with syntax highlighting
- **`VariableInput`** (`src/components/VariableInput/`): Input fields for prompt variables

### Content Loading

`src/pages/index.astro` uses Astro's `import.meta.glob()` to load all `prompt.json` files at build time. The prompts array is passed to the Search component which handles filtering and display.

### Formatting Logic

`src/lib/promptFormatter.ts` contains the core logic for converting YAML prompts into readable text:
- Parses YAML structure
- Formats sections (role, context, task, instructions) with Markdown headers
- Handles variable substitution with `{{variable}}` syntax
- Supports nested structures (operating_principles, tool_flow, etc.)

## Adding New Prompts

Create a new directory in `src/prompts/{prompt-id}/` with both `prompt.json` and `prompt.yml` files. The prompt will automatically appear in the library on the next build.

Prompts must be tested thoroughly before adding:
- Verify the prompt works with intended MCP tools
- Test variable interpolation if applicable
- Verify UI display (icon, description, tags, links)
- Test search discoverability
- Test in iFrame context within Webflow docs

## Deployment

The site deploys to Cloudflare Workers. Configuration:
- `wrangler.jsonc`: Worker configuration (name, compatibility flags, assets binding)
- `astro.config.mjs`: Astro config with Cloudflare adapter and image service
- Build output: `./dist/` directory with `_worker.js/index.js` as the entry point

## Integration Notes

This repository syncs with the [openapi repo](https://github.com/webflow-examples/openapi). Coordinate changes with the main repository to ensure consistency across the Webflow ecosystem.
