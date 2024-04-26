import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import styles from './Profile.module.css'; // Import the CSS module

export default function Profile() {
  const [customerData, setCustomerData] = useState(null);

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  return (
    <div className={styles['profile-card']}>
      {customerData && (
        <div>
          <div className={styles['card-header']}>
            <h4>Welcome, {customerData.fullname}</h4>
          </div>
          <div className={styles['card-body']}>
            <p><strong>Name:</strong> {customerData.fullname}</p>
            <p><strong>Gender:</strong> {customerData.gender}</p>
            <p><strong>Date of Birth:</strong> {customerData.dateofbirth}</p>
            <p><strong>Email:</strong> {customerData.email}</p>
            <p><strong>Location:</strong> {customerData.location}</p>
            <p><strong>Contact:</strong> {customerData.contact}</p>
          </div>
          <div className={styles['card-footer']}>
            <Link to="/updateprofile" className={styles['update-button']}>
              Update Profile
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
