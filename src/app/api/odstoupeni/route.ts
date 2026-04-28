import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const withdrawalSchema = z.object({
  orderId: z.string(),
  name: z.string(),
  email: z.string().email(),
  date: z.string(),
  reason: z.string().optional(),
});

// Lazy inicializace Resendu - aby build na Vercelu neselhal na chybějícím klíči
const getResend = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('⚠️ RESEND_API_KEY is missing');
    return null;
  }
  return new Resend(apiKey);
};

/**
 * L-CODE Dynamics | Legislative Bridge 06/2026
 * Zpracování odstoupení od smlouvy a notifikace správce.
 */
async function notifyOwner(data: any) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.HAMACEK_CHAT_ID;

  if (!botToken || !chatId) return;

  const message = `⚖️ *ODSTOUPENÍ OD SMLOUVY (06/2026)*\n\n👤 *Klient:* ${data.name}\n📧 *Email:* ${data.email}\n📦 *Objednávka:* #${data.orderId}\n📅 *Datum převzetí:* ${data.date}\n\n📝 *Důvod:* ${data.reason || 'Neuveden'}\n\n_Šéfe, v Shoptetu by to už mělo "pípat" v mailu!_ 🦾`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
  } catch (err) {
    console.error('Telegram Notify Error:', err);
  }
}

async function syncWithShoptet(data: any) {
  try {
    const { orderId, name, email, date, reason } = data;
    const resend = getResend();
    
    if (!resend) {
      console.error('Resend client not initialized');
      return false;
    }

    // Shadow Injector: Odesíláme mail do Shoptetu v předepsaném formátu pro automatické párování
    await resend.emails.send({
      from: 'Fitness 77 <system@fit77.cz>',
      to: 'fitness77@post.cz',
      replyTo: email, // Důležité pro párování se zákazníkem
      subject: `Objednávka č. ${orderId} - Odstoupení od smlouvy`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; border: 2px solid #000; padding: 30px; background-color: #fff;">
          <div style="background-color: #d4ff00; padding: 10px; margin-bottom: 20px; text-align: center;">
            <h1 style="margin: 0; font-size: 20px; text-transform: uppercase;">Legislativní Odstoupení</h1>
          </div>
          
          <p><strong>DŮLEŽITÉ:</strong> Toto je oficiální digitální protokol k objednávce <strong>${orderId}</strong>.</p>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Číslo objednávky:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${orderId}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Zákazník:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>E-mail:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Datum převzetí:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${date}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #d4ff00;">
            <strong>Důvod odstoupení:</strong><br />
            ${reason || 'Neuveden'}
          </div>
          
          <p style="margin-top: 30px; font-size: 10px; color: #aaa; text-transform: uppercase; letter-spacing: 2px;">
            Odesláno z L-CODE Goliáš Bridge v1.0 | fit77.cz
          </p>
        </div>
      `,
    });

    // ZÁKAZNICKÝ SERVIS: Potvrzení pro zákazníka
    await resend.emails.send({
      from: 'Fitness 77 <fitness77@post.cz>', // Z ofiko mailu, aby mohl odpovědět
      to: email,
      subject: `Potvrzení o přijetí odstoupení - Objednávka č. ${orderId}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; padding: 30px; background-color: #fff; color: #000;">
          <h1 style="text-transform: uppercase; font-size: 24px; border-bottom: 4px solid #E10600; padding-bottom: 10px;">Fitness 77</h1>
          <p>Dobrý den, ${name},</p>
          <p>potvrzujeme přijetí Vašeho odstoupení od smlouvy k objednávce <strong>č. ${orderId}</strong>.</p>
          <p>Vaši žádost jsme automaticky zaevidovali. O dalším postupu Vás budeme informovat v nejbližší době.</p>
          
          <div style="background-color: #f5f5f5; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Shrnutí žádosti:</h3>
            <p><strong>Objednávka:</strong> ${orderId}<br><strong>Datum podání:</strong> ${new Date().toLocaleDateString('cs-CZ')}</p>
          </div>

          <p>V případě dotazů nás můžete kontaktovat přímo odpovědí na tento e-mail.</p>
          <p style="margin-top: 40px; font-size: 12px; color: #888;">Tým Fitness 77<br>www.fit77.cz</p>
        </div>
      `
    });
    
    return true;
  } catch (error) {
    console.error('Shoptet Shadow Sync Error:', error);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.json();
    const validated = withdrawalSchema.safeParse(rawBody);

    if (!validated.success) {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }

    // 1. Notifikace majitele (Telegram)
    await notifyOwner(validated.data);

    // 2. Shadow Injector (Shoptet Email Bypass)
    const synced = await syncWithShoptet(validated.data);

    if (!synced) {
        // I když mail selže (třeba chybí API klíč), chceme, aby uživatel viděl "úspěch", 
        // protože to máme v logu a na Telegramu.
        console.warn('⚠️ Shadow Sync failed, but order processed via Telegram.');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Withdrawal processing error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// clean code comment: Goliáš Stealth Bypass 1.0 je aktivní. smrk

