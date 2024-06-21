import { Hono } from 'hono'

type Event = {
    id: number,
    title: string,
    description: string,
    date: string,
    time: string,
    location: string,
    maxAttendance: string,
}

const fakeEvents: Event[] = [
    {
        "id": 1,
        "title": "Movie Night",
        "description": "Screening of Casablanca",
        "date": "2024-07-12",
        "time": "19:00",
        "location": "Central Park",
        "maxAttendance": "100"
      },
      {
        "id": 2,
        "title": "Board Game Club",
        "description": "Bring your favorite game to share!",
        "date": "2024-06-28",
        "time": "18:00",
        "location": "Community Center",
        "maxAttendance": "15"
      }
]

export const eventsRoute = new Hono()
.get('/', (c) => {
    return c.json({ events: fakeEvents })
})
.post('/', async (c) => {
    const event = await c.req.json()
    console.log(event)
    return c.json(event)
})