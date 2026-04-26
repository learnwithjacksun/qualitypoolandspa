import { z } from "zod";

export const contactSchema = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z.string().min(1, { message: "Phone number is required" }),
    branch: z.string().min(1, { message: "Branch is required" }),
    message: z.string().min(1, { message: "Message is required" }),
})

export type ContactSchema = z.infer<typeof contactSchema>;