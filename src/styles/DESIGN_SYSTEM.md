# Prompt Library Design System

This document outlines the design system for the Prompt Library, which is based on the Webflow About/Careers site design system.

## Colors

### Brand Colors

The color system uses CSS custom properties defined in `global.css`:

| Color | Variable | Hex | Usage |
|-------|----------|-----|-------|
| Black | `--color-black` | `#080808` | Primary text on light backgrounds |
| Gray 900 | `--color-gray-900` | `#171717` | Dark backgrounds |
| Gray 800 | `--color-gray-800` | `#222222` | Dark UI elements |
| Gray 700 | `--color-gray-700` | `#363636` | Secondary text on light backgrounds |
| Gray 600 | `--color-gray-600` | `#5a5a5a` | Body text on light backgrounds (AA compliant) |
| Gray 500 | `--color-gray-500` | `#757575` | Lightest gray on white (AA compliant) |
| Gray 400 | `--color-gray-400` | `#898989` | Darkest gray on black (AA compliant) |
| Gray 300 | `--color-gray-300` | `#ababab` | Borders and dividers |
| Gray 200 | `--color-gray-200` | `#d8d8d8` | Light borders, text on dark backgrounds |
| Gray 100 | `--color-gray-100` | `#f0f0f0` | Light backgrounds |
| White | `--color-white` | `#ffffff` | Primary backgrounds, text on dark |
| Webflow Blue | `--color-blue` | `#146ef5` | Primary brand color, CTAs |
| Blue 400 | `--color-blue-400` | `#3b89ff` | Lighter blue accent |
| Blue 600 | `--color-blue-600` | `#0055d4` | Darker blue hover state |

### Semantic Colors

These map to the brand colors and provide functional roles:

**Light Mode:**
- `--background`: White
- `--foreground`: Black
- `--primary`: Webflow Blue
- `--secondary`: Gray 100
- `--muted`: Gray 100
- `--muted-foreground`: Gray 600
- `--border`: Gray 200

**Dark Mode:**
- `--background`: Black
- `--foreground`: White
- `--primary`: Webflow Blue
- `--secondary`: Gray 900
- `--muted`: Gray 800
- `--muted-foreground`: Gray 400
- `--border`: Gray 800

## Typography

### Font Family
- Primary: `WFVisualSans` (variable font)
- Fallbacks: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`

### Font Weights
- Regular: `400`
- Medium: `500`
- Semi-bold: `600`

### Type Scale

| Element | Class | Size | Line Height | Weight | Letter Spacing |
|---------|-------|------|-------------|--------|----------------|
| H0 | `.h0` | 8rem (128px) | 1.04 | 600 | 0.01em |
| H1 | `h1`, `.h1` | 5.313rem (85px) | 1.04 | 600 | 0.01em |
| H2 | `h2`, `.h2` | 3.5rem (56px) | 1.04 | 600 | 0.01em |
| H3 | `h3`, `.h3` | 2.313rem (37px) | 1.04 | 600 | 0.01em |
| H4 | `h4`, `.h4` | 1.5rem (24px) | 1.3 | 600 | 0.02em |
| H5 | `h5`, `.h5` | 1rem (16px) | 1.3 | 600 | - |
| H6 | `h6`, `.h6` | 0.9375rem (15px) | 1 | 500 | - |
| Paragraph XXL | `.paragraph-xxl` | 2.125rem (34px) | 1.5 | 400 | -0.01em |
| Paragraph XL | `.paragraph-xl` | 1.5rem (24px) | 1.6 | 400 | - |
| Paragraph L | `.paragraph-l` | 1.125rem (18px) | 1.6 | 400 | - |
| Paragraph | `p` | 1rem (16px) | 1.6 | 400 | - |
| Paragraph S | `.paragraph-s` | 0.875rem (14px) | 1.6 | 400 | - |
| Eyebrow | `.eyebrow` | 0.9375rem (15px) | 1.3 | 500 | 0.1em |
| Caption | `.caption` | 0.75rem (12px) | 1.3 | 500 | 0.04em |

### Typography Usage Guidelines

1. **Use semantic HTML tags** for proper document structure (h1, h2, h3, etc.)
2. **Use utility classes** to override visual styles while maintaining semantic order
3. **Line height** of 1.04 is used for large headings to maintain tight vertical rhythm
4. **Line height** of 1.6 is used for body text to ensure readability
5. **Eyebrow** and **Caption** styles include uppercase transformation

## Buttons

### Button Variants

#### Primary Button (`.wf-button-primary`)
- Background: Webflow Blue (`#146ef5`)
- Text: White
- Shadow: Layered inset/outset shadows for depth
- Hover: Blue 600 (`#0055d4`)
- Border radius: 4px
- Padding: 1em × 1.5em
- Font size: 0.9375rem (15px)
- Font weight: 600

#### Secondary Button (`.wf-button-secondary`)
- Background: White
- Text: Gray 700 (`#363636`)
- Border: 1px solid Gray 200
- Shadow: Subtle depth with inset shadow
- Hover: Gray 100 background
- Border radius: 4px

#### Copy Button (`.wf-copy-button`)
- Background: Gray 100
- Text: Gray 700
- Border: 1px solid Gray 200
- Smaller padding: 0.5rem × 0.75rem
- Font size: 0.875rem (14px)
- Copied state: Transforms to Primary button style

### Button States

All buttons include:
- **Hover**: Smooth background and border color transitions
- **Focus**: 2px blue outline with 2px offset for accessibility
- **Transition**: 300ms cubic-bezier easing for natural movement

## Accessibility

### Color Contrast
- **Gray 500 on White**: Lightest accessible gray (AA compliant)
- **Gray 400 on Black**: Darkest accessible gray (AA compliant)
- **Gray 600 on White**: Recommended for body text
- **Gray 200 on Black**: Recommended for body text on dark backgrounds

### Focus States
All interactive elements include visible focus indicators with:
- 2px solid blue outline
- 2px offset from element
- Maintained for keyboard navigation accessibility

## Usage Examples

### Hero Section
```css
.hero-title {
  @apply h0 mb-16;
}

.hero-subtitle {
  @apply paragraph-xxl;
}
```

### Content Section
```css
.section-title {
  @apply h1 mb-32;
}

.section-description {
  @apply paragraph-xl text-gray-600;
}
```

### Cards
```css
.card-title {
  @apply h3 mb-8;
}

.card-body {
  @apply paragraph text-gray-600;
}
```

## Implementation Notes

1. **CSS Variables**: All colors use CSS custom properties for easy theming
2. **Dark Mode**: Automatically switches using `.dark` class on root element
3. **Tailwind Integration**: Design tokens work seamlessly with Tailwind utilities
4. **Component Styles**: Button styles are isolated in `components/_buttons.css`

## References

- Source: Webflow About/Careers site design system
- Style guide pages: `/styles/type` and `/styles/color` on the Webflow site
- Variable collections: Color, Theme, Spacing, Typography
