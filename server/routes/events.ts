import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'

import { getUser } from '../kinde'

import { db } from '../db'
import { experiences as experiencesTable, insertExperiencesSchema } from '../db/schema/experience'
import { eq, desc, count, and } from 'drizzle-orm'

import { createExperienceSchema } from '../sharedTypes'

export const experiencesRoute = new Hono()

// get all experiences
.get('/all-events', async (c) => {
    const experiences = await db 
        .select()
        .from(experiencesTable)
        .orderBy(desc(experiencesTable.createdAt))
    
    return c.json({ experiences: experiences})
})

// get experience user id
.get('/', getUser, async (c) => {
    const user = c.var.user

    const experiences = await db 
        .select()
        .from(experiencesTable)
        .where(eq(experiencesTable.userId, user.id))
        .orderBy(desc(experiencesTable.createdAt))

    return c.json({ experiences: experiences })
})

// add experience
.post('/', getUser, zValidator('json', createExperienceSchema), async (c) => {
    const experience = await c.req.valid('json')
    const user = c.var.user 

    const validatedExperience = insertExperiencesSchema.parse({
        ...experience,
        userId: user.id
    })

    const result = await db
        .insert(experiencesTable)
        .values(validatedExperience)
        .returning()
        .then((res) => res[0])

    c.status(201)
    return c.json(result)
})

// get total number of experiences
.get('/total-experiences', async (c) => {
    const total = await db
        .select({ count: count() })
        .from(experiencesTable)

    return c.json({ total })
})

// get specific experience by id
.get('/:id{[0-9]+}', async (c) => {
    const id = Number.parseInt(c.req.param('id'))

    const experience = await db
        .select()
        .from(experiencesTable)
        .where(eq(experiencesTable.id, id))
        .then(res => res[0])

    if (!experience) {
        return c.notFound()
    }
    return c.json({experience: experience})
})

// delete experience
.delete('/:id{[0-9]+}', getUser, async (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const user = c.var.user

    const experience = await db
        .delete(experiencesTable)
        .where(and(eq(experiencesTable.userId, user.id), eq(experiencesTable.id, id)))
        .returning()
        .then(res => res[0])

    if (!experience) {
        return c.notFound()
    }
    return c.json({ experience: experience })
})