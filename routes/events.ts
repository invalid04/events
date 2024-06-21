import { Hono } from 'hono'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const experienceSchema = z.object({
    id: z.number().int().positive().min(1),
    title: z.string(),
    desc: z.string(),
    date: z.string(),
    time: z.string(),
    location: z.string(),
    maxAttendance: z.string()
})

type Experience = z.infer<typeof experienceSchema>

const createPostSchema = experienceSchema.omit({id: true})

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

export const eventsRoute = new Hono()
.get('/', (c) => {
    return c.json({ experience: fakeExperiences })
})
.post('/', zValidator('json', createPostSchema), async (c) => {
    const experience = await c.req.valid('json')
    fakeExperiences.push({...experience, id: fakeExperiences.length})
    c.status(201)
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
.delete('/:id{[0-9]+}', (c) => {
    const id = Number.parseInt(c.req.param('id'))
    const index = fakeExperiences.findIndex(experience => experience.id === id)
    if (index === -1) {
        return c.notFound()
    }

    const deletedExperience = fakeExperiences.splice(index, 1)[0]
    return c.json({ experience: deletedExperience })
})