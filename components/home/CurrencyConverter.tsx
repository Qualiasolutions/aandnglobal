'use client';

import { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import {
  convertAmount,
  inverseConvertAmount,
  convertToEurEquivalent,
} from '@/lib/currency/conversion';
import { formatCurrency, getFlagUrl, sortCurrencies, getFlagEmoji } from '@/lib/utils';
import { HIGH_VALUE_THRESHOLD } from '@/lib/constants';
import styles from './CurrencyConverter.module.css';

export default function CurrencyConverter() {
  const { rates } = useCurrencyRates();
  const [fromAmount, setFromAmount] = useState<string>('100');
  const [toAmount, setToAmount] = useState<string>('');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [isReverse, setIsReverse] = useState(false);
  const [isSwapping, setIsSwapping] = useState(false);

  // Get sorted currency list
  const currencyList = useMemo(() => {
    return sortCurrencies(Object.keys(rates));
  }, [rates]);

  // Calculate conversion
  const { convertedAmount, showHighValueMessage } = useMemo(() => {
    const amount = parseFloat(isReverse ? toAmount : fromAmount) || 0;

    if (isReverse) {
      const converted = inverseConvertAmount(amount, fromCurrency, toCurrency, rates);
      const eurEquivalent = convertToEurEquivalent(converted, fromCurrency, rates);
      return {
        convertedAmount: converted,
        showHighValueMessage: eurEquivalent >= HIGH_VALUE_THRESHOLD,
      };
    } else {
      const converted = convertAmount(amount, fromCurrency, toCurrency, rates);
      const eurEquivalent = convertToEurEquivalent(amount, fromCurrency, rates);
      return {
        convertedAmount: converted,
        showHighValueMessage: eurEquivalent >= HIGH_VALUE_THRESHOLD,
      };
    }
  }, [fromAmount, toAmount, fromCurrency, toCurrency, rates, isReverse]);

  // Update display amounts
  const displayFromAmount = isReverse
    ? formatCurrency(convertedAmount)
    : fromAmount;
  const displayToAmount = isReverse
    ? toAmount
    : formatCurrency(convertedAmount);

  const handleFromAmountChange = useCallback((value: string) => {
    setFromAmount(value);
    setIsReverse(false);
  }, []);

  const handleToAmountChange = useCallback((value: string) => {
    setToAmount(value);
    setIsReverse(true);
  }, []);

  const handleSwap = useCallback(() => {
    setIsSwapping(true);
    setTimeout(() => {
      setFromCurrency(toCurrency);
      setToCurrency(fromCurrency);
      setIsReverse(false);
      setIsSwapping(false);
    }, 150);
  }, [fromCurrency, toCurrency]);

  const handleFromCurrencyChange = useCallback((code: string) => {
    setFromCurrency(code);
    setIsReverse(false);
  }, []);

  const handleToCurrencyChange = useCallback((code: string) => {
    setToCurrency(code);
    setIsReverse(false);
  }, []);

  const finalFromAmount = parseFloat(isReverse ? displayFromAmount : fromAmount) || 0;
  const finalToAmount = parseFloat(isReverse ? toAmount : displayToAmount) || 0;

  return (
    <section className={styles.section} id="converter">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Currency Converter</h2>
          <p>Real-time exchange rates with competitive pricing and zero commission</p>
        </header>

        <div className={styles.converterBox}>
          <div className={styles.grid}>
            {/* FROM */}
            <div className={styles.inputSection}>
              <label className={styles.label}>FROM</label>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  value={isReverse ? displayFromAmount : fromAmount}
                  onChange={(e) => handleFromAmountChange(e.target.value)}
                  placeholder="100.00"
                  className={styles.amountInput}
                />
                <div className={styles.currencySelector}>
                  <Image
                    src={getFlagUrl(rates[fromCurrency]?.flag || 'us')}
                    alt={fromCurrency}
                    width={32}
                    height={24}
                    className={styles.flag}
                  />
                  <span className={styles.currencyCode}>{fromCurrency}</span>
                  <select
                    value={fromCurrency}
                    onChange={(e) => handleFromCurrencyChange(e.target.value)}
                    className={styles.currencySelect}
                  >
                    {currencyList.map((code) => (
                      <option key={code} value={code}>
                        {getFlagEmoji(rates[code]?.flag || '')} {rates[code]?.name} ({code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* SWAP BUTTON */}
            <div className={styles.swapWrapper}>
              <button
                className={`${styles.swapButton} ${isSwapping ? styles.swapping : ''}`}
                onClick={handleSwap}
                aria-label="Swap currencies"
              >
                <FontAwesomeIcon icon={faExchangeAlt} />
              </button>
            </div>

            {/* TO */}
            <div className={styles.inputSection}>
              <label className={styles.label}>TO</label>
              <div className={styles.inputGroup}>
                <input
                  type="number"
                  value={isReverse ? toAmount : displayToAmount}
                  onChange={(e) => handleToAmountChange(e.target.value)}
                  placeholder="0.00"
                  className={styles.amountInput}
                />
                <div className={styles.currencySelector}>
                  <Image
                    src={getFlagUrl(rates[toCurrency]?.flag || 'eu')}
                    alt={toCurrency}
                    width={32}
                    height={24}
                    className={styles.flag}
                  />
                  <span className={styles.currencyCode}>{toCurrency}</span>
                  <select
                    value={toCurrency}
                    onChange={(e) => handleToCurrencyChange(e.target.value)}
                    className={styles.currencySelect}
                  >
                    {currencyList.map((code) => (
                      <option key={code} value={code}>
                        {getFlagEmoji(rates[code]?.flag || '')} {rates[code]?.name} ({code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Rate Summary */}
          <div className={styles.rateSummary}>
            <span className={styles.summaryAmount}>
              {formatCurrency(finalFromAmount)}
            </span>
            <span className={styles.summaryCurrency}>{fromCurrency}</span>
            {' = '}
            <span className={styles.summaryResult}>
              {formatCurrency(finalToAmount)}
            </span>
            <span className={styles.summaryCurrency}>{toCurrency}</span>
          </div>

          {/* High Value Message */}
          <div
            className={`${styles.highValueMessage} ${
              showHighValueMessage ? styles.show : styles.hide
            }`}
          >
            <FontAwesomeIcon icon={faPhone} className={styles.messageIcon} />
            To get better rates please contact us
          </div>
        </div>
      </div>
    </section>
  );
}
