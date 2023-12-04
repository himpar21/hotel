// AddRestaurantForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddRestaurantForm = ({ onAddRestaurant }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    branch: '',
    location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint for adding a restaurant
      const response = await axios.post('http://localhost:5000/api/add-restaurant', formData);

      if (response.data.success) {
        // If the restaurant is added successfully, trigger the callback
        onAddRestaurant(response.data.restaurant);
        // Clear the form data
        setFormData({
          name: '',
          company: '',
          branch: '',
          location: '',
        });
      } else {
        console.error('Failed to add restaurant:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding restaurant:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Name:</label>
        <input style={inputStyle} type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Company:</label>
        <input style={inputStyle} type="text" name="company" value={formData.company} onChange={handleChange} required />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Branch:</label>
        <input style={inputStyle} type="text" name="branch" value={formData.branch} onChange={handleChange} required />
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>Location:</label>
        <input style={inputStyle} type="text" name="location" value={formData.location} onChange={handleChange} required />
      </div>
      <button style={buttonStyle} type="submit">Add Restaurant</button>
    </form>
  );
};


const inputContainerStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
};

const inputStyle = {
  padding: '10px',
  width: '100%',
  boxSizing: 'border-box',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const buttonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s',
};

export default AddRestaurantForm;
