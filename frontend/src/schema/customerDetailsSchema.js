import z from "zod";

export const customerDetailsSchema = z.object({
  name: z.string().optional(),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  message: z.string().min(1, "Message is required"),
});
