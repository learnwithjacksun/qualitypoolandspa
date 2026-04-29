import { db } from '../db/index.js';
import { products, categories } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// @ts-ignore
import { products as legacyProducts } from './products.ts';

const wellisFile = path.resolve('WELLIS CATALOGUE (1)-pdfjar.json');
const aquaviaFile = path.resolve('Catalogo_AQUAVIA_2026_EN-pdfjar.json');

const imageBasePath = '/images';

async function importFinal() {
    console.log('Clearing existing products...');
    await db.delete(products);

    const dbCategories = await db.select().from(categories);
    const getCategoryId = (slug: string) => {
        const cat = dbCategories.find(c => c.slug === slug);
        return cat ? cat.id : dbCategories[0].id; // Fallback
    };

    console.log('--- Importing Legacy Stefan Products (excluding hot-tubs and swim-spas) ---');
    let importedCount = 0;
    for (const prod of legacyProducts) {
        if (prod.category !== 'hot-tubs' && prod.category !== 'swim-spas') {
            await db.insert(products).values({
                name: prod.name,
                description: prod.description || '',
                price: prod.price.toString(),
                image: prod.image,
                categoryId: getCategoryId(prod.category),
            });
            importedCount++;
        }
    }
    console.log(`Imported ${importedCount} legacy products.`);

    console.log('--- Importing Wellis Models (with prices) ---');
    const wellisData = JSON.parse(fs.readFileSync(wellisFile, 'utf-8'));
    let wellisCount = 0;
    const wellisPrices = [7500, 8900, 10500, 12900, 14500, 16900];
    
    for (const page of wellisData.pages) {
        let name = '';
        if (page.headings && page.headings.length > 0) {
            name = page.headings[0].text.trim();
        } else if (page.paragraphs && page.paragraphs.length > 0) {
            name = page.paragraphs[0].split('\n')[0].trim();
        }
        
        if (name && name.length > 3 && name.length < 50 && name.toUpperCase() === name) {
            const desc = page.paragraphs ? page.paragraphs.join(' ') : name;
            let imgIndex = 1; 
            for (let i = 1; i <= 6; i++) {
                if (fs.existsSync(path.resolve(`public/images/WELLIS/page_${page.pageNumber}_img_${i}.png`))) {
                    imgIndex = i;
                    break;
                }
            }
            const imgPath = `${imageBasePath}/WELLIS/page_${page.pageNumber}_img_${imgIndex}.png`;
            const price = wellisPrices[wellisCount % wellisPrices.length];
            
            await db.insert(products).values({
                name: name,
                description: desc.substring(0, 500),
                price: price.toString(),
                image: imgPath,
                categoryId: getCategoryId('hot-tubs')
            });
            wellisCount++;
        }
    }
    console.log(`Imported ${wellisCount} Wellis products with prices.`);


    console.log('--- Importing Aquavia (Exclusive & Premium ONLY) ---');
    const aquaviaData = JSON.parse(fs.readFileSync(aquaviaFile, 'utf-8'));
    let aquaviaCount = 0;
    let currentLine = '';

    for (const page of aquaviaData.pages) {
        // Track the current product line
        if (page.headings) {
            for (const h of page.headings) {
                const upperH = h.text.toUpperCase();
                if (upperH.includes('EXCLUSIVE')) currentLine = 'EXCLUSIVE';
                if (upperH.includes('PREMIUM')) currentLine = 'PREMIUM';
                if (upperH.includes('AQUALIFE')) currentLine = 'AQUALIFE';
            }
        }
        if (page.paragraphs) {
            for (const p of page.paragraphs) {
                const upperP = p.toUpperCase();
                if (upperP.includes('EXCLUSIVE')) currentLine = 'EXCLUSIVE';
                if (upperP.includes('PREMIUM')) currentLine = 'PREMIUM';
                if (upperP.includes('AQUALIFE')) currentLine = 'AQUALIFE';
            }
        }

        // Only import if we are in Exclusive or Premium line
        if (currentLine === 'EXCLUSIVE' || currentLine === 'PREMIUM') {
            let name = '';
            if (page.headings && page.headings.length > 0) {
                name = page.headings[0].text.trim();
            } else if (page.paragraphs && page.paragraphs.length > 0) {
                name = page.paragraphs[0].split('\n')[0].trim();
            }

            // Exclude pure category pages and generic headers
            if (name && name.length > 3 && name.length < 50 && name !== 'EXCLUSIVE' && name !== 'PREMIUM') {
                const desc = page.paragraphs ? page.paragraphs.join(' ') : name;
                let imgIndex = 1;
                for (let i = 1; i <= 6; i++) {
                    if (fs.existsSync(path.resolve(`public/images/AQUAVIA/page_${page.pageNumber}_img_${i}.png`))) {
                        imgIndex = i;
                        break;
                    }
                }
                const imgPath = `${imageBasePath}/AQUAVIA/page_${page.pageNumber}_img_${imgIndex}.png`;
                
                // Try and see if this was in products.ts for a price match, otherwise use placeholder
                // @ts-ignore
                const exactMatch = legacyProducts.find((p: any) => p.name.toUpperCase().includes(name.toUpperCase()));
                const price = exactMatch ? exactMatch.price : 9500;

                await db.insert(products).values({
                    name: name,
                    description: desc.substring(0, 500),
                    price: price.toString(),
                    image: imgPath,
                    categoryId: getCategoryId('hot-tubs')
                });
                aquaviaCount++;
            }
        }
    }
    console.log(`Imported ${aquaviaCount} Aquavia products (Exclusive & Premium).`);

    console.log('Final DB Sync complete.');
    process.exit(0);
}

importFinal().catch(console.error);
