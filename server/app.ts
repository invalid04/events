import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { experiencesRoute } from './routes/events'
import { attendeesRoute } from './routes/attendee'
import { authRoute } from './routes/auth'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath('/api')
.route('/experiences', experiencesRoute)
.route('/attendees', attendeesRoute)
.route('/', authRoute)

export default app

export type ApiRoutes = typeof apiRoutes 