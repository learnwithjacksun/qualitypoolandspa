import { Hono } from 'hono'
import { db } from '../db/index.js'
import { categories } from '../db/schema.js'

export const categoriesRouter = new Hono()

categoriesRouter.get('/', async (c) => {
  try {
    const allCategories = await db.select().from(categories)
    return c.json(allCategories)
  } catch (error) {
    return c.json({ error: 'Failed to fetch categories' }, 500)
  }
})

categoriesRouter.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const newCategory = await db.insert(categories).values(body).returning()
    return c.json(newCategory[0], 201)
  } catch (error) {
    return c.json({ error: 'Failed to create category' }, 500)
  }
})
