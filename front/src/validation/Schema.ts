import { z } from "zod";

export const RSchema = z.object({
    first: z.string().trim()
        .min(2, { message: "There MUST be a First Name!"})
        .max(120, { message: "Max of 120 or Less!"}),
    last: z.string().trim()
        .min(2, { message: "There MUST be a Last Name!"})
        .max(120, { message: "Max of 120 or Less!"}),
    email: z.email().trim().min(3, { 
        message: "The Email is Required!"
    }),
    password: z.string().trim().min(6, {
        message: "Must be at Least Six Characters!"
    }),
    image: z.string().trim().optional().default("")
});

export const LSchema = z.object({
    email: z.email().trim().min(3, { 
        message: "The Email is Required!"
    }),
    password: z.string().trim().min(6, {
        message: "Must be at Least Six Characters!"
    })
});

export type RType = z.infer<typeof RSchema>;
export type LType = z.infer<typeof LSchema>;



