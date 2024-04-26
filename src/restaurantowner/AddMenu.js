import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './AddMenu.module.css';
import config from '../config'

export default function AddMenu() {
  const [ownerdata, setOwnerData] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    Restaurantname: '',
    tags: [],
    price: '',
    Diettype: '',
    type: '',
    pic: '',
    restaurantowner: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const OwnerData = localStorage.getItem('restaurantOwner');
    if (OwnerData) {
      const parsedOwnerData = JSON.parse(OwnerData);
      setOwnerData(parsedOwnerData);
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleTagsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, tags: selectedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${config.url}/additem`, {
        ...formData,
        restaurantowner: ownerdata,
        Restaurantname: ownerdata.restaurantname
      });
      if (response.status === 200) {
        setFormData({
          name: '',
          description: '',
          Restaurantname: '',
          tags: [],
          price: '',
          Diettype: '',
          type: '',
          pic: '',
          restaurantowner: ''
        });
        setMessage(response.data);
        setError('');
        navigate('/viewmenu');
      }
    } catch (error) {
      setError(error.response.data);
      setMessage('');
    }
  };

  return (
    <div className={styles.container}>
      <h3 align="center">
        <u>Post a New Dish</u>
      </h3>
      {message ? (
        <h4 align="center" className={styles.successMessage}>
          {message}
        </h4>
      ) : (
        <h4 align="center" className={styles.errorMessage}>
          {error}
        </h4>
      )}
      <form onSubmit={handleSubmit}>
        <table className={styles.formTable}>
          <tbody>
            <tr>
              <td>
                <label htmlFor="name">Title</label>
              </td>
              <td>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="description">Description</label>
              </td>
              <td>
                <textarea id="description" value={formData.description} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="type">Type</label>
              </td>
              <td>
                <select id="type" value={formData.type} onChange={handleChange} required>
                  <option value="">---Select---</option>
                  <option value="Starter">Starter</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Main-Course">Main-Course</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tags">Tags</label>
              </td>
              <td>
                <select id="tags" value={formData.tags} onChange={handleTagsChange} multiple required>
                  <option value="Beverages">Beverages</option>
                  <option value="Italian">Italian</option>
                  <option value="FastFood">Fast Food</option>
                  <option value="Indian">Indian</option>
                  <option value="Others">Others</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="Diettype">Diet Type</label>
              </td>
              <td>
                <select id="Diettype" value={formData.Diettype} onChange={handleChange} required>
                  <option value="">---Select---</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Non-Vegetarian">Non-Vegetarian</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="price">Price</label>
              </td>
              <td>
                <input type="number" id="price" value={formData.price} onChange={handleChange} required />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pic">Picture URL</label>
              </td>
              <td>
                <input type="text" id="pic" value={formData.pic} onChange={handleChange} required />
                <img src={formData.pic} alt="Food" style={{ width: '100px', height: 'auto', marginTop: '10px' }} />
              </td>
            </tr>
            <tr>
              <td colSpan="2">
                <button type="submit">Post</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}
