// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";

import node from "@astrojs/node";
import ace from "@sandboxsonny/ace-kit/astro/integration";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  // The site's domain in CMS Ace. Ace Kit reads it from here (ACE_SITE_DOMAIN, if set, wins), so the dev server can find
  // or make your own private copy of this site to work on.
  site: "https://adamsdevelopment.co.uk",
  // Pages are rendered on each request so they always show the CMS's live content.
  output: "server",
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Mulish",
      cssVariable: "--font-mulish",
    },
  ],
  adapter: node({ mode: "standalone" }),
  // Secrets read when the server runs, not baked in when the site is built (a plain `import.meta.env.X` is, so on a
  // build that can't see the variable it is undefined for good). Optional so a build without it still works.
  env: {
    schema: {
      RESEND_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  // Ace Kit connects the site to CMS Ace: it declares ACE_API_URL, ACE_SITE_DOMAIN and ACE_PREVIEW_ADMIN_ORIGIN, and
  // lets the CMS's admin app frame the site for live preview.
  integrations: [ace(), react()],
});
