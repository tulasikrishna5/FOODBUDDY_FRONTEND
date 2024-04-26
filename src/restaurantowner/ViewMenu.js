import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ViewMenu.module.css';
import config from '../config'

export default function ViewMenu() {
  const [restaurantData, setRestaurantData] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const storedRestaurantData = localStorage.getItem('restaurantOwner');
    if (storedRestaurantData) {
      const parsedRestaurantData = JSON.parse(storedRestaurantData);
      setRestaurantData(parsedRestaurantData);
    }
  }, []);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        if (restaurantData && restaurantData.restaurantname) {
          const response = await axios.get(`${config.url}/viewmenu/${restaurantData.restaurantname}`);
          setItems(response.data);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    
    fetchMenu();
  }, [restaurantData]);

  return (
    <div className={styles.cardContainer}>
      <h3>Menu</h3>
      <div className={styles.cards}>
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.cardDetails}>
                <div className={styles.cardTitle}>{item.name}</div>
                <div className={styles.cardDescription}>{item.description}</div>
                <div className={styles.cardText}>Type: {item.type}</div>
                <div className={styles.cardText}>Diet Type: {item.Diettype}</div>
              </div>
              <div>
                <div className={styles.cardPrice}>${item.price}</div>
                <img src={item.pic} alt={item.name} className={styles.cardImg} />
              </div>
            </div>
          ))
        ) : (
          <div className={styles.card}>
            <div>Data Not Found</div>
          </div>
        )}
      </div>
    </div>
  );
}
