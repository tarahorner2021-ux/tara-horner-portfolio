# Tara Horner — Portfolio

Plain HTML/CSS/JS build of the Figma design — no build step, no dependencies. Open `index.html` in a browser, or serve the folder with any static server.

## Pages
- `index.html` — home page (nav, hero, case studies, about, process accordion, contact)
- `case-study-homepage-revamp.html` — case study detail page for the "Homepage revamp" project, linked from the featured case-study card on the home page. Reuses the home page's nav (not the 4-link nav from that Figma frame) so navigation stays consistent across the site.
- `case-study-pulse.html` — case study detail page for "Pulse", the mobile companion app, linked from the "Pulse mobile app" thumbnail on the home page. Same nav/footer pattern as the homepage-revamp case study.
- `case-study-3rd-party-integrations.html` — case study detail page for the integrations marketplace (discover/configure/manage 40+ connectors), linked from the "3rd-party integrations" thumbnail on the home page. All three case studies now chain together via the "previous/next project" footer: Homepage revamp → Pulse → 3rd-party integrations.

## Files
- `styles.css` — shared styling: design tokens, nav, buttons, `.reveal` scroll animations, and all home-page-specific sections
- `case-study.css` — styling specific to the case-study detail page (hero, stats strip, before/after, annotated screenshot, product-vision tabs, principles grid, outcome comparison, next-project footer)
- `script.js` — shared interactions: sticky/blurring nav with active-link tracking, mobile menu, scroll-reveal animations, the "How I work" accordion, a magnetic hover effect on the primary button, gentle parallax on the hero photo collage, and the featured-card crossfade loop
- `case-study.js` — the Discover / Explore / Act tab switcher on the case-study page
- `assets/` — images (see below)

## About the images
This session couldn't reach `figma.com` to pull your photos and thumbnails directly (network policy on this account blocks it, from both the cloud workspace and your linked computer) — real images have come in through what you've uploaded in chat, and been extracted/cleaned up from there. Anything still listed below as a placeholder is a generated stand-in in your palette, sized to the dimensions the design calls for, so the layout is correct — just needs the real export swapped in.

Export from the Figma file (right-click the layer → Export) and replace the file of the same name in `assets/` — the HTML doesn't need to change, since it references these exact filenames.

### Home page — real images in place
`collage-1.png`…`collage-8.png`, `case-featured-1.jpg`/`-2.jpg`/`-3.jpg`, `case-1.jpg`…`case-5.jpg`, `ai-logo-card.jpg`, `portrait.jpg`

### Case study page — all images now real
- `cs-start-state.jpg`, `cs-chat-history.jpg`, `cs-active-chat.jpg` — hero image stack (extracted from your Figma SVG export)
- `cs-old-homepage.jpg`, `cs-new-start-state.jpg` — the "before" (old Acoustic dashboard) and "after" (new homepage) panels in the challenge section
- `cs-vision-detail.jpg`, `cs-explore-panel.jpg`, `cs-act-panel.jpg` — your own annotated mockups (with the arrow callouts) for the Discover / Explore / Act tabs under Product vision

Note: `cs-chat-history.jpg` is reused in "the opportunity" section's annotated screenshot (it shows the sidebar + recommendation tiles the callouts describe) — send a distinct image if you'd rather have one there.

The Explore and Act tab copy was transcribed directly from your Figma SVG exports (text was flattened to vector paths in the export, so it couldn't be pulled as a hint file — I rendered the SVGs and read the copy off the rendered image).

A couple of notes on the case-study page while you're reviewing it:
- The arrow-annotation callouts in "the opportunity" section and the old/new workflow comparison were rebuilt as clean, responsive components (a numbered callout list, a two-panel before/after with a connecting arrow) rather than pixel-exact copies of the Figma overlay artwork — flag it if you want them closer to the original layout.

### Pulse case study page — real images, pulled directly from Figma
This one came from a different Figma file (`Mobile-app (Copy)`), and since it's a native Figma file rather than an export you sent me, I was able to render the screens directly with the Figma MCP server:
- `cs2-dashboard.jpg` — the Analyst feed screen (AI Brief card, executive metric tiles, Top categories/Top opportunities lists) — used in both "the challenge" and "the opportunity" sections
- `cs2-customize.jpg` — the "Customize Pulse" drag-to-reorder screen — used as the "after" panel in "the challenge"
- `cs2-segments.jpg` — Total Audience / Lifecycle segment breakdown — used in the hero stack and the "Segments" product-vision tab
- `cs2-contacts.jpg` — the searchable contacts list — used in the "Contacts" product-vision tab
- `cs2-chat.jpg` / `cs2-chat-input.jpg` — the Resonate AI chat screens — `cs2-chat.jpg` is used in the hero stack and the "Resonate AI" product-vision tab; `cs2-chat-input.jpg` (the same conversation with the quick-reply chips and input field visible) isn't placed on the page yet if you want a spot for it

All copy on this page (the AI Brief text, chat conversation, metric labels and numbers, segment names) is transcribed directly from the real text layers in your Figma file — nothing was paraphrased or invented. The stat-strip numbers, section headings and narrative copy around them are mine, written to fit the real screens, the same way they were on the homepage-revamp page.

I resolved a naming question along the way: the app's screens are branded "◈ Resonate AI Chat" in Figma, and one screen's title reads "Customize **Pulse**" — so I took "Pulse" to be the actual product name (Resonate is the in-app AI assistant's name), and renamed the home page thumbnail from "Acoustic mobile app" to "Pulse mobile app" to match. Flag it if you had a different name in mind.

Only the "Discover" tab under Product vision has real content on the homepage-revamp page; "Explore" and "Act" show a coming-soon placeholder until more detail comes from Figma.

### 3rd-party integrations case study — real screens, pulled from two Figma files
The case study copy (Overview, Challenge, Opportunity, Design approach, Solutions, Outcome, Project impact) is transcribed directly from your "Portfolio" file (node 200:853) — nothing paraphrased, with a couple of obvious typos quietly fixed ("emmence" → "immense", "verses" → "versus").

The screens came from your "3rd-party-integrations" documentation file, from the real Microsoft Dynamics 365 integration wizard (not the annotated redline/spec frames, which had placeholder text like "App type" and "logo here" — those weren't used):
- `cs3-hero.jpg` / `cs3-discover-cards.jpg` / `cs3-manage-status.jpg` — cropped and recomposited from one full-resolution screenshot of the real integrations catalog grid (15 connector cards: Salesforce, Snowflake, SAP, Azure, Tableau, and more). `cs3-manage-status.jpg` pastes three individual card crops together to show the connected/pending status dots side by side, the same technique used for the Pulse case study's detail crops.
- `cs3-before-begin.png` — the "Before you begin" step of the Microsoft Dynamics setup wizard.
- `cs3-mapping.png` — the "Audience mapping" step, showing field-level "Matched" validation.

The "Design approach" section reuses the site's existing Discover/Explore/Act tab component (relabeled Discover/Configure/Manage) rather than the stacked-card layout in the original Figma frame, and the "Solutions" grid reuses the site's principle-card pattern with a new sage-tinted variant (`.principle-card.is-sage`) to match the original's color-blocked cards. The project meta bar (Role/Timeline/Platform/Team) and the full-bleed photographic hero are new components, since neither existed on the other two case study pages.

## Regenerating placeholders
`gen_placeholders.py` (Python + Pillow) regenerates the home-page placeholder set if you want to tweak sizes or colors before real photos are ready.
