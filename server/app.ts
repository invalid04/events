import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { eventsRoute } from './routes/events'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath('/api')
.route('/events', eventsRoute)

export default app

export type ApiRoutes = typeof apiRoutes