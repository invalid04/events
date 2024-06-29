import { z } from 'zod'

import { Hono } from 'hono'

import { experiences as experiencesTable } from '../db/schema/experience'
import { eventAttendees as attendeesTable } from '../db/schema/eventAttendees'
import { db } from '../db'

export const attendeesRoute = new Hono()

const attendEventSchema = z.object({
    eventId: z.number(),
    userId: z.string()
});