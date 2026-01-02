'use client';

import { useMemo, useEffect, useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import { useSlideshow } from '@/hooks/useSlideshow';
import { sortCurrencies, formatNumber, getFlagUrl } from '@/lib/utils';
import styles from './RatesSlideshow.module.css';

export default function RatesSlideshow() {
  const { rates } = useCurrencyRates();
  const [cardsPerSlide, setCardsPerSlide] = useState(4);

  // Get sorted currency list (excluding EUR)
  const currencyList = useMemo(() => {
    return sortCurrencies(Object.keys(rates).filter((c) => c !== 'EUR'));
  }, [rates]);

  // Calculate cards per slide based on screen width
  useEffect(() => {
    const updateCardsPerSlide = () => {
      if (window.innerWidth <= 480) {
        setCardsPerSlide(1);
      } else if (window.innerWidth <= 768) {
        setCardsPerSlide(2);
      } else {
        setCardsPerSlide(4);
      }
    };

    updateCardsPerSlide();
    window.addEventListener('resize', updateCardsPerSlide);
    return () => window.removeEventListener('resize', updateCardsPerSlide);
  }, []);

  // Create slides
  const slides = useMemo(() => {
    const result: string[][] = [];
    for (let i = 0; i < currencyList.length; i += cardsPerSlide) {
      result.push(currencyList.slice(i, i + cardsPerSlide));
    }
    return result;
  }, [currencyList, cardsPerSlide]);

  const { currentSlide, nextSlide, prevSlide, pause } = useSlideshow(slides.length);

  const handlePrev = () => {
    pause();
    prevSlide();
  };

  const handleNext = () => {
    pause();
    nextSlide();
  };

  if (slides.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h2>Current Exchange Rates</h2>
          <p>Live rates for major currencies updated in real-time</p>
        </header>

        <div className={styles.slideshowContainer}>
          {slides.length > 1 && (
            <>
              <button
                className={`${styles.navButton} ${styles.prevButton}`}
                onClick={handlePrev}
                aria-label="Previous"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              <button
                className={`${styles.navButton} ${styles.nextButton}`}
                onClick={handleNext}
                aria-label="Next"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </>
          )}

          <div
            className={styles.slidesWrapper}
            style={{ transform: `translateX(${-100 * currentSlide}%)` }}
          >
            {slides.map((slide, slideIndex) => (
              <div key={slideIndex} className={styles.slide}>
                {slide.map((code) => {
                  const rate = rates[code];
                  const isTRY = code.toUpperCase() === 'TRY';

                  return (
                    <div key={code} className={styles.rateCard}>
                      <Image
                        src={getFlagUrl(rate?.flag || '')}
                        alt={rate?.name || code}
                        width={40}
                        height={30}
                        className={styles.flag}
                      />
                      <div className={styles.currencyCode}>{code}</div>
                      <div className={styles.rateGrid}>
                        {isTRY ? (
                          <>
                            <div className={styles.rateRow}>
                              <span className={styles.rateLabel}>We Buy 1 EUR</span>
                              <span className={`${styles.rateValue} ${styles.rateBuy}`}>
                                {rate?.sell ? `${formatNumber(rate.sell)} ${code}` : 'N/A'}
                              </span>
                            </div>
                            <div className={styles.rateRow}>
                              <span className={styles.rateLabel}>We Sell 1 EUR</span>
                              <span className={`${styles.rateValue} ${styles.rateSell}`}>
                                {rate?.buy ? `${formatNumber(rate.buy)} ${code}` : 'N/A'}
                              </span>
                            </div>
                            <div className={styles.rateRow}>
                              <span className={styles.rateLabel}>Send 1 EUR</span>
                              <span className={`${styles.rateValue} ${styles.rateSend}`}>
                                {rate?.send ? `${formatNumber(rate.send)} ${code}` : 'N/A'}
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className={styles.rateRow}>
                              <span className={styles.rateLabel}>Buy 1 {code}</span>
                              <span className={`${styles.rateValue} ${styles.rateBuy}`}>
                                {rate?.buy ? `${formatNumber(rate.buy)} EUR` : 'N/A'}
                              </span>
                            </div>
                            <div className={styles.rateRow}>
                              <span className={styles.rateLabel}>Sell 1 {code}</span>
                              <span className={`${styles.rateValue} ${styles.rateSell}`}>
                                {rate?.sell ? `${formatNumber(rate.sell)} EUR` : 'N/A'}
                              </span>
                            </div>
                            <div className={styles.rateRow}>
                              <span className={styles.rateLabel}>Send 1 EUR</span>
                              <span className={`${styles.rateValue} ${styles.rateSend}`}>
                                {rate?.send ? `${formatNumber(rate.send)} ${code}` : 'N/A'}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
