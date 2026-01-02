import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faExchangeAlt,
  faGlobe,
  faCoins,
  faCheckCircle,
  faHandshake,
  faShieldAlt,
  faClock,
  faAward,
} from '@fortawesome/free-solid-svg-icons';
import { COMPANY_INFO } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about A&N Global Exchange - your trusted currency exchange partner in Nicosia, Cyprus since 2023.',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          About <span className="highlight">A&N Global</span>
        </h1>
        <p>
          Your trusted currency exchange partner in the heart of Nicosia, Cyprus.
          We provide fast, secure, and commission-free exchange services.
        </p>
      </section>

      {/* Introduction Section */}
      <section className={styles.intro}>
        <div className={styles.container}>
          <div className={styles.introContent}>
            <h2>Who We Are</h2>
            <p>
              A&N Global Exchange Ltd is a licensed currency exchange company
              established in 2023, located on the bustling Ledra Street in Nicosia.
              We specialize in providing competitive exchange rates for all major
              currencies with zero commission fees.
            </p>
            <p>
              Our mission is to make currency exchange simple, transparent, and
              accessible to everyone - whether you&apos;re a tourist, business owner,
              or resident looking for the best rates in Cyprus.
            </p>
          </div>
          <div className={styles.statsGrid}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>0%</span>
              <span className={styles.statLabel}>Commission</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{COMPANY_INFO.established}</span>
              <span className={styles.statLabel}>Established</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>30+</span>
              <span className={styles.statLabel}>Currencies</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>5★</span>
              <span className={styles.statLabel}>Rating</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.services}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Services</h2>
          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <FontAwesomeIcon icon={faExchangeAlt} className={styles.serviceIcon} />
              <h3>Currency Exchange</h3>
              <p>
                Exchange all major currencies at competitive rates with zero
                commission. Real-time rates updated throughout the day.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <FontAwesomeIcon icon={faGlobe} className={styles.serviceIcon} />
              <h3>International Transfers</h3>
              <p>
                Send money worldwide quickly and securely. Competitive rates for
                international remittances to over 100 countries.
              </p>
            </div>
            <div className={styles.serviceCard}>
              <FontAwesomeIcon icon={faCoins} className={styles.serviceIcon} />
              <h3>Crypto Services</h3>
              <p>
                Buy and sell major cryptocurrencies. Convert between crypto and
                fiat currencies with transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.values}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valuesGrid}>
            <div className={styles.valueItem}>
              <FontAwesomeIcon icon={faCheckCircle} className={styles.valueIcon} />
              <div>
                <h4>Transparency</h4>
                <p>No hidden fees, no surprises. What you see is what you get.</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <FontAwesomeIcon icon={faHandshake} className={styles.valueIcon} />
              <div>
                <h4>Trust</h4>
                <p>Licensed and regulated, serving customers with integrity.</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <FontAwesomeIcon icon={faShieldAlt} className={styles.valueIcon} />
              <div>
                <h4>Security</h4>
                <p>Your transactions are safe with our secure systems.</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <FontAwesomeIcon icon={faClock} className={styles.valueIcon} />
              <div>
                <h4>Convenience</h4>
                <p>Open 10 AM - 8 PM daily for your convenience.</p>
              </div>
            </div>
            <div className={styles.valueItem}>
              <FontAwesomeIcon icon={faAward} className={styles.valueIcon} />
              <div>
                <h4>Excellence</h4>
                <p>We strive to provide the best rates and service quality.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Info */}
      <section className={styles.registration}>
        <div className={styles.container}>
          <p>
            <strong>A&N Global Exchange Ltd</strong> | Registration: {COMPANY_INFO.registration}
          </p>
          <p>{COMPANY_INFO.address}</p>
        </div>
      </section>
    </div>
  );
}
