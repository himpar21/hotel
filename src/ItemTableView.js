import React, { useEffect, useState } from 'react';
import axios from 'axios';

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '20px',
};

const thtdStyle = {
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

const MenuItemTable = ({ handleDelete }) => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Fetch menu items from the server
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view-menu-items');
        setMenuItems(response.data.menuItems);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };

    fetchMenuItems();
  }, []);

  return (
    <div>
      <h2>Menu Items</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thtdStyle}>Menu Name</th>
            <th style={thtdStyle}>Item Name</th>
            <th style={thtdStyle}>Price</th>
            <th style={{ ...thtdStyle, ...thStyle }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((menuItem) => (
            <tr key={menuItem._id}>
              <td style={thtdStyle}>{menuItem.menuType}</td>
              <td style={thtdStyle}>{menuItem.itemName}</td>
              <td style={thtdStyle}>{menuItem.price}</td>
              <td style={thtdStyle}>
              <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(menuItem._id)}
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

export default MenuItemTable;
