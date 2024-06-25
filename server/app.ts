import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { experiencesRoute } from './routes/events'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath('/api')
.route('/experiences', experiencesRoute)

export default app

export type ApiRoutes = typeof apiRoutes