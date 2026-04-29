import { Hono } from 'hono'
import { db } from '../db/index.js'
import { categories, products } from '../db/schema.js'
import { eq } from 'drizzle-orm'

export const productsRouter = new Hono()

productsRouter.get('/', async (c) => {
  try {
    const categoryId = c.req.query('categoryId')
    const categorySlug = c.req.query('categorySlug')
    
    if (categorySlug) {
      const allProducts = await db
        .select({
          id: products.id,
          name: products.name,
          categoryId: products.categoryId,
          description: products.description,
          price: products.price,
          image: products.image,
          createdAt: products.createdAt,
        })
        .from(products)
        .innerJoin(categories, eq(products.categoryId, categories.id))
        .where(eq(categories.slug, categorySlug))
        
      return c.json(allProducts)
    }

    if (categoryId) {
      const allProducts = await db.select().from(products).where(eq(products.categoryId, parseInt(categoryId)))
      return c.json(allProducts)
    }

    const allProducts = await db.select().from(products)
    return c.json(allProducts)
  } catch (error) {
    console.error(error);
    return c.json({ error: 'Failed to fetch products' }, 500)
  }
})

productsRouter.post('/', async (c) => {
  try {
    const body = await c.req.json()
    const newProduct = await db.insert(products).values(body).returning()
    return c.json(newProduct[0], 201)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Failed to create product' }, 500)
  }
})
