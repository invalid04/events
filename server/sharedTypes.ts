import { z } from 'zod'

export const experienceSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string(),
    maxAttendance: z.string()
})

export const createPostSchema = experienceSchema.omit({id: true})