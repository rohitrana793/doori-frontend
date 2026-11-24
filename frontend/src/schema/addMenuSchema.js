import z from "zod";

export const addMenuSchema = z.object({
  name: z.string().min(1, "Name is required"),

  description: z.string().optional(),

  image: z.any().optional(),
});
