import React from 'react';
import styles from './FAQ.module.css'; 


export default function FAQ() {
  return (
    <div>
    
    <div className={styles.faqContainer}>
      
      
      <div className={styles.faqItem}>
        <h2>How can I place an order?</h2>
        <p>To place an order, simply browse through our restaurants, select your desired dishes, and proceed to checkout.</p>
      </div>
      
      <div className={styles.faqItem}>
        <h2>What payment methods do you accept?</h2>
        <p>We accept various payment methods including credit/debit cards, PayPal, and cash on delivery.</p>
      </div>
      
      <div className={styles.faqItem}>
        <h2>How long does it take for delivery?</h2>
        <p>Delivery times may vary depending on your location and restaurant availability. Typically, orders are delivered within 30-60 minutes.</p>
      </div>
      
  
      
    </div>
    </div>
  );
}
