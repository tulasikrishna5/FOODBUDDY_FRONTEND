// ViewOrders.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import config from '../config';
import styles from './ViewOrders.module.css';

export default function ViewOrders() {
   
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
        
            fetchOrders(parsedCustomerData.email);
        }

    }, []);

    const fetchOrders = async (email) => {
        try {
            const response = await axios.get(`${config.url}/getorder/${email}`);
            setOrders(response.data);
            setError('');
        } catch (error) {
            setError(error.response?.data || 'Failed to fetch orders');
        }
    };

    const getStatusColor = (status) => {
        return status === 'Success' ? styles['success'] : styles['failure'];
    };

    return (
        <div className={styles['orders-container']}>
            {error && <p className={styles['error-message']}>{error}</p>}
            <h2 className={styles['orders-heading'] }>My Recent Orders</h2>
            <table className={styles['orders-table']}>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order.orderId}>
                            <td>{order.orderId}</td>
                            <td>
                                <ul className={styles['item-list']}>
                                    {order.items.map((item, index) => (
                                        <li key={item.itemId} className={styles['item']}>
                                            <img src={item.pic} alt={item.itemname} className={styles['item-image']} />
                                            <div className={styles['item-info']}>
                                                <span>{item.itemname}</span>
                                                <span>Quantity: {item.itemnumber}</span>
                                                <span>Price: ₹{item.price}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                            <td>₹{order.totalprice}</td>
                            <td className={getStatusColor(order.status)}>{order.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
