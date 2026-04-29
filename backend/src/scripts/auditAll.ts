import { db } from '../db/index.js';
import { products, categories } from '../db/schema.js';
import { sql, eq } from 'drizzle-orm';

async function auditAll() {
  console.log('--- Comprehensive Product Audit ---');
  
  const allProducts = await db.select({
    id: products.id,
    name: products.name,
    category: categories.nameFallback,
    image: products.image
  })
  .from(products)
  .leftJoin(categories, eq(products.categoryId, categories.id));
  
  console.log(`Total Products: ${allProducts.length}`);
  
  // Group by category
  const grouped: Record<string, any[]> = {};
  allProducts.forEach(p => {
    const cat = p.category || 'Unknown';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(p);
  });
  
  for (const [cat, items] of Object.entries(grouped)) {
    console.log(`\nCategory: ${cat} (${items.length})`);
    if (items.length <= 10) {
      items.forEach(p => console.log(`- [${p.id}] ${p.name}`));
    } else {
      console.log(`- (Showing first 5)`);
      items.slice(0, 5).forEach(p => console.log(`- [${p.id}] ${p.name}`));
    }
  }

  process.exit(0);
}

auditAll().catch(console.error);
