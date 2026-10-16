import { defineSection } from "@sandboxsonny/ace-kit";

export default defineSection({
  handle: "image-with-text",
  name: "Image with Text",
  fields: [
    { handle: "invert", label: "Invert", type: "checkbox" },
    { handle: "reverse", label: "Reverse", type: "checkbox" },
    { handle: "image", label: "Image", type: "image" },
    { handle: "title", label: "Title", type: "text" },
    { handle: "content", label: "Content", type: "textarea" },
    { handle: "button", label: "Button", type: "link" },
  ],
});
