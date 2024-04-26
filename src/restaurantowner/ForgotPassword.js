import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ForgotPassword() {
  const [restaurantData, setRestaurantData] = useState({
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialRestaurantData, setInitialRestaurantData] = useState({});

  useEffect(() => {
    const storedRestaurantData = localStorage.getItem('restaurantOwner');
    if (storedRestaurantData) {
      const parsedRestaurantData = JSON.parse(storedRestaurantData);
      setRestaurantData(parsedRestaurantData);
      setInitialRestaurantData(parsedRestaurantData); 
    }
  }, []);

  const handleChange = (e) => {
    setRestaurantData({ ...restaurantData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in restaurantData) {
        if (restaurantData[key] !== initialRestaurantData[key] && initialRestaurantData[key] !== '') {
          updatedData[key] = restaurantData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = restaurantData.email; // Ensure email is updated if needed
        const response = await axios.put(`${config.url}/forgotpassword`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/profile/${restaurantData.email}`, updatedData);
        localStorage.setItem("restaurant", JSON.stringify(res.data));
      } else {
        // No changes
        setMessage("No Changes ");
        setError("");
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div>
      <h3 align="center"><u>Change Password</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" style={{ color: 'red' }}>{error}</h4>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Password</label>
          <input type="password" id="password" value={restaurantData.password} onChange={handleChange} required />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
