# Rigged Motion Studios

This repository contains a lightweight React application for the Rigged Motion Studios portfolio. The previous Supabase-based auction and authentication features have been removed and replaced with a simple project showcase.

## Development

```bash
npm install
npm run dev
```

To build the site for production:

```bash
npm run build
```

## Adding Projects

Projects live as Markdown files in `src/content/projects`. Each file starts with YAML front matter that defines metadata (e.g. title, date, optional `link` and `thumbnail`) followed by a Markdown body.

1. Create a new file in `src/content/projects` with a unique slug, for example `ufo-beam.md`.
2. Populate it like the following:

```markdown
---
title: "UFO Beam Spectacle"
date: "2024-02-01"
link: "/projekte/ufo-beam"
thumbnail: "/assets/versteigerung/ufo_video.mp4"
---
Dieses Projekt wurde ursprünglich als Highlight einer Auktion präsentiert und erfolgreich verkauft.
```

3. The app automatically parses all Markdown files in this folder and lists them on the `/projekte` page.
4. If a `link` is provided, the project card will navigate to that route, allowing for a custom React showcase. Without a `link`, the Markdown content renders on a generic project detail page.

See [`src/content/projects/ufo-beam.md`](src/content/projects/ufo-beam.md) for the complete example.
