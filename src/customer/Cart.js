// Cart.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../config';
import styles from './Cart.module.css';

export default function Cart() {
    const [customerData, setCustomerData] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedCustomerData = localStorage.getItem('customer');
        if (storedCustomerData) {
            const parsedCustomerData = JSON.parse(storedCustomerData);
            setCustomerData(parsedCustomerData);
        }
    }, []);

    useEffect(() => {
        const fetchCartItems = async () => {
            if (customerData) {
                try {
                    const response = await axios.get(`${config.url}/viewcart/${customerData.email}`);

                    if (response.data && Array.isArray(response.data)) {
                        const itemsFromDB = response.data;
                        const itemsWithQuantity = itemsFromDB.map(item => ({
                            ...item,
                            count: item.itemnumber // Set count based on itemnumber from server
                        }));

                        setCartItems(itemsWithQuantity);
                    } else {
                        setError('Invalid response data');
                    }
                } catch (error) {
                    setError(error.response?.data || 'Failed to fetch cart items');
                }
            }
        };

        fetchCartItems();
    }, [customerData]);

    const updateCartItemQuantity = async (itemId, newQuantity) => {
        try {
            await axios.get(`${config.url}/updatequantity/${customerData.email}/${newQuantity}/${itemId}`);
            const updatedItemsResponse = await axios.get(`${config.url}/viewcart/${customerData.email}`);

            if (updatedItemsResponse.data && Array.isArray(updatedItemsResponse.data)) {
                const itemsFromDB = updatedItemsResponse.data;
                const itemsWithQuantity = itemsFromDB.map(item => ({
                    ...item,
                    count: item.itemnumber // Update count based on refreshed data from DB
                }));

                setCartItems(itemsWithQuantity);
            } else {
                setError('Invalid response data after updating quantity');
            }
        } catch (error) {
            setError(error.response?.data || 'Failed to update cart item quantity');
        }
    };

    const increment = async (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].count += 1;
        setCartItems(updatedCartItems);
        await updateCartItemQuantity(updatedCartItems[index].itemid, updatedCartItems[index].count);
    };

    const decrement = async (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].count > 1) {
            updatedCartItems[index].count -= 1;
            setCartItems(updatedCartItems);
            await updateCartItemQuantity(updatedCartItems[index].itemid, updatedCartItems[index].count);
        } else if (updatedCartItems[index].count === 1) {
            const itemId = updatedCartItems[index].itemid;
            const filteredItems = updatedCartItems.filter(item => item.itemid !== itemId);
            setCartItems(filteredItems);
            await updateCartItemQuantity(itemId, 0); // Passing 0 to delete item
        }
    };

    const getTotalItemCount = () => {
        return cartItems.reduce((total, item) => total + item.count, 0);
    };

    const getTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price * item.count, 0).toFixed(2);
    };

    const handleOrderClick = async () => {
        toast(`Use this 4000 0035 6000 0008 card number for order`, {
            position: "top-right"
        });

        localStorage.setItem('order', JSON.stringify(cartItems));

        const stripe = await loadStripe("pk_test_51P9uJISDSdxPQtHGE5F9TOMmczHAnFRKEA39KZHGzqBZ7q6DreyrUmHf6fMq9cvOEbtHyUHJl1EOWJYv2BvNOavN00kQAjQKdw");
        const body = {
            products: cartItems
        };
        const headers = {
            "Content-Type": "application/json"
        };

        setTimeout(async () => {
            try {
                const response = await fetch(`${config.url}/create-checkout-session`, {
                    method: "POST",
                    headers: headers,
                    body: JSON.stringify(body)
                });

                const session = await response.json();

                const result = await stripe.redirectToCheckout({
                    sessionId: session.id
                });

                if (result.error) {
                    console.log(result.error);
                }
            } catch (error) {
                console.error('Error during checkout:', error);
                toast.error('Failed to initiate checkout. Please try again.');
            }
        }, 3000);
    };

    return (
        <div className={styles.container}>
            <ToastContainer position="top-right" />
            <h3 className={styles.title}>Your Shopping Cart</h3>
            {error && <div className={styles.error}>{error}</div>}
            <div className={styles.cardContainer}>
                {cartItems.length > 0 ? (
                    cartItems.map((cartItem, index) => (
                        <div className={styles.card} key={index}>
                            <img src={cartItem.pic} alt={cartItem.itemname} className={styles.cardImage} />
                            <div className={styles.cardContent}>
                                <h5 className={styles.cardTitle}>{cartItem.itemname}</h5>
                                <p className={styles.cardText}>
                                    <strong>Quantity:</strong> {cartItem.count}
                                    <br />
                                    <strong>Price:</strong> ₹{cartItem.price}
                                    <br />
                                    <strong>Total:</strong> ₹{cartItem.price * cartItem.count}
                                </p>
                                <div className={styles.buttonGroup}>
                                    <button onClick={() => decrement(index)} className={styles.actionButton}>-</button>
                                    <button onClick={() => increment(index)} className={styles.actionButton}>+</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.emptyCartMsg}>Your cart is empty.</p>
                )}
            </div>
            <div className={styles.summary}>
                <div className={styles.totalCount}>
                    Total Items: {getTotalItemCount()}
                </div>
                <div className={styles.totalCost}>
                    Total Cost: ₹{getTotalCost()}
                </div>
            </div>
            <button onClick={handleOrderClick} className={styles.orderButton}>
                Order Now
            </button>
        </div>
    );
}
