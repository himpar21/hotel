// RestaurantTableView.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RestaurantTableView = () => {
  const [restaurantData, setRestaurantData] = useState([]);

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view-restaurants');
        setRestaurantData(response.data.restaurants);
      } catch (error) {
        console.error('Error fetching restaurant data:', error);
      }
    };

    fetchRestaurantData();
  }, []);

  const handleDelete = async (restaurantId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this restaurant?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/delete-restaurant/${restaurantId}`);
        const updatedRestaurantData = restaurantData.filter((restaurant) => restaurant._id !== restaurantId);
        setRestaurantData(updatedRestaurantData);
      } catch (error) {
        console.error('Error deleting restaurant:', error);
      }
    }
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  };

  const thTdStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const thStyle = {
    backgroundColor: '#4caf50',
    color: 'white',
  };

  const deleteButtonStyle = {
    backgroundColor: '#f44336',
    color: 'white',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  };

  const buttonHoverStyle = {
    backgroundColor: '#d32f2f',
  };

  return (
    <div>
      <h2>Restaurant Table</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Company</th>
            <th style={thTdStyle}>Branch</th>
            <th style={thTdStyle}>Location</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurantData.map((restaurant) => (
            <tr key={restaurant._id}>
              <td style={thTdStyle}>{restaurant._id}</td>
              <td style={thTdStyle}>{restaurant.name}</td>
              <td style={thTdStyle}>{restaurant.company}</td>
              <td style={thTdStyle}>{restaurant.branch}</td>
              <td style={thTdStyle}>{restaurant.location}</td>
              <td style={thTdStyle}>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(restaurant._id)}
                  onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.target.style.backgroundColor = deleteButtonStyle.backgroundColor)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantTableView;
