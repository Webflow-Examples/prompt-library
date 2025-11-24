# Prompt Library

A library of reusable prompts for Webflow MCP tools, displayed as an interactive searchable interface. This application is embedded as an iFrame in Webflow documentation.

## Overview

This repository contains a collection of prompts that are used across Webflow's MCP (Model Context Protocol) tools. Each prompt is stored as a structured JSON/YAML pair, making them easy to maintain, test, and reuse.

**Note:** This repository is a subpackage of the [openapi repo](https://github.com/webflow-examples/openapi) and stays in sync with it to ensure consistency across the Webflow ecosystem.

## Project Structure

```
/
├── src/
│   ├── prompts/          # Prompt definitions
│   │   └── {prompt-id}/
│   │       ├── prompt.json    # Metadata (id, description, tags, href, etc.)
│   │       └── prompt.yml     # Prompt content
│   ├── components/       # React components
│   ├── pages/           # Astro pages
│   └── layouts/         # Page layouts
├── public/              # Static assets
└── dist/               # Build output (deployed to CF Workers)
```

## Adding Prompts

To add a new prompt to the library:

1. **Create a new directory** in `src/prompts/` with your prompt ID (kebab-case):

   ```bash
   mkdir src/prompts/your-prompt-id
   ```

2. **Create `prompt.json`** with metadata:

   ```json
   {
     "id": "your-prompt-id",
     "icon": "https://example.com/icon.svg",
     "description": "A clear description of what this prompt does",
     "tags": ["webflow", "category", "tag"],
     "href": "/mcp/prompts/your-prompt-id",
     "variables": {},
     "metadata": {},
     "contentFile": null
   }
   ```

3. **Create `prompt.yml`** with the actual prompt content:

   ```yaml
   # Your prompt content here
   # Can include variables using {{variableName}} syntax
   ```

4. **Test thoroughly** - See [Testing](#testing) section below

5. **Commit and push** - The prompt will automatically appear in the library

## Prompt Structure

### `prompt.json` Fields

- `id` (required): Unique identifier in kebab-case
- `icon` (optional): URL to an icon image
- `description` (required): Brief description shown in the card
- `tags` (required): Array of tags for searchability
- `href` (required): Link destination (typically `/mcp/prompts/{id}`)
- `variables` (optional): Variable definitions for dynamic prompts
- `metadata` (optional): Additional metadata
- `contentFile` (optional): Reference to external content file

### `prompt.yml`

Contains the actual prompt text. Supports:

- YAML frontmatter
- Variable interpolation: `{{variableName}}`
- Multi-line content

## Testing

**Test prompts thoroughly before adding them to the library.**

1. **Test the prompt content** - Ensure it works correctly with the intended MCP tool
2. **Test variable interpolation** - If using variables, verify they work as expected
3. **Test the UI** - Verify the prompt card displays correctly:
   - Icon loads properly
   - Description is clear and accurate
   - Tags are appropriate
   - Link works correctly
4. **Test search functionality** - Ensure the prompt is discoverable via search
5. **Test in iFrame context** - Verify it works when embedded in Webflow docs

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
npm install
```

### Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Installs dependencies                        |
| `npm run dev`     | Starts local dev server at `localhost:4321`  |
| `npm run build`   | Build your production site to `./dist/`      |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run deploy`  | Build and deploy to Cloudflare Workers       |

## Deployment

The application is currently hosted on **Cloudflare Workers** but this can be changed if needed.

### Deploy to Cloudflare Workers

```bash
npm run deploy
```

This will:

1. Build the Astro application
2. Deploy to Cloudflare Workers using Wrangler

### Configuration

Deployment configuration is managed in `wrangler.jsonc` and `astro.config.mjs`.

## Usage

### As an iFrame in Webflow Docs

This application is designed to be embedded as an iFrame in Webflow documentation:

```html
<iframe
  src="https://your-deployment-url.com"
  width="100%"
  height="600px"
  frameborder="0"
></iframe>
```

The interface provides:

- **Search functionality** - Filter prompts by name, description, or tags
- **Prompt cards** - Visual cards with icons, descriptions, and tags
- **Direct links** - Each card links to the prompt's destination (opens in new window)

## Integration with OpenAPI Repo

This repository is a subpackage of the [openapi repo](https://github.com/webflow-examples/openapi) and stays in sync with it. Changes here should be coordinated with the main repository to ensure consistency.

## Contributing

1. Create a new prompt following the structure above
2. Test thoroughly (see [Testing](#testing))
3. Submit a pull request
4. Ensure all prompts follow the established patterns and conventions

## License

[Add your license here]
