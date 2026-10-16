import { z } from "zod";

export const contactSchema = z.object({
  fullname: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;
