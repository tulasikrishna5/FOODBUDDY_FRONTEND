import React, { useEffect, useState } from 'react';

import styles from './AdminHome.module.css';

import axios from 'axios';
import config from '../config'
import { ToastContainer, toast } from 'react-toastify';
export default function AdminHome() {
  const [feedbackIndex, setFeedbackIndex] = useState(0);
  const [restaurants, setRestaurants] = useState([]);

  const feedbackData = [
    { message: "Great service and delicious food!", customerName: "Vishnu" },
    { message: "Fast delivery and amazing quality!", customerName: "Neeraj" },
    { message: "Highly recommended! User friendly.", customerName: "Tulasi" }
  ];

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${config.url}/viewrestaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchRestaurants();
    toast(`Welcome Admin`, {
      position: "top-right",
      toastClassName: "custom-toast"
    });
  }, []);

  const handleNextFeedback = () => {
    setFeedbackIndex((prevIndex) => (prevIndex + 1) % feedbackData.length);
  };

  const handlePrevFeedback = () => {
    setFeedbackIndex((prevIndex) => (prevIndex - 1 + feedbackData.length) % feedbackData.length);
  };

  return (
    <div>
            <ToastContainer position="top-right" />

      <br />
      <br />
      <section id="inquires" className={styles.section}>
        <h1 align="center" className={styles.title}>Customer Feedback</h1>
        <div className={styles.feedbackContainer}>
          <div className={styles.feedbackCard}>
            <p>{feedbackData[feedbackIndex].message}</p>
            <p>- {feedbackData[feedbackIndex].customerName}</p>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button onClick={handlePrevFeedback}>Previous</button>
          <button onClick={handleNextFeedback}>Next</button>
        </div>
      </section>

      {/* Integrate BrowseRestaurants component in this section */}
      <div className={styles['restaurant-container']}>
        <h1 className={styles.title}>Restaurants</h1>
        <div className={styles['card-container']}>
          {restaurants.length > 0 &&
            restaurants.map((restaurant, index) => (
              <div className={styles.card} key={index}>
                <h2 className={styles['restaurant-name']}>{restaurant.restaurantname}</h2>
                <p className={styles.location}>
                  <strong>Location:</strong> {restaurant.location}
                </p>
                <div className={styles['image-container']}>
                  {restaurant.file.endsWith('.jpg') || restaurant.file.endsWith('.jpeg') || restaurant.file.endsWith('.png') ? (
                    <img
                      src={`${config.url}//restaurantimage/${restaurant.file}`}
                      alt={restaurant.restaurantname}
                      className={styles['restaurant-image']}
                    />
                  ) : (
                    <a href={`${config.url}//restaurantimage/${restaurant.file}`} className={styles['image-link']}>
                      Click Here
                    </a>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
