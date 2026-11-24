import z from "zod";

export const addRestaurantSchema = z.object({
  name: z.string().min(1, "Name is required"),

  address: z.string().min(1, "Address is required"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  phoneNumber: z.string().min(1, "Phone number is required"),

  image: z.any().optional(),
});
