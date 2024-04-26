import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './UpdateProfile.module.css'; // Import the CSS module
import config from '../config'

export default function UpdateProfile() {
  const [customerData, setcustomerData] = useState({
    fullname: '',
    gender: '',
    dateofbirth: '',
    email: '',
    password: '',
    location: '',
    contact: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialcustomerData, setInitialcustomerData] = useState({});

  useEffect(() => {
    const storedcustomerData = localStorage.getItem('customer');
    if (storedcustomerData) {
      const parsedcustomerData = JSON.parse(storedcustomerData);
      setcustomerData(parsedcustomerData);
      setInitialcustomerData(parsedcustomerData); // Store initial customer data
    }
  }, []);

  const handleChange = (e) => {
    setcustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {};
      for (const key in customerData) {
        if (customerData[key] !== initialcustomerData[key] && initialcustomerData[key] !== '') {
          updatedData[key] = customerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        updatedData.email = customerData.email;
        const response = await axios.put(`${config.url}/updateprofile`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/profile/${customerData.email}`, updatedData)
        localStorage.setItem("customer", JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes in Customer Profile");
        setError("");
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}><u>Update Profile</u></h3>
      {message ? <h4 className={styles.successMessage}>{message}</h4> : <h4 className={styles.errorMessage}>{error}</h4>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fullname">Full Name</label>
          <br/>
          <input type="text" id="fullname" value={customerData.fullname} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <br/>
          <input type="text" id="gender" value={customerData.gender} readOnly className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="dateofbirth">Date of Birth</label>
          <input type="date" id="dateofbirth" value={customerData.dateofbirth} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={customerData.email} readOnly className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={customerData.password} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="location">Location</label>
          <br/>
          <input type="text" id="location" value={customerData.location} onChange={handleChange} required className={styles.input} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="contact">Contact</label>
          <input type="number" id="contact" value={customerData.contact} onChange={handleChange} required className={styles.input} />
        </div>
        <button type="submit" className={styles.submitButton}>Update</button>
      </form>
    </div>
  );
}
