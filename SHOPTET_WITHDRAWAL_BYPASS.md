# ⚖️ GOLIÁŠ v41.0: Shoptet Withdrawal Stealth Bypass (L-CODE GUARDIAN)

Tento manuál popisuje, jak implementovat digitální formulář pro **Odstoupení od smlouvy** do jakéhokoliv headless frontendu (Next.js) tak, aby se data automaticky propisovala do administrace Shoptetu bez použití API.

## ⚠️ Problém: Legislativa vs. Rigidita
Dle zákona musí e-shop umožnit snadné odstoupení. Shoptet však v základu nenabízí endpoint pro zápis těchto dat z cizích domén. 

## 🚀 Řešení: "Shadow Email Injection"
Využíváme interní parser Shoptetu, který automaticky prohledává příchozí maily na kontaktní adresu e-shopu a páruje je k historii objednávek na základě specifického formátu.

### KROK 1: Formátování odesílaného e-mailu (Backend)
Aby Shoptet mail správně spároval, musí být odeslán s těmito parametry:

1. **Příjemce (To):** Kontaktní e-mail e-shopu (např. `info@eshop.cz`).
2. **Předmět (Subject):** Musí obsahovat přesný řetězec `Objednávka č. {ID_OBJEDNAVKY}`.
   - *Správně:* `Objednávka č. 20260001 - Odstoupení od smlouvy`
   - *Špatně:* `[ODSTOUPENÍ] #20260001` (Parser může selhat).
3. **Reply-To:** Musí být nastaven na **e-mail zákazníka**. Shoptet pak zprávu v historii zobrazí jako komunikaci přímo s tímto klientem.

### KROK 2: Obsah mailu (HTML Template)
Shoptet indexuje i tělo mailu. Doporučuje se vložit ID objednávky do tagu `<strong>` hned na začátek.

```html
<p><strong>DŮLEŽITÉ:</strong> Oficiální protokol k objednávce <strong>20260001</strong>.</p>
<!-- Následuje tabulka s daty z formuláře -->
```

### KROK 3: Generování "Classic PDF" (Frontend)
Zákazník vyžaduje okamžitý důkaz. Místo server-side generování (které je pomalé a náročné), použijte `jsPDF` přímo v prohlížeči.

**Instalace:** `npm install jspdf`

**Implementace (Next.js Client Component):**
```typescript
import { jsPDF } from 'jspdf';

const generatePDF = (data) => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('PROTOKOL O ODSTOUPENÍ', 20, 20);
  doc.setFontSize(12);
  doc.text(`Objednávka: ${data.orderId}`, 20, 40);
  doc.text(`Jméno: ${data.name}`, 20, 50);
  // ... další pole
  doc.save(`odstoupeni-${data.orderId}.pdf`);
};
```

### KROK 4: UX Flow (300% Standard)
1. **Validace:** Použijte `Zod` pro kontrolu čísla objednávky a e-mailu.
2. **Feedback:** Po odeslání zobrazte `Success State` s jasnou zprávou: *"Potvrzení odesláno na e-mail"*.
3. **Download CTA:** Ihned nabídněte stažení PDF protokolu vygenerovaného v Kroku 3.

## 🛡️ Proč je toto řešení "Goliáš"?
- **Zero API:** Funguje i na nejnižších tarifech Shoptetu.
- **Zero Bloat:** Žádné těžké PDF knihovny na serveru.
- **Auto-Sync:** Shoptet se postará o spárování za vás.

*L-CODE GUARDIAN: Stopy zahlazeny. Systém je legislativně neprůstřelný. smrk*
