import { db } from '../db/index.js';
import { products } from '../db/schema.js';
import { or, like } from 'drizzle-orm';

async function searchKeywords() {
  console.log('--- Searching for Keywords ---');
  
  const keywords = ['Pool', 'Cover', 'Pump', 'Filter', 'Chemical', 'Salt', 'Chlorinator'];
  const filters = keywords.map(kw => like(products.name, `%${kw}%`));
  const filtersDesc = keywords.map(kw => like(products.description, `%${kw}%`));

  const results = await db.select().from(products).where(or(...filters, ...filtersDesc));
  
  console.log(`Count: ${results.length}`);
  results.forEach(r => {
    console.log(`- [${r.id}] ${r.name}`);
  });
  
  process.exit(0);
}

searchKeywords().catch(console.error);
