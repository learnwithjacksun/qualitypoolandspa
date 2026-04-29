import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from '@hono/node-server/serve-static'
import 'dotenv/config'
import * as schema from './schema.js'
import { productsRouter } from './routes/products.js'
import { categoriesRouter } from './routes/categories.js'

const app = new Hono()

app.use('*', cors())
// Static files
app.use('/*', serveStatic({ root: './public' }))

app.get('/', (c) => {
  return c.text('Quality Pool & Spa API')
})

app.route('/products', productsRouter)
app.route('/categories', categoriesRouter)

const port = Number(process.env.PORT) || 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
