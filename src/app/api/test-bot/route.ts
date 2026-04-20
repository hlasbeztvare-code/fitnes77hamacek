import { NextResponse } from 'next/server';

/**
 * GOLIÁŠ | Bot Heartbeat Tester
 * Ověření spojení s Telegramem pro pana Hamáčka.
 */
export async function GET() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.HAMACEK_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ 
      success: false, 
      error: 'Chybí TELEGRAM_BOT_TOKEN nebo HAMACEK_CHAT_ID ve Vercelu!' 
    }, { status: 500 });
  }

  const message = `📡 *GOLIÁŠ HEARTBEAT: AKTIVNÍ* \n\nŠéfe, tohle je test spojení. Pokud tuhle zprávu vidíš, tvůj e-shop je úspěšně napojen na Telegram a každou novou objednávku ti hned nahlásím. \n\n_System Status: 300% STABLE_ 🦾`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (!data.ok) {
        return NextResponse.json({ success: false, telegramError: data }, { status: 400 });
    }

    return NextResponse.json({ 
        success: true, 
        message: 'Testovací zpráva byla odeslána na tvůj Telegram!' 
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
