'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faClock,
  faShieldAlt,
  faGlobe,
  faPhone,
  faStar,
  faSync,
} from '@fortawesome/free-solid-svg-icons';
import { useCurrencyRates } from '@/hooks/useCurrencyRates';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const { currencyCount, isOffline, refresh } = useCurrencyRates();

  const scrollToConverter = () => {
    document.getElementById('converter')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.hero}>
      {/* Globe Background */}
      <div className={styles.globeBg} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://img.freepik.com/premium-vector/world-map-globe-vector-illustration-world-map-symbol-isolated-vector-eps10_532800-267.jpg"
          alt=""
          className={styles.globeImage}
        />
      </div>

      <div className={styles.container}>
        <div className={styles.content}>
          {/* Text Section */}
          <div className={styles.textSection}>
            <h1 className={styles.headline}>
              Currency Exchange <span className="highlight">Made Simple</span>
            </h1>
            <p className={styles.subtitle}>
              Get real-time exchange rates, send money worldwide, and enjoy
              zero-commission fees with Cyprus&apos;s trusted exchange partner.
            </p>

            <div className={styles.features}>
              <div className={styles.feature}>
                <FontAwesomeIcon icon={faCheckCircle} className={styles.featureIcon} />
                <span>Zero Commission on All Exchanges</span>
              </div>
              <div className={styles.feature}>
                <FontAwesomeIcon icon={faClock} className={styles.featureIcon} />
                <span>Real-Time Market Rates</span>
              </div>
              <div className={styles.feature}>
                <FontAwesomeIcon icon={faShieldAlt} className={styles.featureIcon} />
                <span>Secure & Licensed Service</span>
              </div>
              <div className={styles.feature}>
                <FontAwesomeIcon icon={faGlobe} className={styles.featureIcon} />
                <span>All Currencies Available</span>
              </div>
            </div>

            <div className={styles.cta}>
              <button className={styles.ctaButton} onClick={scrollToConverter}>
                Start Converting
              </button>
              <div className={styles.liveIndicator}>
                <div
                  className={styles.liveDot}
                  style={{ background: isOffline ? '#ffa500' : undefined }}
                />
                <span className={styles.liveText}>
                  {isOffline ? 'Offline Mode' : 'Live Rates'}
                </span>
              </div>
            </div>

            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhone} className={styles.contactIcon} />
                <span>96331517</span>
              </div>
              <div className={styles.contactItem}>
                <FontAwesomeIcon icon={faStar} className={styles.contactIcon} />
                <span>0% Commission</span>
              </div>
              <button className={styles.refreshButton} onClick={refresh}>
                <FontAwesomeIcon icon={faSync} className={styles.contactIcon} />
                <span>Refresh Rates</span>
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className={styles.visualSection}>
            <div className={styles.statsGrid}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{currencyCount}+</span>
                <span className={styles.statLabel}>Currencies</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>0%</span>
                <span className={styles.statLabel}>Commission</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>5★</span>
                <span className={styles.statLabel}>Rating</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>10-8</span>
                <span className={styles.statLabel}>Daily Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
