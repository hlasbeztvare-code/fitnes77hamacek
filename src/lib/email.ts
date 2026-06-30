import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.seznam.cz',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: process.env.SMTP_SECURE === 'true' || true,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

export async function sendOrderConfirmationEmail(order: any) {
  if (!process.env.SMTP_USER) {
    console.warn('SMTP údaje nejsou nastaveny, e-mail se neodesílá.');
    return;
  }

  const items = typeof order.itemsJson === 'string' ? JSON.parse(order.itemsJson) : order.itemsJson;
  
  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 15px 0; border-bottom: 1px solid #333; color: #fff;">
        <strong>${item.name}</strong><br>
        <span style="color: #666; font-size: 12px;">Množství: ${item.quantity}x</span>
      </td>
      <td style="padding: 15px 0; border-bottom: 1px solid #333; color: #E10600; font-weight: bold; text-align: right;">
        ${item.price} Kč
      </td>
    </tr>
  `).join('');

  const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin: 0; padding: 0; background-color: #000000; font-family: Arial, sans-serif; color: #ffffff;">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #0A0A0A; padding: 40px 20px;">
        <tr>
          <td style="text-align: center; padding-bottom: 30px; border-bottom: 2px solid #E10600;">
            <h1 style="color: #ffffff; text-transform: uppercase; letter-spacing: 2px; font-weight: 900; margin: 0;">FITNES<span style="color: #E10600;">77</span></h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 0;">
            <h2 style="color: #ffffff; text-transform: uppercase; font-weight: 900;">Děkujeme za objednávku, ${order.firstName}!</h2>
            <p style="color: #999999; line-height: 1.6;">Vaše platba byla úspěšně zpracována a objednávku jsme začali připravovat k odeslání. Níže naleznete shrnutí.</p>
          </td>
        </tr>
        <tr>
          <td>
            <h3 style="color: #E10600; text-transform: uppercase; letter-spacing: 1px; font-size: 12px; margin-bottom: 15px;">Shrnutí objednávky #${order.id.slice(0, 8)}</h3>
            <table width="100%" cellpadding="0" cellspacing="0">
              ${itemsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding: 30px 0 0 0;">
            <table width="100%">
              <tr>
                <td style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Doprava</td>
                <td style="color: #ffffff; text-align: right;">${order.shippingMethod}</td>
              </tr>
              <tr>
                <td style="color: #999999; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; padding-top: 10px;">Celkem zaplaceno</td>
                <td style="color: #E10600; text-align: right; font-weight: 900; font-size: 20px; padding-top: 10px;">${order.total} Kč</td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding-top: 40px; text-align: center;">
            <p style="color: #666666; font-size: 12px; margin: 0;">FITNES77 &copy; ${new Date().getFullYear()}</p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    await transporter.sendMail({
      from: `"FITNES77" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: order.email,
      subject: `FITNES77 | Potvrzení objednávky #${order.id.slice(0, 8)}`,
      html: html,
    });
    console.log(`E-mail úspěšně odeslán na: ${order.email}`);
  } catch (err) {
    console.error('Chyba při odesílání e-mailu:', err);
  }
}
