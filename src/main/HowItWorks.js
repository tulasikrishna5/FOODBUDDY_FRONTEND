import React from 'react';
import styles from './HowItWorks.module.css'; // Import module.css file for styling


import RestaurantImage from './images/restaurant.jpeg';
import DishImage from './images/dish.jpeg';
import CartImage from './images/cart.jpeg';
import OrderImage from './images/order.jpeg';
import PaymentImage from './images/payment.jpeg';
import PreparationImage from './images/preparation.jpeg';
import DeliveryAssignmentImage from './images/delivery-assignment.jpeg';
import FoodDeliveryImage from './images/food-delivery.jpeg';

export default function HowItWorks() {
  return (
    <div>
      
      <div className={styles.stepsContainer}>
        <Step
          title="Choose Your Restaurant"
          content="Browse through our extensive list of restaurants and choose your favorite one. Enjoy a wide range of cuisines at your fingertips!"
          image={RestaurantImage}
          index={1}
        />
        <Step
          title="Select Your Dish"
          content="Explore the menu and select the dish you crave. Every dish is prepared with love and perfection!"
          image={DishImage}
          index={2}
        />
        <Step
          title="Add to Cart"
          content="Found what you were looking for? Add it to your cart and you’re one step closer to a delightful meal!"
          image={CartImage}
          index={3}
        />
        <Step
          title="Place Your Order"
          content="Review your order, proceed to checkout, and get ready for a culinary treat delivered right at your doorstep!"
          image={OrderImage}
          index={4}
        />
        <Step
          title="Payment Gateway"
          content="Choose from various payment options available. Our payment gateway is secure, fast, and convenient!"
          image={PaymentImage}
          index={5}
        />
        <Step
          title="Order Preparation"
          content="Your selected restaurant receives the order instantly. Watch as they prepare your dish with utmost care!"
          image={PreparationImage}
          index={6}
        />
        <Step
          title="Delivery Assignment"
          content="A delivery partner is assigned! They ensure that your food reaches you hot, fresh, and in no time!"
          image={DeliveryAssignmentImage}
          index={7}
        />
        <Step
          title="Food Delivery"
          content="Knock knock! Your delicious meal has arrived. Enjoy dining in comfort."
          image={FoodDeliveryImage}
          index={8}
        />
      </div>
    </div>
  );
}

function Step({ title, content, image, index }) {
  return (
    <div className={styles.step}>
      <h2>{index}. {title}</h2>
      <div className={styles.stepContent}>
        <img src={image} alt={title} className={styles.stepImage} />
        <p>{content}</p>
      </div>
    </div>
  );
}
