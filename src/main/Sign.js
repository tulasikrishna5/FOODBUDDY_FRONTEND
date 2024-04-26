import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Sign.module.css'; 
import MainNavBar from './MainNavBar';

export default function Sign() {
  return (
    <div>
      <MainNavBar />
      <div className={styles['sign-container']}>
        <h2>Welcome!</h2>
        <p>Please select who you are:</p>
        <div className={styles['options-container']}>
          <Link to="/adminlogin" className={styles.option}>
            Admin
          </Link>
          <Link to="/restaurantlogin" className={styles.option}>
            Restaurant Owner
          </Link>
          <Link to="/customerlogin" className={styles.option}>
            Customer
          </Link>
        </div>
      </div>
    </div>
  );
}
