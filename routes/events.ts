import { Hono } from 'hono'

export const eventsRoute = new Hono()
.get('/', (c) => {
    return c.json({ events: [] })
})
.post('/', (c) => {
    return c.json({})
})