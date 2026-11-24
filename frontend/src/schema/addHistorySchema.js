import { z } from "zod";

export const addHistorySchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().min(1, "Sub title is required"),

  description: z.string().min(1, "Description is required"),

  location_text: z.string().min(1, "Location is required"),

  image1: z.any().optional(),
  image2: z.any().optional(),
  image3: z.any().optional(),
  image4: z.any().optional(),
});
