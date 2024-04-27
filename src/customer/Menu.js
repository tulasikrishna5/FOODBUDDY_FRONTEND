import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './Menu.module.css';
import config from '../config';

export default function Menu() {
  const { restaurantname } = useParams();
  const [customerData, setCustomerData] = useState(null);
  const [items, setItems] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomerData = localStorage.getItem('customer');
    if (storedCustomerData) {
      const parsedCustomerData = JSON.parse(storedCustomerData);
      setCustomerData(parsedCustomerData);
    }
  }, []);

  const fetchMenu = async () => {
    try {
      if (!restaurantname) {
        setError('Restaurant name is missing');
        return;
      }
      const response = await axios.get(`${config.url}/viewmenubycustomer/${encodeURIComponent(restaurantname)}`);
      setItems(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching menu:', error);
      setError('Error fetching menu data');
    }
  };

  useEffect(() => {
    fetchMenu(); // This useEffect runs whenever `restaurantname` changes
  }, [restaurantname]); // `restaurantname` is a dependency for this useEffect

  const addtocart = async (itemid, itemname, pic, itemnumber, customeremail, price) => {
    try {
      const response = await axios.post(`${config.url}/addtocart`, { itemid, itemname, pic, itemnumber, price, customeremail });
      fetchMenu(); // Refetch menu after adding to cart
      setMessage(response.data);
      setError('');
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  const getPriceColor = (price) => {
    if (price < 10) {
      return 'green';
    } else if (price >= 10 && price < 20) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  return (
    <div className={styles.menuContainer}>
      <h3 className={styles.menuHeader}>Menu for {restaurantname}</h3>

      {message && <h4 className={styles.message}>{message}</h4>}
      {error && <h4 className={styles.error}>{error}</h4>}

      <div className={styles.cardContainer}>
        {items.map((item, index) => (
          <div key={index} className={styles.card}>
            <img src={item.pic} alt={item.name} className={styles.cardImgTop} />
            <div className={styles.cardBody}>
              <h5 className={styles.cardTitle}>{item.name}</h5>
              <p className={styles.cardText}>{item.description}</p>
              <p className={styles.cardType}>Type: {item.type}</p>
              <p className={styles.cardDietType}>Diet Type: {item.Diettype}</p>
              <p className={styles.cardPrice} style={{ color: getPriceColor(item.price) }}>
                Price: {item.price}
              </p>
              <button className={styles.button} onClick={() => addtocart(item.itemid, item.name, item.pic, 1, customerData.email, item.price)}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No menu items found</p>}
      </div>
    </div>
  );
}
