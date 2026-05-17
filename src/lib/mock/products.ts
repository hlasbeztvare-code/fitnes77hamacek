export const products = [
  {
    id: '1',
    name: 'CREATINE MONOHYDRATE / ČISTÝ',
    slug: 'creatine-monohydrate',
    shortDescription: 'Čistá forma výkonu. Bez kompromisů.',
    description: 'Creatine Monohydrate od Fitness 77 představuje základ, na kterém stojí skutečný výkon. 100% čistota pro tvou sílu a regeneraci.',
    ingredients: '100% Mikronizovaný Creatine Monohydrate.',
    nutrition: {
      "Creatine Monohydrate": "100 g",
      "z toho čistý Kreatin": "88 g"
    },
    price: 555,
    oldPrice: 590,
    image: '/images/products/creatine-pure.webp',
    stock: 120,
    category: 'supplement',
    weight: '500G',
    featured: true,
    variants: []
  },
  {
    id: '2',
    name: 'BCAA + GLUTAMINE / INSTANT / OCHUCENÉ',
    slug: 'bcaa-amino-complex',
    shortDescription: 'Chraň svaly. Zrychli regeneraci. Udrž výkon.',
    description: 'BCAA komplex pro regeneraci a ochranu svalů v nekompromisním poměru 4:1:1 doplněný o čistý L-Glutamin.',
    ingredients: 'L-Glutamin, L-Leucin, L-Isoleucin, L-Valin, Kyselina citronová, Sukralosa, Acesulfam K, Aroma, Beta-karoten, Vitamin B6.',
    nutrition: {
      "Energie": "1153 kJ / 276 kcal",
      "Bílkoviny": "69 g",
      "Sacharidy": "0 g",
      "Tuky": "0,1 g",
      "L-Glutamin": "34 000 mg",
      "L-Leucin": "33 333 mg",
      "L-Isoleucin": "8 333 mg",
      "L-Valin": "8 333 mg",
      "Vitamin B6": "14 mg"
    },
    price: 540,
    oldPrice: 890,
    image: '/images/products/bcaa.webp',
    stock: 85,
    category: 'supplement',
    weight: '500G',
    featured: true,
    variants: [
      { name: 'Grep', variantCode: 'GRE', stock: 10, price: 540 },
      { name: 'Malina', variantCode: 'MAL', stock: 10, price: 540 },
      { name: 'Borůvka', variantCode: 'BOR', stock: 10, price: 540 }
    ]
  },
  {
    id: '3',
    name: 'BLACK DEAD',
    slug: 'black-dead-pre-workout',
    shortDescription: 'NEJSILNĚJŠÍ STIMULAČNÍ PRE-WORKOUT NA TRHU. Explozivní energie. Brutální pumpa.',
    description: `BLACK DEAD není jen další nakopávač. Je to legální zbraň pro tvůj trénink. Pokud hledáš hranici mezi "zvládnu to" a "ovládnu to", právě jsi ji našel. 

Kombinace extrémních dávek stimulantů (225mg kofeinu), brutálních 11g čistého Citrulinu a 4.5g Beta-Alaninu ti zajistí nejlepší trénink tvého života. Tento produkt byl vyvinut pro ty, kteří se nespokojí s průměrem a v posilovně nechávají duši.

Hlavní benefity:
• Extrémní přísun energie a soustředění
• Brutální svalové napumpování a žilnatost
• Oddálení únavy a zvýšení vytrvalosti
• Maximální síla v každém opakování`,
    ingredients: 'L-Citrulin (PURE), Beta-Alanin, Betain Anhydrous, L-Tyrosin, L-Taurin, Acetyl-L-Karnitin, Extrakt ze zeleného čaje, Himálajská sůl, Kofein bezvodý, Bioperine®.',
    nutrition: {
      "Kofein bezvodý": "225 mg",
      "L-Citrulin (PURE)": "11 256 mg",
      "Beta-Alanin": "4 502 mg",
    },
    price: 899,
    oldPrice: 1290,
    image: '/images/products/blackdead_static.webp',
    hoverVideo: '/videos/blackdead.mp4',
    stock: 42,
    category: 'supplement',
    weight: '600G',
    featured: true,
    variants: []
  },
  {
    id: '4',
    name: 'DEAD PUMP',
    slug: 'deadpump-v2-pump-formula',
    shortDescription: 'NEJSILNĚJŠÍ STIM-FREE PUMPA NA TRHU. Extrémní prokrvení. Bez kofeinu.',
    description: `DEAD PUMP je ultimátní pre-workout bez stimulantů s nejčistším a nejsilnějším složením pro maximální napumpování. Ideální pro večerní tréninky nebo pro ty, kteří chtějí zažít extrémní prokrvení bez kofeinového dojezdu.

Díky masivní dávce 13g čistého Citrulinu a Betainu zažiješ svalovou pumpu, kterou jsi ještě nepocítil. Tvoje svaly budou tvrdé, plné a připravené na maximální výkon.

Hlavní benefity:
• Maximální prokrvení a transport živin do svalů
• Zvýšení svalového objemu a tvrdosti
• Zlepšení regenerace během tréninku
• 100% bez stimulantů – nenarušuje spánek`,
    ingredients: 'L-Citrulin (PURE), Betain Anhydrous, L-Tyrosin, L-Taurin, Himálajská sůl, Citicoline CDP, Bioperine®.',
    nutrition: {
      "L-Citrulin (PURE)": "13 220 mg",
      "Betain Anhydrous": "3 966 mg",
    },
    price: 999,
    oldPrice: 1350,
    image: '/images/products/deadpump_static.webp',
    hoverVideo: '/videos/deadpump.mp4',
    stock: 55,
    category: 'supplement',
    weight: '600G',
    featured: true,
    variants: []
  },
  {
    id: '5',
    name: 'RÝŽOVÁ KAŠE / ČOKOLÁDA',
    slug: 'ryzova-kase-cokolada',
    shortDescription: 'ČOKOLÁDA - Čistá energie z rýže. Lehce stravitelná. 1000g.',
    description: 'Cream of Rice od Fitness 77 je ideálním zdrojem komplexních sacharidů.',
    ingredients: '100% Instantní rýžová mouka, kakaový prášek, aroma, náhradní sladidlo sukralóza.',
    nutrition: {
      "Energie": "1480 kJ / 349 kcal",
      "Sacharidy": "77,4 g",
    },
    price: 449,
    oldPrice: 590,
    image: '/images/products/rice-chocolate.jpg',
    stock: 50,
    category: 'supplement',
    weight: '1000G',
    featured: true,
    shoptetProductId: '61',
    shoptetPriceId: '79',
    variants: []
  },
  {
    id: '5-2',
    name: 'RÝŽOVÁ KAŠE / SLANÝ KARAMEL',
    slug: 'ryzova-kase-slany-karamel',
    shortDescription: 'SLANÝ KARAMEL - Čistá energie z rýže. Lehce stravitelná. 1000g.',
    description: 'Cream of Rice od Fitness 77 je ideálním zdrojem komplexních sacharidů.',
    ingredients: '100% Instantní rýžová mouka, aroma, náhradní sladidlo sukralóza.',
    nutrition: {
      "Energie": "1480 kJ / 349 kcal",
      "Sacharidy": "77,4 g",
    },
    price: 449,
    oldPrice: 590,
    image: '/images/products/rice-caramel.jpg',
    stock: 50,
    category: 'supplement',
    weight: '1000G',
    featured: true,
    shoptetProductId: '61',
    shoptetPriceId: '82',
    variants: []
  },
  {
    id: '5-3',
    name: 'RÝŽOVÁ KAŠE / BORŮVKA',
    slug: 'ryzova-kase-boruvka',
    shortDescription: 'BORŮVKA - Čistá energie z rýže. Lehce stravitelná. 1000g.',
    description: 'Cream of Rice od Fitness 77 je ideálním zdrojem komplexních sacharidů.',
    ingredients: '100% Instantní rýžová mouka, aroma, náhradní sladidlo sukralóza.',
    nutrition: {
      "Energie": "1480 kJ / 349 kcal",
      "Sacharidy": "77,4 g",
    },
    price: 449,
    oldPrice: 590,
    image: '/images/products/rice-blueberry.jpg',
    stock: 50,
    category: 'supplement',
    weight: '1000G',
    featured: true,
    shoptetProductId: '61',
    shoptetPriceId: '73',
    variants: []
  },
  {
    id: '5-4',
    name: 'RÝŽOVÁ KAŠE / PIŠKOTOVÝ DORT',
    slug: 'ryzova-kase-piskotovy-dort',
    shortDescription: 'PIŠKOTOVÝ DORT - Čistá energie z rýže. Lehce stravitelná. 1000g.',
    description: 'Cream of Rice od Fitness 77 je ideálním zdrojem komplexních sacharidů.',
    ingredients: '100% Instantní rýžová mouka, aroma, náhradní sladidlo sukralóza.',
    nutrition: {
      "Energie": "1480 kJ / 349 kcal",
      "Sacharidy": "77,4 g",
    },
    price: 449,
    oldPrice: 590,
    image: '/images/products/rice-biscuit.jpg',
    stock: 50,
    category: 'supplement',
    weight: '1000G',
    featured: true,
    shoptetProductId: '61',
    shoptetPriceId: '85',
    variants: []
  }
];
