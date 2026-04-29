import { db } from '../db/index.js';
import { products } from '../db/schema.js';
import { not, eq } from 'drizzle-orm';

async function findNonImported() {
  console.log('--- Searching for Non-Catalogue Products ---');
  
  // All products with price NOT 0.00
  const results = await db.select().from(products).where(not(eq(products.price, '0.00')));
  
  console.log(`Count: ${results.length}`);
  results.forEach(r => {
    console.log(`- [${r.id}] ${r.name} (Price: ${r.price})`);
  });
  
  process.exit(0);
}

findNonImported().catch(console.error);
