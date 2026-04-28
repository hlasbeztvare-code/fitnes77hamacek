/**
 * Kompletní profily trenérů – Fitness 77
 * ========================================
 * Veškerý obsah detail stránek trenérů.
 * Přidání/editace: jen zde, propaguje se automaticky.
 */

export type TrainerProfile = {
  philosophy: string;          // Krátký motto / filozofie
  focus: {                     // Oblasti zaměření s popisem
    icon: string;
    title: string;
    description: string;
  }[];
  forWhom: string;             // Pro koho jsou tréninky vhodné
  achievements?: string[];     // Certifikáty, tituly, úspěchy
  gender: 'male' | 'female';   // Pro dynamické texty (O trenérovi / O trenérce)
  nameInstrumental: string;    // Skloňované jméno (7. pád - s kým? s Ondřejem, s Lenkou)
  contact: {                   // Kontaktní údaje
    phone?: string;
    instagram?: string;
    email?: string;
  };
};

export const trainerProfiles: Record<string, TrainerProfile> = {

  'ondrej-soustruznik': {
    gender: 'male',
    nameInstrumental: 'Ondřejem',
    contact: {
      phone: '+420 773 688 076',
      email: 'ondra.soustruznik@seznam.cz',
    },
    philosophy: 'Správná technika je základ všeho. Bez ní je každé kilo navíc jen zbytečné riziko.',
    focus: [
      {
        icon: '🏋️',
        title: 'Silový trénink',
        description: 'Dřep, bench, mrtvý tah. Základní pohyby provedené perfektně.',
      },
      {
        icon: '🧬',
        title: 'Fyzioterapie',
        description: 'Náprava dysbalancí, rehabilitace po zranění, prevence bolestí.',
      },
      {
        icon: '📈',
        title: 'Pokročilý progres',
        description: 'Peridozace, periodický trénink a sledování výkonu v čase.',
      },
      {
        icon: '🥗',
        title: 'Výživa ke sportovci',
        description: 'Základní nutriční poradenství pro podporu výkonu a regenerace.',
      },
    ],
    forWhom: 'Ideální pro každého, kdo chce budovat skutečnou sílu se správnou technikou. Od začátečníků, kteří chtějí začít správně, až po zkušené liftery hledající nový level.',
    achievements: [
      'Certifikovaný osobní trenér',
      'Fyzioterapeutická praxe',
      '10+ let zkušeností',
    ],
  },

  'jaroslav-hamacek': {
    gender: 'male',
    nameInstrumental: 'Jaroslavem',
    contact: {
      phone: '+420 777 105 548',
      email: 'fitness77@post.cz',
    },
    philosophy: 'Fitness77 není jen posilovna. Je to komunita lidí, kteří chtějí být lepší. Každý den.',
    focus: [
      {
        icon: '🥊',
        title: 'Box a bojová umění',
        description: 'Techniky boxu, koordinace, rychlost a kondice ve stylu bojovníka.',
      },
      {
        icon: '💪',
        title: 'Funkční trénink',
        description: 'Pohyby, které má tělo skutečně zvládat v reálném životě.',
      },
      {
        icon: '🔥',
        title: 'Hardcore kondice',
        description: 'Tréninky, které tě posunou za hranice pohodlí. Výsledky jsou za ní.',
      },
      {
        icon: '🤝',
        title: 'Budování komunity',
        description: 'Motivační prostředí, kde si navzájem pomáháme a táhneme za jeden provaz.',
      },
    ],
    forWhom: 'Pro ty, kteří chtějí víc než jen cvičit. Pro lidi, kteří hledají komunitu, motivaci a trenéra, který to s nimi myslí vážně.',
    achievements: [
      'Majitel Fitness 77',
      'Aktivní boxer',
      '15+ let v fitness průmyslu',
    ],
  },

  'beata-cejnarova': {
    gender: 'female',
    nameInstrumental: 'Beatou',
    contact: {
      instagram: 'https://www.instagram.com/beatacejnarova',
      email: 'beata.cejnarova@seznam.cz',
    },
    philosophy: 'Tréninky nejsou jen o drině, ale o chytrém pohybu a dlouhodobých výsledcích.',
    focus: [
      {
        icon: '🏋️',
        title: 'Silový trénink',
        description: 'Efektivní budování síly a svalové hmoty s důrazem na techniku.',
      },
      {
        icon: '🫀',
        title: 'Zlepšení kondice',
        description: 'Zvýšení fyzické vytrvalosti a celkové vitality.',
      },
      {
        icon: '🧘',
        title: 'Zdravý pohyb',
        description: 'Náprava držení těla a kompenzace sedavého zaměstnání.',
      },
      {
        icon: '🥗',
        title: 'Nutriční coaching',
        description: 'Cesta k lepšímu stravování, které podpoří vaše výsledky.',
      },
    ],
    forWhom: 'Ať už jste v posilovně naprostý začátečník, který hledá správný směr, nebo pokročilý sportovec s jasným cílem (redukce váhy, nabírání hmoty), Beata vás bezpečně provede celým procesem tak, abyste se ve svém těle cítili skvěle.',
    achievements: [
      'Certifikovaná fitness trenérka',
      'Nutriční koučka',
      'Specializace na začátečníky i pokročilé',
    ],
  },

  'lenka-pickova': {
    gender: 'female',
    nameInstrumental: 'Lenkou',
    contact: {
      phone: '+420 722 951 850',
      instagram: 'https://www.instagram.com/fitby_lenka',
      email: 'leni.pickova@seznam.cz',
    },
    philosophy: 'Základem je diagnostika. Musíme vědět, jak se tělo hýbe, než ho začneme zatěžovat.',
    focus: [
      {
        icon: '🔍',
        title: 'Diagnostika těla',
        description: 'Vstupní analýza pohybových stereotypů a zhodnocení mobility.',
      },
      {
        icon: '🤸',
        title: 'Mobilita a funkčnost',
        description: 'Zlepšení rozsahu pohybu a celkové funkčnosti těla.',
      },
      {
        icon: '⏳',
        title: 'Formování postavy',
        description: 'Efektivní trénink na míru vašim estetickým i fyzickým cílům.',
      },
      {
        icon: '🛡️',
        title: 'Prevence zranění',
        description: 'Důraz na správnou techniku a dlouhodobě udržitelné výsledky.',
      },
    ],
    forWhom: 'Ať už jste na úplném začátku a bojujete se ztuhlým tělem, nebo chcete posunout své výkony dál a přitom se hýbat zdravě. Lenka vám pomůže najít správný směr skrze diagnostiku a individuální přístup.',
    achievements: [
      'Odbornice na diagnostiku pohybového aparátu',
      'Specialistka na mobilitu',
      'Individuální coaching',
    ],
  },

};
