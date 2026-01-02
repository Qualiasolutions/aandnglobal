/**
 * Formats a number with appropriate decimal places
 */
export function formatNumber(num: number): string {
  if (typeof num !== 'number' || isNaN(num)) return '0';
  return parseFloat(num.toFixed(10)).toString();
}

/**
 * Formats currency amount for display
 */
export function formatCurrency(
  amount: number,
  options?: { minDecimals?: number; maxDecimals?: number }
): string {
  const { minDecimals = 2, maxDecimals = 2 } = options || {};
  return amount.toLocaleString(undefined, {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });
}

/**
 * Converts country code to flag emoji
 */
export function getFlagEmoji(countryCode: string): string {
  if (!countryCode) return '';
  if (countryCode.toLowerCase() === 'eu') return '';
  return String.fromCodePoint(
    ...countryCode
      .toUpperCase()
      .split('')
      .map((char) => 127397 + char.charCodeAt(0))
  );
}

/**
 * Gets flag image URL from flagcdn
 */
export function getFlagUrl(countryCode: string): string {
  if (!countryCode) return '';
  return `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
}

/**
 * Sorts currencies with priority order
 */
export function sortCurrencies(currencies: string[]): string[] {
  const priority = ['USD', 'GBP', 'TRY'];

  return currencies
    .filter((c) => c.toUpperCase() !== 'TL') // Remove TL alias
    .sort((a, b) => {
      const aIndex = priority.indexOf(a);
      const bIndex = priority.indexOf(b);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return a.localeCompare(b);
    });
}

/**
 * Classnames helper
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
