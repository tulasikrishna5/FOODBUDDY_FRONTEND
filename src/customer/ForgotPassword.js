import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config'

export default function ForgotPassword() {
  const [customerData, setcustomerData] = useState({
   
    password: '',
    
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [initialcustomerData, setinitialcustomerData] = useState({});

  useEffect(() => {
    const storedcustomerData = localStorage.getItem('customer');
    if (storedcustomerData) {
      const parsedcustomerData = JSON.parse(storedcustomerData);
      setcustomerData(parsedcustomerData);
      setinitialcustomerData(parsedcustomerData); 
    }
  }, []);

  const handleChange = (e) => {
    setcustomerData({ ...customerData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try 
    {
      const updatedData = {};
      for (const key in customerData) {
        if (customerData[key] !== initialcustomerData[key] && initialcustomerData[key] !== '') {
          updatedData[key] = customerData[key]; 
        }
      }
      if (Object.keys(updatedData).length !== 0) {
        // There are changes
        updatedData.email = customerData.email;
        const response = await axios.put(`${config.url}/forgotpassword`, updatedData);
        setMessage(response.data);
        setError('');
        const res = await axios.get(`${config.url}/profile/${customerData.email}`, updatedData)
        localStorage.setItem("jobseeker",JSON.stringify(res.data))
      } else {
        // No changes
        setMessage("No Changes ");
        setError("");
      }
    } 
    catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };
  
  
  return (
    <div>
      <h3 align="center"><u>Change Password</u></h3>
      {message ? <h4 align="center">{message}</h4> : <h4 align="center" color='red'>{error}</h4>}
      <form onSubmit={handleSubmit}>
       
        <div>

          <label>Password</label>
          <input type="password" id="password" value={customerData.password} onChange={handleChange} required />
        </div>
       
        <button type="submit">Update</button>
      </form>
    </div>
  );
}