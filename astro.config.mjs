// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://perinaj.com",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/cv"),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
