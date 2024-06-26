import { z } from 'zod'

import { insertExperiencesSchema } from './db/schema/experience'

export const experienceSchema = insertExperiencesSchema.omit({
    userId: true,
    createdAt: true,
})

export const createExperienceSchema = experienceSchema.omit({id: true})