import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import config from "./src/config/config.json";

// https://astro.build/config
export default defineConfig({
  site: config.site.base_url || "https://commaagents.com",
  base: config.site.base_path || "/",
  trailingSlash: "ignore",
  output: "static",
  integrations: [react(), sitemap(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "one-dark-pro",
      wrap: true,
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Use the modern Sass API so `loadPaths` is honored (the legacy API
          // only supports `includePaths`) and deprecation warnings go away.
          api: "modern-compiler",
          // Allow `@use "styles/tokens" as *` to resolve from src/ across
          // both React CSS Modules and Astro scoped <style> blocks.
          loadPaths: ["src"],
        },
      },
    },
  },
});
