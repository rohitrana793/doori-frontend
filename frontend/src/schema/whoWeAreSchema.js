import { z } from "zod";

export const whoWeAreSchema = z.object({
  title: z.string().min(1, "Title is required"),

  subtitle: z.string().min(1, "Sub title is required"),

  description: z.string().min(1, "Description is required"),

  services: z
    .array(
      z.object({
        name: z.string().min(1, "Service is required"),
      }),
    )
    .min(1, "At least one service is required"),

  image1: z.any().optional(),

  image2: z.any().optional(),
});
