import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from './DeleteCustomer.module.css'; 
// import AdminNavBar from './AdminNavBar';
import config from '../config'
import { ToastContainer, toast } from 'react-toastify';

export default function DeleteCustomer() {
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

  const deleteCustomer = async (email) => {
    try {
      await axios.delete(`${config.url}/deletecustomer/${email}`);
      fetchCustomers();
      toast.success('Account Deleted', {
        position: "top-right"
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className={styles.tableContainer}>
             <ToastContainer position="top-right" />

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
            <th>Action</th>
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
                <td>
                  <button onClick={() => deleteCustomer(customer.email)} className={styles.button}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
