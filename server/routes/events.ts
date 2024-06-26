import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

import { getUser } from '../kinde'

import { db } from '../db'
import { experiences as experiencesTable } from '../db/schema/experience'
import { eq, desc, count } from 'drizzle-orm'

const experienceSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string(),
    maxAttendance: z.string()
})

type Experience = z.infer<typeof experienceSchema>

const createPostSchema = experienceSchema.omit({id: true})


export const experiencesRoute = new Hono()
.get('/', async (c) => {
    const experiences = await db 
        .select()
        .from(experiencesTable)
        .orderBy(desc(experiencesTable.createdAt))
    
    return c.json({ experiences: experiences})
})
.get('/yourexp', getUser, async (c) => {
    const user = c.var.user

    const experiences = await db 
        .select()
        .from(experiencesTable)
        .where(eq(experiencesTable.userId, user.id))
        .orderBy(desc(experiencesTable.createdAt))

    return c.json({ experiences: experiences })
})
.post('/', getUser, zValidator('json', createPostSchema), async (c) => {
    const experience = await c.req.valid('json')
    const user = c.var.user 

    const result = await db.insert(experiencesTable).values({
        ...experience,
        userId: user.id
    }).returning()

    c.status(201)
    return c.json(result)
})
.get('/total-experiences', async (c) => {
    const total = await db
        .select({ count: count() })
        .from(experiencesTable)

    return c.json({ total })
})
.get('/:id{[0-9]+}', getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const experience = fakeExperiences.find(experience => experience.id === id)
    if (!experience) {
        return c.notFound()
    }
    return c.json({experience})
})
.delete('/:id{[0-9]+}', getUser, (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const index = fakeExperiences.findIndex(experience => experience.id === id)
    if (index === -1) {
        return c.notFound()
    }

    const deletedExperience = fakeExperiences.splice(index, 1)[0]
    return c.json({ experience: deletedExperience })
})