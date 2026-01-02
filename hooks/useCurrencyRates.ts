'use client';

import useSWR from 'swr';
import { fetchCurrencyRates, FALLBACK_RATES } from '@/lib/currency';
import type { RatesMap } from '@/lib/currency';
import { POLL_INTERVAL } from '@/lib/constants';

export function useCurrencyRates() {
  const { data, error, isLoading, mutate } = useSWR<RatesMap>(
    'currency-rates',
    fetchCurrencyRates,
    {
      refreshInterval: POLL_INTERVAL,
      fallbackData: FALLBACK_RATES,
      revalidateOnFocus: true,
      dedupingInterval: 5000,
      onError: (err) => {
        console.error('Currency rates fetch error:', err);
      },
    }
  );

  return {
    rates: data || FALLBACK_RATES,
    isLoading,
    isError: !!error,
    isOffline: !!error,
    refresh: () => mutate(),
    currencyCount: data ? Object.keys(data).filter(k => k !== 'EUR').length : 0,
  };
}
