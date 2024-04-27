import React from 'react';
import styles from './AboutUs.module.css'; 


export default function AboutUs() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.aboutContainer}>
          <h2>About Us</h2>
          <div className={styles.aboutContent}>
            <p>Welcome to our online food ordering website!</p>
            <p>Indulge in a culinary journey from the comfort of your home with our diverse selection of cuisines.</p>
            <p>At <span className={styles.brandName}>FoodBuddy</span>, we are passionate about delivering delicious meals straight to your doorstep.</p>
            <p>From savory pizzas to exotic sushi, our carefully curated menu is sure to satisfy every craving.</p>
            <p>Join us in exploring the world of flavors and convenience. Let's make every meal a memorable experience!</p>
          </div>
        </div>
        <div className={styles.contactContainer}>
          <h2>Contact Us</h2>
          <div className={styles.contactInfo}>
            <p>Phone: <a href='tel:+7506987947'>7506987947</a></p>
            <p>Email: <a href='mailto:foodbuddy@gmail.com'>foodbuddy@gmail.com</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}
