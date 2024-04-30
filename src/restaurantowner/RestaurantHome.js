import React, { useEffect } from 'react';

import { Card, CardContent, Typography } from '@mui/material';
import styles from './RestaurantHome.module.css'; 
import { ToastContainer, toast } from 'react-toastify';

export default function RestaurantHome() {
 
  useEffect(() => {
    const storedrestaurantData = localStorage.getItem('restaurantOwner');
    if (storedrestaurantData) {
      const parsedrestaurantData = JSON.parse(storedrestaurantData);
      

      toast(`Welcome ${parsedrestaurantData.fullname}`, {
        position: "top-right",
       
      });
    }
  }, []);

  const popularDishes = [
    { name: "Pizza", image: "https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" },
    { name: "Burger", image: "https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg" },
    { name: "Sushi", image: "https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg" },
    { name: "Tacos", image: "https://danosseasoning.com/wp-content/uploads/2022/03/Beef-Tacos-1024x767.jpg" }  
  ];

  return (
    <div>
            <ToastContainer position="top-right" />

      <br/>
      <br/>
      <div className="welcome-message">
        <h1 style={{ fontFamily: "Arial, sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "3rem", textAlign: "center", marginBottom: "2rem" }}>Welcome Back to FoodBuddy!</h1>
        <p style={{ fontSize: "1.2rem", textAlign: "center", marginBottom: "1rem" }}>We're thrilled to have you back, Restaurant Owner.</p>
        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          <div className="feature-card" style={{ backgroundColor: "#f9f9f9", padding: "1.5rem", borderRadius: "0.5rem", margin: "1rem", textAlign: "center", minWidth: "300px" }}>
            <h3 style={{ color: "#FF6347", marginBottom: "1rem" }}>View Menu</h3>
            <p style={{ fontSize: "1rem", marginBottom: "1rem" }}>Manage and update your restaurant's menu.</p>
          </div>
        </div>
      </div>
      <section id="populardishes">
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <h2 style={{ color: "#FF6347", marginBottom: "1rem" }}>Popular Dishes</h2>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            {popularDishes.map((dish, index) => (
              <Card key={index} style={{ width: "200px", margin: "1rem", borderRadius: "10px" }}>
                <img src={dish.image} alt={dish.name} style={{ width: "100%", height: "auto", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }} />
                <CardContent style={{ textAlign: "center" }}>
                  <Typography variant="h6" style={{ color: "#FF6347" }}>{dish.name}</Typography>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <br/>
      <br/>
      <br/>
      <section id={styles.end}> 
        <div className={styles.bar}> 
          <div><h4>FoodBuddy</h4></div>
          <div><a href='/'>Follow us On Instagram</a></div>
          <div><a href='/'>FaceBook</a></div>
          <div><h4><strong>&copy;FoodBuddyLimited</strong></h4></div>
        </div>
      </section>
    </div>
  );
}
