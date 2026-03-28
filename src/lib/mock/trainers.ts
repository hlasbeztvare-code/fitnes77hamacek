export interface Trainer {
  id: string;
  name: string;
  role: string;
  specialties: string[];
  bio: string;
  image: string;
}

export const trainers: Trainer[] = [
  {
    id: "jaroslav-hamacek",
    name: "Jaroslav Hamáček",
    role: "Majitel & Osobní trenér",
    specialties: ["Silový trénink", "Mentoring", "Výsledky"],
    bio: "Zakladatel Fitness 77. Matador, který klade důraz na disciplínu a reálné výsledky bez výmluv. Specialista na silový rozvoj a vedení k cíli.",
    image: "/images/trainers/hlavacek.jpg"
  },
  {
    id: "ondrej-soustruznik",
    name: "Ondřej Soustružník",
    role: "Osobní trenér (FTVS UK)",
    specialties: ["Anatomie", "Poúrazové stavy", "Technika"],
    bio: "Expert na fyziologii a nápravná cvičení. Fitness trenér 1. třídy s důrazem na prevenci zranění a návrat k plné kondici po operacích.",
    image: "/images/trainers/soustruznik.jpg"
  }
];
