import { z } from "zod";

const openingHourSchema = z.object({
  status: z.enum(["open", "closed"]),
  openingTime: z.string().optional(),
  closingTime: z.string().optional(),
});

export const addBranchSchema = z.object({
  restaurantName: z.string().min(1, "Restaurant is required"),
  branchName: z.string().min(1, "Branch name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phoneNumber: z.string().optional(),
  image: z.any().optional(),
  openingHours: z.object({
    0: openingHourSchema,
    1: openingHourSchema,
    2: openingHourSchema,
    3: openingHourSchema,
    4: openingHourSchema,
    5: openingHourSchema,
    6: openingHourSchema,
  }),
});
