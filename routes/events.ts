import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

type Experience = {
    id: number,
    title: string,
    desc: string,
    date: string,
    time: string,
    location: string,
    maxAttendance: string,
}

const fakeExperiences: Experience[] = [
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
    return c.json({ experience: fakeExperiences })
})
.post('/', zValidator('json', createPostSchema), async (c) => {
    const experience = await c.req.valid('json')
    fakeExperiences.push({...experience, id: fakeExperiences.length})
    return c.json(experience)
})
.get('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const experience = fakeExperiences.find(experience => experience.id === id)
    if (!experience) {
        return c.notFound()
    }
    return c.json({experience})
})