import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    category: z.string().min(1, "Please select a category"),
    description: z.string().optional(),
    price: z.string().optional(),
})

export type ProductSchema = z.infer<typeof productSchema>;