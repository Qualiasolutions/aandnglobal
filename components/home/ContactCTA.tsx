import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { COMPANY_INFO } from '@/lib/constants';
import styles from './ContactCTA.module.css';

export default function ContactCTA() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.banner}>0% Commission Guarantee</div>
        <h2 className={styles.title}>Ready to Exchange Currency?</h2>
        <div className={styles.buttons}>
          <Link
            href={COMPANY_INFO.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.button} ${styles.whatsappButton}`}
          >
            <FontAwesomeIcon icon={faWhatsapp} />
            <span>WhatsApp Now</span>
          </Link>
          <Link
            href={`tel:${COMPANY_INFO.phoneDisplay}`}
            className={`${styles.button} ${styles.phoneButton}`}
          >
            <FontAwesomeIcon icon={faPhone} />
            <span>Call {COMPANY_INFO.phoneDisplay}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
