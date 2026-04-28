# 💉 L-CODE: Shoptet Injection Protocol (GOLIÁŠ v42.0)

Tento manuál slouží výhradně pro techniky L-CODE Dynamics pro rychlé nasazení Goliáš Withdrawal systému do cizího Shoptetu (Standardní šablony).

## ⚡ RYCHLÁ OPERACE (Checklist)

### 1. Vytvoření "Hostitele" (Článek)
- **Kde:** Vzhled a obsah -> Články.
- **Akce:** Nový článek "Odstoupení od smlouvy".
- **Obsah:** Do HTML editoru vložit placeholder: `<div id="golia-withdrawal-root">Načítám protokol...</div>`.

### 2. Injektáž Scriptu (Zápatí)
- **Kde:** Vzhled a obsah -> HTML kódy -> Zápatí.
- **Payload:** Vložit náš JS Bridge, který:
  - Detekuje `#golia-withdrawal-root`.
  - Injektuje náš React/HTML formulář z naší domény.
  - Nastaví `CLIENT_ID` (aby náš backend věděl, komu patří mail).

### 3. Aktivace Navigace (Patička)
- **Kde:** Vzhled a obsah -> Menu -> Patička.
- **Akce:** Přidat položku -> Vybrat vytvořený článek.

### 4. Backend Provisioning (Náš Server)
- V našem `api/odstoupeni` přidat switch pro `CLIENT_ID`.
- Nastavit:
  - `DESTINATION_EMAIL` (Kam má Shoptet mail dostat).
  - `RESEND_DOMAIN` (Ověřená doména, přes kterou to pošleme).
  - `TELEGRAM_CHAT_ID` (Pro notifikaci daného klienta).

### 5. Vizuální Sjednocení (Theming)
Aby formulář graficky zapadl do e-shopu klienta, loader script musí obsahovat `THEME_CONFIG`:
- **Primary Color:** Barva tlačítek a akcentů (např. `#E10600`).
- **Font Stack:** Musí odpovídat fontu e-shopu (přebíráme z BODY e-shopu).
- **Border Radius:** Zaoblení rohů (např. `0px` pro "ostré" e-shopy, `8px` pro moderní).
- **Formát:** Předáváme jako CSS Variables přímo do injektovaného Iframe/Rootu.

## 🛡️ BEZPEČNOSTNÍ PROTOKOL
- **CORS:** Povolit doménu klienta v našem backendu.
- **No-Trace:** Po smazání scriptu ze zápatí Shoptetu musí systém u klienta okamžitě přestat existovat (Remote Killswitch).
- **Branding:** Vždy zachovat L-CODE Dynamics branding v patičce formuláře.

---
**L-CODE Dynamics** | *Operation Stealth*
Status: READY-FOR-INJECTION | 300% SUCCESS RATE
