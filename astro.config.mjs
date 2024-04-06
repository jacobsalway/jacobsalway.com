import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/static";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  site: "https://www.jacobsalway.com",
  integrations: [tailwind(), sitemap()],
  prefetch: true,
  output: "static",
  adapter: vercel(),
});
