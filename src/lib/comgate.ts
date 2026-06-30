import axios from 'axios';

const COMGATE_MERCHANT = process.env.COMGATE_MERCHANT || '';
const COMGATE_SECRET = process.env.COMGATE_SECRET || '';
const COMGATE_TEST = process.env.COMGATE_TEST === 'true';

const COMGATE_BASE_URL = 'https://payments.comgate.cz/v1.0';

export interface CreatePaymentParams {
  price: number; // in CZK
  refId: string;
  email: string;
  name?: string;
  label: string;
}

export async function createComgatePayment(params: CreatePaymentParams): Promise<{ redirectUrl: string, transId: string }> {
  const data = new URLSearchParams();
  data.append('merchant', COMGATE_MERCHANT);
  data.append('secret', COMGATE_SECRET);
  data.append('test', COMGATE_TEST ? 'true' : 'false');
  data.append('country', 'CZ');
  data.append('curr', 'CZK');
  data.append('price', Math.round(params.price * 100).toString()); // v haléřích
  data.append('refId', params.refId);
  data.append('email', params.email);
  data.append('label', params.label);
  data.append('method', 'ALL');

  try {
    const response = await axios.post(`${COMGATE_BASE_URL}/create`, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const result = new URLSearchParams(response.data);
    
    if (result.get('code') === '0') {
      const transId = result.get('transId');
      return {
        redirectUrl: `https://payments.comgate.cz/client/instructions/index?id=${transId}`,
        transId: transId as string
      };
    } else {
      throw new Error(`Comgate Error: ${result.get('message')}`);
    }
  } catch (error) {
    console.error('Comgate Create Payment Error:', error);
    throw error;
  }
}

export async function checkComgatePayment(transId: string): Promise<string> {
  const data = new URLSearchParams();
  data.append('merchant', COMGATE_MERCHANT);
  data.append('secret', COMGATE_SECRET);
  data.append('transId', transId);

  try {
    const response = await axios.post(`${COMGATE_BASE_URL}/status`, data.toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const result = new URLSearchParams(response.data);
    if (result.get('code') === '0') {
      return result.get('status') || 'UNKNOWN';
    } else {
      throw new Error(`Comgate Status Error: ${result.get('message')}`);
    }
  } catch (error) {
    console.error('Comgate Check Payment Error:', error);
    throw error;
  }
}
