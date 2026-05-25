/**
 * META CONVERSIONS API (CAPI) – Fitness 77
 * ============================================================
 * Helper pro odesílání serverových událostí (např. Purchase)
 * na Meta Conversions API.
 * ============================================================
 */

export type CapiEventPayload = {
  eventName: string;
  eventId?: string; // Použito pro deduplikaci s Pixel eventy (např. orderId)
  value?: number;
  currency?: string;
  clientIp?: string;
  clientUserAgent?: string;
  userData?: {
    em?: string[]; // Hashed email
    fn?: string[]; // Hashed first name
    ln?: string[]; // Hashed last name
    [key: string]: unknown;
  };
  customData?: Record<string, unknown>;
};

export async function sendMetaCapiEvent(payload: CapiEventPayload) {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CONVERSIONS_API_TOKEN;

  // Striktní kontrola přítomnosti konfigurace (bez fallbacků)
  if (!pixelId) {
    const errorMsg = '❌ Meta CAPI Error: Chybí META_PIXEL_ID v proměnných prostředí!';
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  if (!token) {
    const errorMsg = '❌ Meta CAPI Error: Chybí META_CONVERSIONS_API_TOKEN v proměnných prostředí!';
    console.error(errorMsg);
    return { success: false, error: errorMsg };
  }

  const eventTime = Math.floor(Date.now() / 1000);

  const capiPayload = {
    data: [
      {
        event_name: payload.eventName,
        event_time: eventTime,
        event_source: 'web',
        event_id: payload.eventId,
        user_data: {
          client_ip_address: payload.clientIp,
          client_user_agent: payload.clientUserAgent,
          ...payload.userData,
        },
        custom_data: {
          value: payload.value,
          currency: payload.currency || 'CZK',
          ...payload.customData,
        },
      },
    ],
  };

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(capiPayload),
    });

    const data = (await response.json()) as Record<string, unknown>;

    if (data && 'error' in data) {
      console.error('❌ Meta CAPI API error response:', data.error);
      return { success: false, error: String((data.error as Record<string, unknown>)?.message || 'Unknown API error') };
    }

    console.log(`✅ Meta CAPI event '${payload.eventName}' odeslán úspěšně.`, data);
    return { success: true, data };
  } catch (err) {
    const errMsg = err instanceof Error ? err.message : 'Unknown network error';
    console.error('❌ Meta CAPI fetch failure:', errMsg);
    return { success: false, error: errMsg };
  }
}
