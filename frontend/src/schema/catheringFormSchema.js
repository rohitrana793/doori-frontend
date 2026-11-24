import z from "zod";

export const catheringFormSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(3, "Message is required"),
  place: z.string().optional(),
});
