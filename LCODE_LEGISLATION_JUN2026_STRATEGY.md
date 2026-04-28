# ⚖️ L-CODE: Legislativní Hardening (Červen 2026)
> [!IMPORTANT]
> **INTERNAL STRATEGY DOCUMENT**
> Tento dokument definuje standard L-CODE Dynamics pro řešení legislativních změn u e-commerce projektů (vč. Fitness 77). Naším cílem je 300% soulad se zákonem při zachování 100% technologické nezávislosti na platformách jako Shoptet.

## 🔴 1. Legislativní Výzva (Červen 2026)
Nová úprava zákona o ochraně spotřebitele zpřísňuje pravidla pro:
- **Tlačítkový zákon 2.0:** Nutnost jasného potvrzení o uzavření smlouvy a okamžitého přístupu k obchodním podmínkám.
- **Formulářové odstoupení:** Povinnost mít na webu snadno dostupný a funkční formulář pro odstoupení od smlouvy, který generuje právně závazný dokument.
- **Transparentnost dat:** Zákazník musí dostat trvalý nosič dat (PDF) s rekapitulací ihned po nákupu.

---

## 🏗️ 2. Implementace ve Fitness 77 (Case Study)
U projektu Hamáček (Fitness 77) jsme zvolili cestu **Headless Bypassu**, abychom nemuseli čekat na aktualizace Shoptetu.

### A. Shadow Injector (Technologie L-CODE)
Místo složitého napojování na Shoptet API používáme metodu **Shadow Injection**:
- Náš systém (Next.js) vygeneruje legislativní dokument (PDF) na straně klienta (`jsPDF`).
- Dokument je odeslán přes `Resend API` přímo do Shoptet administrativy klienta jako "párovací e-mail".
- **Výsledek:** Shoptet automaticky spáruje naše legislativní PDF k objednávce zákazníka, aniž bychom se dotkli Shoptet jádra.

### B. Telegram Watchdog
Každé legislativní odstoupení nebo kritický úkon na webu je v reálném čase hlášen majiteli přes **Telegram Bot**:
- Žádné zpoždění e-mailů.
- Okamžitá reakce na právní úkon.
- Archivace úkonů mimo Shoptet pro případ sporů.

---

## 🚀 3. Škálování na jiné weby (Standard L-CODE)
Tento model je univerzálně přenositelný na jakýkoliv web (Next.js, React, statické weby) díky naší **"No-Touch Policy"**:

1. **Vstřikování Logiky (Goliáš Kernel):** Do cizího webu vložíme pouze náš Kernel skrze jeden script tag nebo API route.
2. **External Hosting:** Veškerá těžká logika (generování PDF, odesílání notifikací) běží na našem Vercel/L-CODE serveru.
3. **Nulové riziko:** Klientovi nemůžeme rozbít jeho stávající web, protože naše komponenty jsou izolované (Sandboxed).

---

## 🛒 4. Implementace u zákazníků Shoptetu
Pro majitele e-shopů na Shoptetu je náš systém "Svatý grál":

- **Bypass omezení:** Shoptet má limitované šablony. My nabízíme plně custom legislativní flow.
- **Bezpečnost:** Klient nám nemusí dávat hesla k Shoptetu. Stačí nám nastavit jeden e-mailový alias pro příjem párovacích dat.
- **Rychlost:** Nasazení legislativního balíčku L-CODE pro Shoptet trvá < 4 hodiny.

### Technický postup u Shoptet zákazníků:
1. **URL Intercept:** Zachytíme data o objednávce na `thank-you` stránce.
2. **Data Enrichment:** Doplníme legislativní náležitosti, které Shoptet nativně neumí.
3. **Resend Bridge:** Odešleme čistá data do Shoptet administrativy pro finální spárování.

---
**L-CODE Dynamics** | *Industrial Grade E-commerce Solutions*
Status: **STRATEGY-CONFIRMED** | 300% Compliance
smrk.
