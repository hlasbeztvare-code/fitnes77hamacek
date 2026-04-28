# 🛡️ GOLIÁŠ v40.0: Shoptet Headless Bypass Manual (L-CODE GUARDIAN)

Tento manuál slouží jako absolutní zdroj pravdy pro integraci moderního headless Next.js frontendu a rigidního e-commerce jádra Shoptetu. Vznikl po 3 dnech intenzivního reverse-engineeringu Shoptet ochran.

## ⚠️ Proč to bylo tak těžké (a proč selhaly běžné metody)
Shoptet extrémně agresivně blokuje jakékoliv pokusy o manipulaci s košíkem z cizích domén:
1. **Fetch/API (CORS):** Shoptet striktně zakazuje HTTP POST požadavky na přidání do košíku, pokud nepřichází z jejich vlastní domény.
2. **Server Proxy (Cookie Shadowing):** Proxy server nedokáže předat Session Cookies (SESSID) z Next.js na Shoptet, takže se uživatelům po přesměrování objevil vždy prázdný košík.
3. **Iframe / postMessage:** Shoptet používá hlavičku `X-Frame-Options: SAMEORIGIN`, čímž absolutně zakazuje načtení svého webu ve skrytém okně (Iframe). Prohlížeč spojení zablokuje.

## 🚀 Řešení: "Pašerák v URL"
Jediný způsob, jak ochranu prolomit, je **fyzicky předat košík přes parametry v URL adrese** a nechat samotný Shoptet, aby si ho z té adresy přečetl a nativně vložil do košíku.

### Fáze 1: Next.js Frontend
V momentě, kdy zákazník klikne na "Přejít k pokladně", kód v Next.js vezme obsah košíku a poskládá ho do textového řetězce ve formátu `productId:priceId:množství`.
Příklad: `43:46:1,49:52:2`. Následně uživatele přesměruje na:
`https://obchod.fit77.cz/?sync_cart=1&items=43:46:1,49:52:2`

### Fáze 2: Shoptet Patička (Příjímač)
V Shoptet administraci (Vzhled a obsah -> HTML kódy -> Zápatí) je vložen speciální JavaScript. Ten se při načtení stránky aktivuje, všimne si klíče `?sync_cart=1`, vytáhne si produkty z URL a postupně (jeden po druhém) je pomocí klasického skrytého formuláře (URLSearchParams) přidá do košíku. Jakmile má hotovo, automaticky a bleskově zákazníka pošle na `/objednavka/krok-1/`.

---

## 💻 Kód do Shoptet patičky (HTML Kódy -> Zápatí)
*Tento kód nikdy neměň, pokud Shoptet nezmění architekturu.*

```html
<script>
(function() {
  var urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('sync_cart') === '1') {
    var itemsStr = urlParams.get('items');
    if (!itemsStr) {
      window.location.href = '/objednavka/';
      return;
    }
    
    var items = itemsStr.split(',').map(function(i) {
      var parts = i.split(':');
      return { productId: parts[0], priceId: parts[1], amount: parts[2] };
    });
    
    var index = 0;
    function addNext() {
      if (index >= items.length) {
        window.location.href = '/objednavka/';
        return;
      }
      var item = items[index++];
      // Formát URLSearchParams je pro legacy jádro Shoptetu kritický!
      var form = new URLSearchParams();
      form.append('productId', item.productId);
      form.append('priceId', item.priceId);
      form.append('amount', item.amount);
      form.append('language', 'cs');
      
      fetch('/action/Cart/addCartItem/?simple_ajax_cart=1', {
        method: 'POST',
        body: form
      }).then(addNext).catch(addNext);
    }
    
    addNext();
  }
})();
</script>
```

---

## 🔍 JAK NAJÍT SPRÁVNÁ ID PRODUKTŮ (KRITICKÉ!)
Nejčastější chyba je posílat do adresy špatná ID. Shoptet u endpointu vyžaduje svá **tajná interní databázová čísla**. To, co vidíš v URL nebo v XML feedu (např. 43), často není `priceId`!

**Postup, jak najít 100% správná ID:**
1. Otevři si normálně ve svém prohlížeči web `https://obchod.fit77.cz`.
2. Otevři libovolný produkt (např. nějaké nové BCAA, které chceš přidat do slovníku).
3. Na klávesnici zmáčkni **F12** (nebo pravé tlačítko -> Prozkoumat), čímž otevřeš Vývojářské nástroje (DevTools).
4. V těchto nástrojích překlikni nahoře na záložku **Network (Síť)**.
5. Na samotné stránce teď klikni myší na modré tlačítko **Přidat do košíku**.
6. V záložce Network se dole okamžitě objeví nový záznam (požadavek), který se jmenuje `?simple_ajax_cart=1` (nebo podobně).
7. Klikni na něj. V pravém panelu, který se ti otevře, najdi záložku **Payload** (nebo Form Data).
8. Zde uvidíš naprosto čistě naservírované hodnoty, které Shoptet používá:
   - `productId: 123`
   - `priceId: 456`

Tato dvě čísla vezmi a vlož je do Next.js kódu (soubor `src/app/cart/page.tsx`) do konstanty `PRICE_ID_MAP`. 

*L-CODE GUARDIAN: Systém zabezpečen. Stopy zahlazeny. End of manual.*
