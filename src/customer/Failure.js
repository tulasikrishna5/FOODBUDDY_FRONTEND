import React from 'react';
import styles from './Failure.module.css'; // Import CSS Module

export default function Failure() {
  return (
    <div className={styles.failureContainer}>
      <div className={styles.failureMessage}>
        <h2>Payment Failed!</h2>
        <p>Sorry, we were unable to process your payment.</p>
      </div>
    </div>
  );
}
