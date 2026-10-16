import { defineSection } from "@sandboxsonny/ace-kit";

export default defineSection({
  handle: "contact",
  name: "Contact",
  fields: [
    { handle: "title", label: "Title", type: "text" },
    { handle: "content", label: "Content", type: "textarea" },
    { handle: "email", label: "Email", type: "text" },
    { handle: "detail", label: "Detail", type: "text" },
  ],
});
