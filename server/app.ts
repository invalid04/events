import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { eventsRoute } from './routes/events'

const app = new Hono()

app.use('*', logger())

app.get('/test', c => {
    return c.json({'message': 'test'})
})

app.route('/api/events', eventsRoute)

export default app