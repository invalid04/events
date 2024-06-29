import { z } from 'zod'

import { Hono } from 'hono'

import { experiences as experiencesTable } from '../db/schema/experience'
import { eventAttendees as attendeesTable } from '../db/schema/eventAttendees'
import { db } from '../db'
import { count, eq } from 'drizzle-orm'

const attendEventSchema = z.object({
    eventId: z.number(),
    userId: z.string()
})

export const attendeesRoute = new Hono()

// attend an event

.post('/attend', async (c) => {
    const { eventId, userId } = attendEventSchema.parse(await c.req.json())

    const event = await db
        .select()
        .from(experiencesTable)
        .where(eq(experiencesTable.id, eventId))
        .execute()
    
    if (event.length === 0) {
        return c.json({ error: 'Event not found'}, 404)
    }

    const attendeesCount = await db
        .select()
        .from(attendeesTable)
        .where(eq(attendeesTable.eventId, eventId))
        .execute()

    await db.insert(attendeesTable).values({
        eventId,
        userId
    }).execute()

    return c.json({ sucess: true })
})

// get attendees for event

.get('/:id{[0-9]+}', async (c) => {
    const eventId = Number.parseInt(c.req.param('id'))

    const total = await db
        .select({ count: count() })
        .from(attendeesTable)
        .where(eq(attendeesTable.eventId, eventId))
            
    return c.json({ total })      
})