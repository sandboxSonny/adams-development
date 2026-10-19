export const prerender = false;

import { getFormSubmitResponse } from "@sandboxsonny/ace-kit/astro";
import type { APIRoute } from "astro";

// The contact form posts here. CMS Ace stores the message and emails the owners (set under Forms in the CMS).
export const POST: APIRoute = ({ request }) => getFormSubmitResponse({ request }, "contact");
