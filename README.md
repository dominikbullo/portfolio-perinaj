# perinaj.com

Personal portfolio site for [Barbora Perinajová](https://perinaj.com) — Nordic Operations Manager at Nordcloud (IBM), Stockholm.

Built with [Astro](https://astro.build/) and [Tailwind CSS v4](https://tailwindcss.com/).

## Tech Stack

- **Astro** — static site generator
- **Tailwind CSS v4** — utility-first CSS via `@tailwindcss/vite`
- **TypeScript** — type-safe config
- **Tabler Icons** — icon library

## Development

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # production build
npm run preview  # preview production build
```

## Structure

```
src/
├── components/   # Astro section components
├── pages/
│   └── index.astro
├── styles/
│   └── global.css
└── config.ts     # all content lives here
```

All content is managed through `src/config.ts`.

## Template

Based on [DevPortfolio](https://github.com/RyanFitzgerald/devportfolio) by Ryan Fitzgerald (MIT).
