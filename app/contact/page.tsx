import type { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { COMPANY_INFO } from '@/lib/constants';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Visit A&N Global Exchange on Ledra Street, Nicosia. Call +357 96 331517 or WhatsApp us for currency exchange and money transfers.',
};

export default function ContactPage() {
  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>
          Get In <span className="highlight">Touch</span>
        </h1>
        <p>
          We&apos;re here to help with all your currency exchange and money transfer
          needs. Find us, call us, or follow us.
        </p>
      </section>

      {/* Main Content */}
      <section className={styles.content}>
        <div className={styles.container}>
          {/* Contact Cards */}
          <div className={styles.cardsGrid}>
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={faMapMarkerAlt} />
              </div>
              <h3>Our Office</h3>
              <p>
                A AND N GLOBAL
                <br />
                Ledras 139, Nicosia 1011
                <br />
                Cyprus
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={faWhatsapp} />
              </div>
              <h3>Phone & WhatsApp</h3>
              <p>
                <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
                <br />
                <a
                  href={COMPANY_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat with us
                </a>
              </p>
            </div>

            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3>Business Hours</h3>
              <p>
                <strong>Daily:</strong>
                <br />
                {COMPANY_INFO.hours}
              </p>
            </div>
          </div>

          {/* Map Section */}
          <div className={styles.mapSection}>
            <h2 className={styles.sectionTitle}>Find Us Here</h2>
            <p className={styles.sectionSubtitle}>
              Located on the bustling Ledras Street, directly opposite
              McDonald&apos;s in the heart of Nicosia&apos;s pedestrian zone.
            </p>
            <div className={styles.mapContainer}>
              <iframe
                src="https://maps.google.com/maps?q=A%20AND%20N%20GLOBAL%2C%20Ledras%20139%2C%20Nicosia%201011&t=&z=17&ie=UTF8&iwloc=&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="A&N Global Location"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
