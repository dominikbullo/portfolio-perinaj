// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://perinaj.com",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) => !page.includes("/cv"),
      serialize(item) {
        item.lastmod = new Date().toISOString().slice(0, 10);
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
