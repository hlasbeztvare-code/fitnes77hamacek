# 🛠️ L-CODE INTERNAL: Shoptet Withdrawal Protocol (GOLIÁŠ v41.5)
> [!CAUTION]
> **TOP SECRET / OWNER-ONLY MANDATE**
> Tento protokol a Goliáš Kernel jsou exkluzivním intelektuálním vlastnictvím L-CODE Dynamics. Jakékoli šíření nebo implementace třetím stranám bez přímého schválení CEO je přísně zakázáno. Držíme standard 300 %, nebo nic.

Tento protokol slouží pro interní potřeby týmu L-CODE Dynamics pro rychlou implementaci legislativního odstoupení od smlouvy bez Shoptet API.

## 🏗️ Architektura Systému
Systém stojí na třech pilířích:
1. **Shadow Injector (API Route):** Server-side proces pro odesílání "párovacích" e-mailů.
2. **Telegram Watchdog:** Okamžitá notifikace majiteli e-shopu o novém právním úkonu.
3. **Client-Side PDF Engine:** Generování dokumentů přímo u klienta (Zero-Server-Load).

## 🛡️ STRATEGIE NASAZENÍ (NO-TOUCH POLICY)
Při implementaci pro třetí strany (klienty) se striktně držíme těchto pravidel:
1. **Zero Core Access:** Nikdy nevyžadujeme přístup do Shoptet jádra, FTP nebo databáze klienta.
2. **External Logic Only:** Veškerá logika (Kernel) běží na naší infrastruktuře. Do klientova e-shopu pouze "vstřikujeme" výsledky.
3. **Non-Invasive Integration:** Interakce probíhá výhradně přes Shadow Injection (e-maily, URL parametry). To zaručuje, že klientovi nemůžeme nic "rozbít" a naše know-how zůstává chráněno.

## 🚀 Implementační Workflow

### 1. ENV Proměnné (.env)
Vždy vyžadujeme tyto klíče pro plnou funkčnost:
```bash
RESEND_API_KEY="re_..."
TELEGRAM_BOT_TOKEN="..."
HAMACEK_CHAT_ID="..." # ID chatu majitele
INTERNAL_API_SECRET="..." # Pro zabezpečení bypassu
```

### 2. Formátování "Párovacího" Mailu (Kritické)
Shoptet parser vyžaduje přesný formát v `resend.emails.send`:
```typescript
{
  from: 'System <system@fit77.cz>',
  to: 'fitness77@post.cz',
  replyTo: customerEmail, // Nutné pro spárování s kartou zákazníka
  subject: `Objednávka č. ${orderId} - Odstoupení od smlouvy`,
  html: `...` // ID objednávky musí být v <strong> na začátku těla
}
```

### 3. PDF Engine (jsPDF)
Nepoužívat server-side generátory! Využíváme `jspdf` v Next.js Client Component.
- **Důvod:** Rychlost, bezpečnost, nulová zátěž serveru.
- **Standard:** Standardní fonty (Czech support via labels), tiskové okraje 20mm.

### 4. Bezpečnost (L-CODE Standard)
- **Zod Validation:** Striktní schema pro validaci e-mailu a ID objednávky.
- **Honeypot:** Přidat skryté pole do formuláře pro eliminaci bot-spamu.
- **Rate Limiting:** Omezit odesílání na 3 pokusy/minuta z jedné IP.

## 🏁 Deployment Checklist
- [ ] Ověřit doménu v Resend dashboardu.
- [ ] Otestovat Telegram notifikaci.
- [ ] Prověřit, zda Shoptet správně páruje testovací mail k testovací objednávce.
- [ ] Vygenerovat testovací PDF a ověřit čitelnost.

---
**L-CODE Dynamics** | *Industrial Grade E-commerce Solutions*
Status: SEVERITY-HIGH | PROTOCOL-ACTIVE
