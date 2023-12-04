import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddMenuItemForm = ({ onAddMenuItem }) => {
  const [formData, setFormData] = useState({
    menuType: '',
    itemName: '',
    price: '',
  });

  const [menuNames, setMenuNames] = useState([]); // State to store menu types

  useEffect(() => {
    // Fetch menu types from the server
    const fetchMenuNames = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu-names');
        setMenuNames(response.data.menuNames);
      } catch (error) {
        console.error('Error fetching menu Names:', error);
      }
    };

    fetchMenuNames();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend endpoint for adding a menu item
      const response = await axios.post('http://localhost:5000/api/add-menu-item', formData);

      if (response.data.success) {
        // If the menu item is added successfully, trigger the callback
        onAddMenuItem(response.data.menuItem);
        // Clear the form data
        setFormData({
          menuType: '',
          itemName: '',
          price: '',
        });
      } else {
        console.error('Failed to add menu item:', response.data.message);
      }
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
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

  return (
    <form onSubmit={handleSubmit} style={inputContainerStyle}>
      <label style={labelStyle}>
        Menu Type:
        <select name="menuType" value={formData.menuType} onChange={handleChange} required style={inputStyle}>
          <option value="" disabled>Select Menu Name</option>
          {menuNames.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label style={labelStyle}>
        Item Name:
        <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} required style={inputStyle} />
      </label>
      <br />
      <label style={labelStyle}>
        Price:
        <input type="text" name="price" value={formData.price} onChange={handleChange} required style={inputStyle} />
      </label>
      <br />
      <button type="submit" style={buttonStyle}>Add Menu Item</button>
    </form>
  );
};

export default AddMenuItemForm;
