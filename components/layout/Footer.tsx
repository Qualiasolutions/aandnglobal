import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { COMPANY_INFO, NAV_LINKS } from '@/lib/constants';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Company Info */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>
              A&N <span className={styles.highlight}>Global</span>
            </h3>
            <p className={styles.description}>
              Your trusted currency exchange partner in Nicosia, Cyprus.
              Zero commission on all exchanges.
            </p>
          </div>

          {/* Quick Links */}
          <div className={styles.section}>
            <h4 className={styles.sectionHeading}>Quick Links</h4>
            <ul className={styles.linkList}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.section}>
            <h4 className={styles.sectionHeading}>Contact Us</h4>
            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faPhone} className={styles.icon} />
                <a href={`tel:${COMPANY_INFO.phone}`}>{COMPANY_INFO.phone}</a>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faWhatsapp} className={styles.icon} />
                <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.icon} />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className={styles.contactItem}>
                <FontAwesomeIcon icon={faClock} className={styles.icon} />
                <span>Daily: {COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>
            &copy; {currentYear} {COMPANY_INFO.name}. All rights reserved.
          </p>
          <p className={styles.registration}>
            Registration: {COMPANY_INFO.registration}
          </p>
        </div>
      </div>
    </footer>
  );
}
