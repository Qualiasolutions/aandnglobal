import type { RatesMap } from './types';

export const FALLBACK_RATES: RatesMap = {
  EUR: { code: 'EUR', name: 'Euro', flag: 'eu', buy: 1, sell: 1, send: 1 },
  USD: { code: 'USD', name: 'US Dollar', flag: 'us', buy: 0.92, sell: 0.94, send: 0.94 },
  GBP: { code: 'GBP', name: 'British Pound', flag: 'gb', buy: 1.13, sell: 1.15, send: 1.15 },
  TRY: { code: 'TRY', name: 'Turkish Lira', flag: 'tr', buy: 48, sell: 47, send: 47 },
};
