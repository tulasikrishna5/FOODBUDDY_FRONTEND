import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './DeleteRestaurantOwner.module.css'; 
// import AdminNavBar from './AdminNavBar';
import config from '../config'
import { ToastContainer, toast } from 'react-toastify';

export default function DeleteRestaurantOwner() {
  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const response = await axios.get(`${config.url}/viewrestaurantowner`);
      setOwners(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const deleteOwner = async (email) => {
    try {
      await axios.delete(`${config.url}/deleterestaurantowner/${email}`);
      fetchOwners();
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
      <h1 align="center" style={{ fontFamily: "sans-serif", color: "#FF6347", fontWeight: "bold", fontSize: "35px", textDecoration: "underline" }}>Delete Restaurant Owners</h1>

      <table className={styles.customTable} border={1} align="center">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Restaurant Name</th>
            <th>Date Of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Address</th>
            <th>Contact</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(owners) && owners.length > 0 ? (
            owners.map((owner, index) => (
              <tr key={index}>
                <td>{owner.fullname}</td>
                <td>{owner.restaurantname}</td>
                <td>{owner.dateofbirth}</td>
                <td>{owner.gender}</td>
                <td>{owner.email}</td>
                <td>{owner.location}</td>
                <td>{owner.contact}</td>
                <td>
                  <button onClick={() => deleteOwner(owner.email)} className={styles.button}>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Data Not Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
