import { z } from 'zod'

export const experienceSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z
        .string()
        .min(5, { message: 'Title must be at least 5 characters' })
        .max(29, { message: 'Title must be less than 30 characters' }),
    maxAttendance: z.string().regex(/^\d+(\.\d{1,2})?$/, { message: 'Must enter a number' }),
})

export const createExperienceSchema = experienceSchema.omit({id: true})