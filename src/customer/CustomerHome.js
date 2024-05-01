import React, {  useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import config from '../config';
import styles from './CustomerHome.module.css';




export default function CustomerHome() {
 
  const [restaurants, setRestaurants] = useState([]);
  const [customer , setcustomer] = useState(null);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const fetchRestaurants = async () => {
    try {
      const response = await axios.get(`${config.url}/viewrestaurants`);
      setRestaurants(response.data);
    } catch (error) {
      console.error(error.message);
      
    }
  };

  const fetchMenu = async () => {
    try {
      const response = await axios.get(`${config.url}/getmenu`);
      setItems(response.data);
      setError('');
    } catch (error) {
      console.error('Error fetching menu:', error);
      setError('Error fetching menu data');
    }
  };
  useEffect(() => {
    const storedcustomerData = localStorage.getItem('customer');
    if (storedcustomerData) {
      const parsedcustomerData = JSON.parse(storedcustomerData);
      setcustomer(parsedcustomerData)

      toast(`Welcome ${parsedcustomerData.fullname}`, {
        position: "top-right",
        toastClassName: "custom-toast"
      });
      fetchRestaurants();
      fetchMenu();
    }
  }, []);
  const addtocart = async (itemid, itemname, pic, itemnumber, customeremail, price) => {
    try {
      const response = await axios.post(`${config.url}/addtocart`, { itemid, itemname, pic, itemnumber, price, customeremail });
      fetchMenu(); // Refetch menu after adding to cart
      
      toast.success(`${response.data}`, {
        position: "top-right"
      });
      setMessage(response.data);
      setError('');
    } catch (error) {
     
      toast.error(`${error.response.data}`, {
        position: "top-right"
      });
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
    <div>
      <ToastContainer position="top-right" />
      {
        error?<h3 align="center">{error}</h3>:message?<h2> </h2>:<h2> </h2>
       }
      <br/><br/>
      <h2 style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "24px", textDecoration: "underline" , textAlign: "center"}}>Top Restaurants</h2>
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
      
      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '10px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "24px", textDecoration: "underline" }}>Popular Dishes in Your City</h2>
        
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
              <button className={styles.button} onClick={() => addtocart(item.itemid, item.name, item.pic, 1, customer.email, item.price)}>
                Add To Cart
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p>No menu items found</p>}
      </div>
        
        </div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <Link to="/browserestaurants" style={{ textDecoration: 'none', backgroundColor: '#FF6347', color: 'white', padding: '10px 20px', borderRadius: '5px', fontSize: '18px' }}>Show More</Link>
      </div>
      </div>

     
   
    
  );
}
