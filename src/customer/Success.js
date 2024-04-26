import React from 'react';
import styles from './Success.module.css'; // Import CSS Module

export default function Success() {
  return (
    <div className={styles.successContainer}>
      <div className={styles.successMessage}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your payment.</p>
      </div>
    </div>
  );
}

