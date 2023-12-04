// AddMenuForm.js

import React, { useState } from 'react';
import axios from 'axios';

const AddMenuForm = ({ onAddMenu }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint for adding a menu
      const response = await axios.post('http://localhost:5000/api/add-menu', formData);

      if (response.data.success) {
        // If the menu is added successfully, trigger the callback
        onAddMenu(response.data.menu);
        // Clear the form data
        setFormData({
          name: '',
          type: '',
        });
      } else {
        console.error('Failed to add menu:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding menu:', error);
    }
  };

  const formStyle = {
    maxWidth: '100%',
    margin: '0 auto',
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

  const buttonHoverStyle = {
    backgroundColor: '#45a049',
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
      </div>
      <div style={inputContainerStyle}>
        <label style={labelStyle}>
          Type:
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            style={inputStyle}
            required
          />
        </label>
      </div>
      <button
        type="submit"
        style={buttonStyle}
        onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Add Menu
      </button>
    </form>
  );
};

export default AddMenuForm;
