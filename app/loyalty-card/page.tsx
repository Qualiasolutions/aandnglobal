import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Loyalty Card',
  description:
    'Join the A&N Global Exchange loyalty program and earn rewards on your currency exchanges.',
};

export default function LoyaltyCardPage() {
  return (
    <div className={styles.loyaltyPage}>
      <div className={styles.container}>
        <iframe
          src="https://take.cards/mMCab"
          width="100%"
          height="1300"
          className={styles.loyaltyIframe}
          title="A&N Global Loyalty Card"
          loading="lazy"
        />
      </div>
    </div>
  );
}
