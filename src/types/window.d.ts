import type { animate } from "motion";

declare global {
  interface Window {
    /** Set by FooterScripts.astro so the components' own scripts can animate. */
    motion: { animate: typeof animate };
  }
}
