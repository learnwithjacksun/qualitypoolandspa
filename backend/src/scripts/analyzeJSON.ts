import fs from 'fs';

const wellisFile = './HARVIA-pdfjar.json'; // wait, WELLIS is WELLIS CATALOGUE (1)-pdfjar.json
const aquaviaFile = './Catalogo_AQUAVIA_2026_EN-pdfjar.json';

const aquaviaContent = fs.readFileSync(aquaviaFile, 'utf-8');
const aquaviaData = JSON.parse(aquaviaContent);

let currentRange = '';
aquaviaData.forEach((item: any, i: number) => {
    if (item.text.toLowerCase().includes('exclusive') || item.text.toLowerCase().includes('premium')) {
        console.log(`\n--- Found at ${i}: ${item.text}`);
        for (let j = Math.max(0, i - 2); j < Math.min(aquaviaData.length, i + 5); j++) {
            console.log(`[${j}] ${aquaviaData[j].text.slice(0, 50)}...`);
        }
    }
});
