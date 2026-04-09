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
      'creatine-monohydrate',
      'bcaa-amino-complex',
      'deadpump-pre-workout',
      'whey-protein-isolate',
    ],
  },
  'jaroslav-hamacek': {
    headline: 'Hamáčkův stack',
    subline: 'To, co doopravdy funguje. Testováno na vlastní kůži.',
    productSlugs: [
      'black-dead-pre-workout',
      'creatine-monohydrate',
      'eaa-essential-amino',
      'deadpump-v2-pump-formula',
    ],
  },
  'beata-cejnarova': {
    headline: 'Beatěin stack',
    subline: 'Produkty, které doopravdy používám. Pro výsledky i zdravi.',
    productSlugs: [
      'whey-protein-isolate',
      'bcaa-amino-complex',
      'magnesium-recovery-complex',
      'eaa-essential-amino',
    ],
  },
};
