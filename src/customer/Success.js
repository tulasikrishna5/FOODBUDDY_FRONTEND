import React, { useEffect, useState } from 'react';
import styles from './Success.module.css';
import axios from 'axios';
import config from '../config';

export default function Success() {
  const [orderdata, setOrderData] = useState(null);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchCustomerAndOrderData = async () => {
      const storedCustomerData = localStorage.getItem('customer');
      if (storedCustomerData) {
        const parsedCustomerData = JSON.parse(storedCustomerData);
        setCustomer(parsedCustomerData);
      }

      const storedOrderData = localStorage.getItem('order');
      if (storedOrderData) {
        const parsedOrderData = JSON.parse(storedOrderData);
        setOrderData(parsedOrderData);
      }
    };

    fetchCustomerAndOrderData();
  }, []); // Empty dependency array to run once on initial render

  useEffect(() => {
    if (customer && orderdata) {
      fillData(); // Call fillData only if both customer and orderdata are available
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customer, orderdata]); // Run when customer or orderdata changes

  async function fillData() {
    try {
      const orderid = generateRandomId();
      let items = [];
      let count = 0,
        totalprice = 0;

      orderdata.forEach((item) => {
        const { itemid, itemname, pic, itemnumber, price } = item;
        count += itemnumber;
        totalprice += price * itemnumber;

        const newItem = {
          itemid,
          itemname,
          pic,
          itemnumber,
          price
        };

        items.push(newItem);
      });

      const status = "Success";
      const customerEmail = customer ? customer.email : '';

      const requestData = {
        orderid,
        items,
        totalprice,
        totalquantity: count,
        status,
        customeremail: customerEmail
      };

      const url = `${config.url}/addorder`;
      await axios.post(url, requestData);
    } catch (error) {
      console.error('Error in fillData:', error);
    }
  }

  function generateRandomId() {
    const min = 100000;
    const max = 999999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return "O" + randomNumber;
  }

  return (
    <div className={styles.successContainer}>
      <div className={styles.successMessage}>
        <h2>Payment Successful!</h2>
        <p>Thank you for your payment.</p>
        <p>Your order will reach your doorstep in 30 minutes.</p>
      </div>
    </div>
  );
}
