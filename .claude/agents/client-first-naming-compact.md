# Client-First Naming Rules (Quick Reference)

> Full documentation: `.claude/agents/client-first-naming.md`

## Class Syntax

| Type | Format | Example | Use Underscore? |
|------|--------|---------|-----------------|
| **Utility** | `keyword-keyword-id` | `text-color-primary` | ❌ NO (dashes only) |
| **Custom** | `folder_element-name` | `nav_logo-wrapper` | ✅ YES (creates folders) |
| **Combo** | `base is-variant` | `button is-brand` | N/A (is- prefix) |

## Variable Syntax

| Type | Format | Example |
|------|--------|---------|
| **Primitive** | `- Base Color: Name Value` | `- Base Color: Brand Blue 600` |
| **Semantic** | `element-style-id` | `background-color-primary` |

## Core Rules (Non-Negotiable)

### Classes
1. **Utility = NO underscore**: Dashes only, global reusable styles
2. **Custom = WITH underscore**: Component/element-specific classes
3. **General → Specific**: Keywords flow left to right (`text-color-primary` not `primary-color-text`)
4. **No abbreviations**: `button` not `btn`, `text-size-large` not `txt-lg`
5. **Avoid deep stacking**: 3+ utilities? Create custom class instead

### Variables
1. **Primitives** use `- Base Color:` prefix, reference concrete values
2. **Semantic tokens** describe role not color (`text-color-primary` NOT `text-color-blue`)
3. **All variables** use kebab-case (no underscores)
4. **Semantic format**: `[element]-[property]-[role]`
5. **Link hierarchy**: Classes → Semantic → Primitives → Values

## Common Patterns

### Utility Classes
```
text-color-{primary|secondary|brand|alternate}
text-size-{small|medium|large}
text-weight-{light|regular|medium|semibold|bold}
background-color-{primary|secondary|tertiary|alternate}
padding-section-{small|medium|large}
margin-{top|bottom|left|right|large|medium|small}
```

### Core Structure
```
page-wrapper                    (outermost)
main-wrapper                    (main content)
section_[identifier]            (section wrapper)
padding-global                  (horizontal spacing)
padding-section-{size}          (vertical spacing)
container-{small|medium|large}  (max-width)
```

### Custom Classes
```
Component:   component_element-name
Nested:      component_subcomp_element
Section:     section_identifier (e.g., section_hero)
Page-specific: [page]_component_element
```

## Decision Tree

**Creating a class?**
- Reusable style across project? → **Utility class** (no underscore)
- Specific to component/section? → **Custom class** (with underscore)
- Variant of existing class? → **Combo class** (is- prefix)

**Naming a variable?**
- Base palette color? → **Primitive** (`- Base Color:` prefix)
- Semantic purpose? → **Semantic token** (`element-style-role`)
- Never describe appearance → Always describe purpose

## Validation Checklist

**Utility Class**:
- [ ] No underscores (dashes only)
- [ ] Describes CSS property/value
- [ ] General → specific keywords
- [ ] Reusable globally

**Custom Class**:
- [ ] Contains underscore(s)
- [ ] Folder/element relationship clear
- [ ] Not duplicating utility functionality

**Variable**:
- [ ] Primitive has `- Base Color:` OR semantic has `element-style-role`
- [ ] Kebab-case, no underscores
- [ ] Describes role, not appearance
- [ ] Theme-agnostic naming

## Anti-Patterns ❌

```
❌ text_color_primary          (underscore in utility)
❌ nav-logo                    (no underscore in custom)
❌ background-color-blue       (named by color not role)
❌ txt-lg, btn-prim           (abbreviations)
❌ hero-subtitle              (custom without underscore)
❌ box, item, thing           (unclear names)
```

## When to Consult Full Guide

Refer to `.claude/agents/client-first-naming.md` for:
- Folder organization strategies
- Typography system details
- Complete variable categories
- Decision-making frameworks
- Integration examples
