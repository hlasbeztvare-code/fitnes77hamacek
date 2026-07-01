import axios from 'axios';

const COMGATE_MERCHANT = process.env.COMGATE_MERCHANT || '';
const COMGATE_SECRET = process.env.COMGATE_SECRET || '';
const COMGATE_TEST = process.env.COMGATE_TEST === 'true';

const COMGATE_BASE_URL = 'https://payments.comgate.cz/v2.0';

export interface CreatePaymentParams {
  price: number; // in CZK
  refId: string;
  email: string;
  name?: string;
  label: string;
}

function getComgateAuthHeader() {
  return `Basic ${Buffer.from(`${COMGATE_MERCHANT}:${COMGATE_SECRET}`).toString('base64')}`;
}

export async function createComgatePayment(params: CreatePaymentParams): Promise<{ redirectUrl: string, transId: string }> {
  try {
    const payload = {
      test: COMGATE_TEST,
      country: 'CZ',
      curr: 'CZK',
      price: Math.round(params.price * 100), // v haléřích
      refId: params.refId,
      email: params.email,
      label: params.label,
      method: 'ALL',
      // 'prepareOnly': true - optional parameter, ale Comgate ve standardu u v2.0 doporučuje, 
      // my prostě přečteme redirect z odpovědi.
    };

    const response = await axios.post(`${COMGATE_BASE_URL}/payment.json`, payload, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getComgateAuthHeader()
      },
    });

    const result = response.data;
    
    if (result.code === 0) {
      // transId je ve struktuře, redirect url může být v různých klíčích,
      // většinou je to result.url_paid ale pokud to není zaplaceno (připravuje se) tak je to url nebo redirect
      // Dle nové dokumentace by to mělo být v klíči `redirect` (nebo my můžeme ručně sestavit url)
      // V dokumentaci V2.0 JSON je obvykle vrácena `redirect` nebo my složíme `https://payments.comgate.cz/client/instructions/index?id=${transId}`
      const transId = result.transId;
      return {
        redirectUrl: result.redirect || `https://payments.comgate.cz/client/instructions/index?id=${transId}`,
        transId: transId as string
      };
    } else {
      throw new Error(`Comgate Error: ${result.message}`);
    }
  } catch (error: any) {
    console.error('Comgate Create Payment Error:', error.response?.data || error.message);
    if (error.response?.data?.message) {
      throw new Error(`Comgate API Error: ${error.response.data.message}`);
    }
    throw error;
  }
}

export async function checkComgatePayment(transId: string): Promise<string> {
  try {
    const response = await axios.get(`${COMGATE_BASE_URL}/payment/transId/${transId}.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getComgateAuthHeader()
      },
    });

    const result = response.data;
    if (result.code === 0) {
      return result.status || 'UNKNOWN';
    } else {
      throw new Error(`Comgate Status Error: ${result.message}`);
    }
  } catch (error: any) {
    console.error('Comgate Check Payment Error:', error.response?.data || error.message);
    throw error;
  }
}
