import { defineSection } from "@sandboxsonny/ace-kit";

export default defineSection({
  handle: "steps",
  name: "Steps",
  fields: [],
  blocks: {
    step: {
      name: "Step",
      fields: [
        { handle: "number", label: "Number", type: "number", required: true },
        { handle: "title", label: "Title", type: "text" },
        { handle: "description", label: "Description", type: "text" },
      ],
    },
  },
});
