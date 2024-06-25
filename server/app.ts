import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { experiencesRoute } from './routes/events'
import { authRoute } from './routes/auth'

const app = new Hono()

app.use('*', logger())

const apiRoutes = app.basePath('/api')
.route('/experiences', experiencesRoute)
.route('/', authRoute)

export default app

export type ApiRoutes = typeof apiRoutes