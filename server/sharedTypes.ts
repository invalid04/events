import { z } from 'zod'

import { insertExperiencesSchema } from './db/schema/experience'
import { insertAttendeeSchema } from './db/schema/eventAttendees'


export const createExperienceSchema = insertExperiencesSchema.omit({
    userId: true,
    createdAt: true,
    id: true,
})

export const addAttendeeSchema = insertAttendeeSchema.omit({
    userId: true,
    createdAt: true,
    id: true,
})

export type CreateExperience = z.infer<typeof createExperienceSchema>