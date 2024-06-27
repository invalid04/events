import { z } from 'zod'

import { insertExperiencesSchema } from './db/schema/experience'


export const createExperienceSchema = insertExperiencesSchema.omit({
    userId: true,
    createdAt: true,
    id: true,
})

export type CreateExperience = z.infer<typeof createExperienceSchema>