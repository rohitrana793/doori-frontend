import z from "zod";

export const franchiseFormSchema = z.object({
  name: z.string().optional(),
  surname: z.string().optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),
  franchise: z.string().min(1, "Franchise is required"),
  message: z.string().min(1, "Message is required"),
});
