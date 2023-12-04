// MenuTableView.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MenuTableView = () => {
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/view-menus');
        setMenuData(response.data.menus);
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  const handleDelete = async (menuId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this menu item?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/delete-menu/${menuId}`);
        const updatedMenuData = menuData.filter((menu) => menu._id !== menuId);
        setMenuData(updatedMenuData);
      } catch (error) {
        console.error('Error deleting menu:', error);
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
      <h2>Menu Table</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Type</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((menu) => (
            <tr key={menu._id}>
              <td style={thTdStyle}>{menu._id}</td>
              <td style={thTdStyle}>{menu.name}</td>
              <td style={thTdStyle}>{menu.type}</td>
              <td style={thTdStyle}>
                <button
                  style={deleteButtonStyle}
                  onClick={() => handleDelete(menu._id)}
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

export default MenuTableView;
