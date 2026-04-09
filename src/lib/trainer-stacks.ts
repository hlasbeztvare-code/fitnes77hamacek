/**
 * Doporučené produkty od trenérů – Fitness 77
 * =============================================
 * Každý trenér má svůj stack produktů které doporučuje.
 * Klíč = slug trenéra, hodnota = pole slugů produktů z DB.
 *
 * Přidání nového trenéra nebo produktu: stačí doplnit slug sem.
 */

export const trainerStacks: Record<string, {
  headline: string;
  subline: string;
  productSlugs: string[];
}> = {
  'ondrej-soustruznik': {
    headline: 'Ondřejův stack',
    subline: 'Produkty, které používám každý trénink. Bez kompromisů.',
    productSlugs: [
      'deadpump-v2-pump-formula',
      'creatine-monohydrate',
      'bcaa-amino-complex',
      'black-dead-pre-workout',
    ],
  },
  'jaroslav-hamacek': {
    headline: 'Hamáčkův stack',
    subline: 'To, co doopravdy funguje. Testováno na vlastní kůži.',
    productSlugs: [
      'black-dead-pre-workout',
      'deadpump-v2-pump-formula',
      'creatine-monohydrate',
      'bcaa-amino-complex',
    ],
  },
  'beata-cejnarova': {
    headline: 'Beátin stack',
    subline: 'Produkty, které doopravdy používám. Pro výsledky i zdraví.',
    productSlugs: [
      'bcaa-amino-complex',
      'creatine-monohydrate',
      'deadpump-v2-pump-formula',
      'black-dead-pre-workout',
    ],
  },
};
