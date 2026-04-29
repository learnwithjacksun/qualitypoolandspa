import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

async function listTables() {
  console.log('--- Listing All Tables ---');
  const result = await db.execute(sql`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public'
  `);
  
  console.log(result.rows);
  process.exit(0);
}

listTables().catch(console.error);
