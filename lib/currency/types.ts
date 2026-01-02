export interface CurrencyRate {
  code: string;
  name: string;
  flag: string;
  buy?: number;
  sell?: number;
  send?: number;
}

export interface RatesMap {
  [currencyCode: string]: CurrencyRate;
}

export interface SheetBestRow {
  Code?: string;
  code?: string;
  Name?: string;
  name?: string;
  Flag?: string;
  flag?: string;
  Buy?: string | number;
  buy?: string | number;
  Sell?: string | number;
  sell?: string | number;
  Send?: string | number;
  send?: string | number;
}

export interface ConversionResult {
  fromAmount: number;
  toAmount: number;
  fromCurrency: string;
  toCurrency: string;
}
