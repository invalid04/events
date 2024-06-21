import { Hono } from 'hono'
import { z } from 'zod'

type Event = {
    id: number,
    title: string,
    desc: string,
    date: string,
    time: string,
    location: string,
    maxAttendance: string,
}

const fakeEvents: Event[] = [
    {
        "id": 1,
        "title": "Movie Night",
        "desc": "Screening of Casablanca",
        "date": "2024-07-12",
        "time": "19:00",
        "location": "Central Park",
        "maxAttendance": "100"
      },
      {
        "id": 2,
        "title": "Board Game Club",
        "desc": "Bring your favorite game to share!",
        "date": "2024-06-28",
        "time": "18:00",
        "location": "Community Center",
        "maxAttendance": "15"
      }
]

const createPostSchema = z.object({
    title: z.string(),
    desc: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    maxAttendance: z.string()
})

export const eventsRoute = new Hono()
.get('/', (c) => {
    return c.json({ events: fakeEvents })
})
.post('/', async (c) => {
    const data = await c.req.json()
    const event = createPostSchema.parse(data)
    console.log(event)
    return c.json(event)
})