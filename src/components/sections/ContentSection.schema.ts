import { defineSection } from "@sandboxsonny/ace-kit";

export default defineSection({
  handle: "content-section",
  name: "Content Section",
  fields: [
    { handle: "invert", label: "Invert", type: "checkbox" },
    { handle: "content", label: "Content", type: "richtext" },
  ],
});
