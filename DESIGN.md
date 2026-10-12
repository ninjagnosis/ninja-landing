# Ninja Infosys design system

Source of truth for `src/`. Same architecture and principles as the AirFone,
ePahichan and LunaCam sites (Astro static, flat surfaces, no bylines, no
breadcrumbs shown, no AI look). Colour comes from the Ninja Infosys logo.

## Colour (`src/styles/tokens.css`)

| Token | Value | Use |
|---|---|---|
| `--canvas` | `#FFFFFF` | page |
| `--surface` | `#F4F6FB` | panels, footer, quiet bands |
| `--subtle` | `#E8EDF7` | quiet fills, hover |
| `--line` | `#D7DEEC` | 1px borders |
| `--ink` / `--ink-muted` | `#11151F` / `#434B5C` | text |
| `--brand` / `--link` | `#0048C0` | buttons, links, focus (7.8:1 on white) |
| `--brand-hover` | `#00338C` | button hover |
| `--accent` | `#DC143C` | selection, large type and markers only (5.0:1) |
| `--stage` | `#0B1F4D` | the one dark band per page (white text 15:1) |
| `--stage-muted` | `#C9D6F0` | secondary text on stage |
| `--stage-line` | `#3A5190` | borders on stage |
| `--ok` / `--error` | `#1B6B3A` / `#B3261E` | form status |

Blue is the action colour. Red is the accent and is never used for body text.
Light only. No shadows, gradients or blur.

## Type

Poppins 400/500/600 for headings, buttons and navigation; Inter (variable) for
reading; Source Serif 4 for blog text. All self-hosted through `@fontsource`.
Body 18px (16px under 480px), line height 1.5, letter spacing 0, sentence case.

## Shape and space

Radius 8px controls, 12px panels. Spacing scale 4 to 128px. Max width 1200px,
gutter 16px (32px from 768px). Sections 96px (64px on phones).

## Copy rules

- Ninja Infosys LLC is the main subject of every page. The Kathmandu entity,
  Ninja Infosys Pvt. Ltd., appears as one supporting line (`NEPAL_LINE`).
- No label above a heading, no badge above a headline, no subtitles or
  taglines under headings, no em-dashes in copy, no marketing adjectives.
- Products are named exactly: eShasan, ePahichan, AirFone, LunaIoT, LunaCam.

## Pages

Home, products (`/products/*`), about, locations, careers, contact,
blog (`/blog`, paginated, tag pages), terms, privacy, cookies.
