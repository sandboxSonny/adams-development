import { defineForm } from "@sandboxsonny/ace-kit";

// The contact form's fields. Ace Kit syncs this to CMS Ace (`npx ace-kit sync`), which keeps what visitors send and
// emails whoever is set under Forms > Contact in the CMS.
export default defineForm({
  handle: "contact",
  name: "Contact",
  fields: [
    { handle: "fullname", label: "Full name", type: "text", required: true },
    { handle: "email", label: "Email", type: "email", required: true },
    { handle: "message", label: "Message", type: "textarea", required: true },
  ],
});
