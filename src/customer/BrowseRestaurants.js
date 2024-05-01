import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './BrowseRestaurants.module.css';
import { Link } from 'react-router-dom';
import config from '../config'
export default function BrowseRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  
  
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${config.url}/viewrestaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
   
      fetchRestaurants(); // Call fetchRestaurants after setting customer data
    
  }, []);
  return (
    <div className={styles['restaurant-container']}>
      <h1 className={styles.title}>Restaurants</h1>
      <div className={styles['card-container']}>
        {restaurants.length > 0 ? (
          restaurants.map((restaurant, index) => (
            <div className={styles.card} key={index}>
              <h2 className={styles['restaurant-name']}>{restaurant.restaurantname}</h2>
              <p className={styles.location}>
                <strong>Location:</strong> {restaurant.location}
              </p>
              <div className={styles['image-container']}>
                {restaurant.file.endsWith('.jpg') || restaurant.file.endsWith('.jpeg') || restaurant.file.endsWith('.png') ? (
                  <img
                    src={`${config.url}/restaurantimage/${restaurant.file}`}
                    alt={restaurant.restaurantname}
                    className={styles['restaurant-image']}
                  />
                ) : (
                  <a href={`${config.url}/restaurantimage/${restaurant.file}`} className={styles['image-link']}>
                    Click Here
                  </a>
                )}
              </div>
              <Link to={`/menu/${restaurant.restaurantname}`} className={styles['menu-button']} target="_blank" rel="noopener noreferrer">
  View Menu
</Link>
            </div>
          ))
        ) : (
          <p className={styles['no-restaurants']}>No restaurants found</p>
        )}
      </div>
    </div>
  );
}
