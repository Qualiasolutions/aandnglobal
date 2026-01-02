import type { RatesMap, SheetBestRow } from './types';

const SHEETBEST_API = process.env.NEXT_PUBLIC_SHEETBEST_API || '';

/**
 * Maps SheetBest row data to our RatesMap format
 */
function mapRowsToRates(rows: SheetBestRow[]): RatesMap {
  const rates: RatesMap = {};

  rows.forEach((row) => {
    const code = row.Code || row.code;
    const name = row.Name || row.name;
    const flag = row.Flag || row.flag;
    const buy = row.Buy || row.buy;
    const sell = row.Sell || row.sell;
    const send = row.Send || row.send;

    if (code) {
      rates[code] = {
        code,
        name: name || code,
        flag: (flag || '').toLowerCase(),
        buy: buy ? Number(buy) : undefined,
        sell: sell ? Number(sell) : undefined,
        send: send ? Number(send) : undefined,
      };
    }
  });

  return rates;
}

/**
 * Fetches currency rates from SheetBest API
 */
export async function fetchCurrencyRates(): Promise<RatesMap> {
  if (!SHEETBEST_API) {
    throw new Error('SheetBest API URL not configured');
  }

  const response = await fetch(`${SHEETBEST_API}?v=${Date.now()}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`SheetBest API error: ${response.status}`);
  }

  const rows: SheetBestRow[] = await response.json();
  return mapRowsToRates(rows);
}
