import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import AdminNavBar from './AdminNavBar';
import styles from './ViewCustomers.module.css'; 
import config from '../config'

export default function ViewCustomers() {
  const [customers, setCustomers] = useState([]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${config.url}/viewcustomers`);
      setCustomers(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className={styles.tableContainer}>
      
      <br/><br/>
      <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>Our Customers</h1>

      <table className={styles.customTable} align="center">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Gender</th>
            <th>Date Of Birth</th>
            <th>Email</th>
            <th>Location</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(customers) && customers.length > 0 ? (
            customers.map((customer, index) => (
              <tr key={index}>
                <td>{customer.fullname}</td>
                <td>{customer.gender}</td>
                <td>{customer.dateofbirth}</td>
                <td>{customer.email}</td>
                <td>{customer.location}</td>
                <td>{customer.contact}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
