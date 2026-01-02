'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.css';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Something went wrong</h1>
      <p className={styles.message}>
        We apologize for the inconvenience. Please try again.
      </p>
      <div className={styles.actions}>
        <button onClick={() => reset()} className={styles.button}>
          Try again
        </button>
        <Link href="/" className={styles.link}>
          Return to Home
        </Link>
      </div>
    </div>
  );
}
