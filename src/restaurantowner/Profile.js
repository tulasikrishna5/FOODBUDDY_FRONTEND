import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css'; // Import the CSS module
import config from '../config'

export default function Profile() {
  const [restaurantData, setRestaurantData] = useState(null);

  useEffect(() => {
    const storedRestaurantData = localStorage.getItem('restaurantOwner');
    if (storedRestaurantData) {
      const parsedRestaurantData = JSON.parse(storedRestaurantData);
      setRestaurantData(parsedRestaurantData);
    }
  }, []);

  return (
    <div className={styles['profile-card']}>
      {restaurantData && (
        <div>
          <div className={styles['card-header']}>
            <h4>Welcome, {restaurantData.fullname}</h4>
          </div>
          
          <div className={styles['card-body']}>
            <img
              className={styles.logo}
              src={`${config.url}/restaurantimage/${restaurantData.file}`}
              alt={restaurantData.restaurantname}
            />
            <p><strong>Restaurant Name:</strong> {restaurantData.restaurantname}</p>
            <p><strong>Gender:</strong> {restaurantData.gender}</p>
            <p><strong>Date of Birth:</strong> {restaurantData.dateofbirth}</p>
            <p><strong>Email:</strong> {restaurantData.email}</p>
            <p><strong>Location:</strong> {restaurantData.location}</p>
            <p><strong>Contact:</strong> {restaurantData.contact}</p>
          </div>
        </div>
      )}
    </div>
  );
}
