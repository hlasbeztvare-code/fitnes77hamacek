import { NextResponse } from 'next/server';
import { XMLParser } from 'fast-xml-parser';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const feedUrl = process.env.SHOPTET_FEED_URL;
    
    if (!feedUrl) {
      return NextResponse.json({ error: 'Koukoute, chybí SHOPTET_FEED_URL v .env!' }, { status: 500 });
    }

    // Stáhneme XML feed ze Shoptetu (cache: no-store, ať máme vždy čerstvý ceny)
    const response = await fetch(feedUrl, { cache: 'no-store' });
    const xmlData = await response.text();

    // Nastavíme náš ultra-rychlý parser
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_"
    });

    // Přechroustáme to XML peklo na krásnej JavaScript JSON
    const jsonObj = parser.parse(xmlData);

    // Shoptet feed (Heureka formát) má strukturu <SHOP><SHOPITEM>...
    // Vytáhneme jen to pole produktů, ať v tom nemáme bordel
    const items = jsonObj?.SHOP?.SHOPITEM || [];

    // Tady si to jen zkontrolujeme. Až to uvidíme, napojíme to na Prismu!
    return NextResponse.json({ 
      success: true, 
      count: items.length, 
      products: items 
    });

  } catch (error) {
    console.error('Chyba při stahování feedu:', error);
    return NextResponse.json({ error: 'Něco se podělalo při parsování XML.' }, { status: 500 });
  }
}
