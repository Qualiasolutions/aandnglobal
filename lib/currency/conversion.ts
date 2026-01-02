import type { RatesMap } from './types';

/**
 * Check if currency is Turkish Lira (has inverted rate handling)
 */
const isTurkishLira = (code: string): boolean =>
  code?.toUpperCase() === 'TRY';

/**
 * Converts amount between currencies using EUR as base.
 *
 * Rate interpretation:
 * - For most currencies: buy/sell rates are EUR per unit (e.g., 1 USD = 0.92 EUR)
 * - For TRY: rates are units per EUR (e.g., 1 EUR = 48 TRY)
 */
export function convertAmount(
  fromAmount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: RatesMap
): number {
  if (!fromAmount || fromAmount <= 0) return 0;
  if (fromCurrency === toCurrency) return fromAmount;

  // Case 1: Converting TO EUR (e.g., USD -> EUR)
  if (fromCurrency !== 'EUR' && toCurrency === 'EUR') {
    const buyRate = rates[fromCurrency]?.buy;
    if (!buyRate) return 0;
    return isTurkishLira(fromCurrency)
      ? fromAmount / buyRate   // TRY: divide (48 TRY / 48 = 1 EUR)
      : fromAmount * buyRate;  // Others: multiply (100 USD * 0.92 = 92 EUR)
  }

  // Case 2: Converting FROM EUR (e.g., EUR -> GBP)
  if (fromCurrency === 'EUR' && toCurrency !== 'EUR') {
    const sellRate = rates[toCurrency]?.sell;
    if (!sellRate) return 0;
    return isTurkishLira(toCurrency)
      ? fromAmount * sellRate  // TRY: multiply (1 EUR * 47 = 47 TRY)
      : fromAmount / sellRate; // Others: divide (100 EUR / 1.15 = 86.96 GBP)
  }

  // Case 3: Cross-currency (e.g., USD -> GBP via EUR)
  if (fromCurrency !== 'EUR' && toCurrency !== 'EUR') {
    // First convert to EUR
    const buyRate = rates[fromCurrency]?.buy;
    const eurAmount = isTurkishLira(fromCurrency)
      ? (buyRate ? fromAmount / buyRate : 0)
      : (buyRate ? fromAmount * buyRate : 0);

    // Then convert from EUR to target
    const sellRate = rates[toCurrency]?.sell;
    return isTurkishLira(toCurrency)
      ? (sellRate ? eurAmount * sellRate : 0)
      : (sellRate ? eurAmount / sellRate : 0);
  }

  return 0;
}

/**
 * Inverse conversion (for bidirectional input)
 */
export function inverseConvertAmount(
  toAmount: number,
  fromCurrency: string,
  toCurrency: string,
  rates: RatesMap
): number {
  if (!toAmount || toAmount <= 0) return 0;
  if (fromCurrency === toCurrency) return toAmount;

  // Case 1: Converting TO EUR (reverse)
  if (fromCurrency !== 'EUR' && toCurrency === 'EUR') {
    const buyRate = rates[fromCurrency]?.buy;
    if (!buyRate) return 0;
    return isTurkishLira(fromCurrency)
      ? toAmount * buyRate
      : toAmount / buyRate;
  }

  // Case 2: Converting FROM EUR (reverse)
  if (fromCurrency === 'EUR' && toCurrency !== 'EUR') {
    const sellRate = rates[toCurrency]?.sell;
    if (!sellRate) return 0;
    return isTurkishLira(toCurrency)
      ? toAmount / sellRate
      : toAmount * sellRate;
  }

  // Case 3: Cross-currency (reverse)
  if (fromCurrency !== 'EUR' && toCurrency !== 'EUR') {
    const sellRate = rates[toCurrency]?.sell;
    const eurAmount = isTurkishLira(toCurrency)
      ? (sellRate ? toAmount / sellRate : 0)
      : (sellRate ? toAmount * sellRate : 0);

    const buyRate = rates[fromCurrency]?.buy;
    return isTurkishLira(fromCurrency)
      ? (buyRate ? eurAmount * buyRate : 0)
      : (buyRate ? eurAmount / buyRate : 0);
  }

  return 0;
}

/**
 * Converts amount to EUR equivalent for threshold checking.
 * Used for "Contact us for better rates" message at 3999+ EUR.
 */
export function convertToEurEquivalent(
  amount: number,
  currency: string,
  rates: RatesMap
): number {
  if (!amount || amount <= 0) return 0;
  if (currency === 'EUR') return amount;

  const buyRate = rates[currency]?.buy;
  if (!buyRate) return 0;

  return isTurkishLira(currency)
    ? amount / buyRate
    : amount * buyRate;
}
