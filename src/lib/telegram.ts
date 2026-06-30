const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.HAMACEK_CHAT_ID;

export async function sendTelegramNotification(order: any) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('Telegram token nebo Chat ID není nastaveno v .env');
    return;
  }

  const items = typeof order.itemsJson === 'string' ? JSON.parse(order.itemsJson) : order.itemsJson;
  const itemsText = items.map((item: any) => `- ${item.quantity}x ${item.name} (${item.price} Kč)`).join('\n');

  const text = `
🚨 *Nová zaplacená objednávka!* 🚨
ID: \`${order.id}\`
Cena: *${order.total} Kč*

👤 *Zákazník:*
${order.firstName} ${order.lastName}
📞 ${order.phone}
✉️ ${order.email}

📦 *Doprava:* ${order.shippingMethod}
📍 *Adresa / Pobočka:* 
${order.shippingId ? `ID Pobočky: ${order.shippingId}` : `${order.address}, ${order.city} ${order.zip}`}

🛒 *Produkty:*
${itemsText}

✅ Platba byla ověřena Comgate a sklad odečten.
  `;

  try {
    const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!res.ok) {
      console.error('Chyba při odesílání na Telegram:', await res.text());
    }
  } catch (err) {
    console.error('Chyba Telegram API:', err);
  }
}
