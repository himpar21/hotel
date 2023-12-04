import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserDataTable from './UserDataTable';
import RestaurantTableView from './RestaurantTableView';
import MenuTableView from './MenuTableView';
import ItemTableView from './ItemTableView'; // Import the new component for item table

const buttonContainerStyle = {
  display: 'flex',
  marginBottom: '20px',
};

const buttonStyle = {
  marginRight: '10px',
  padding: '10px',
  cursor: 'pointer',
  backgroundColor: '#4caf50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
};

const activeButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#45a049',
};

const ViewTable = () => {
  const [userData, setUserData] = useState([]);
  const [showUserDataTable, setShowUserDataTable] = useState(true);
  const [showRestaurantTableView, setShowRestaurantTableView] = useState(false);
  const [showMenuTableView, setShowMenuTableView] = useState(false);
  const [showItemTableView, setShowItemTableView] = useState(false); // State for item table

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/viewtable');
        console.log('Response from server:', response.data);
        setUserData(response.data.users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');

    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/users/${userId}`);
        const updatedUserData = userData.filter((user) => user._id !== userId);
        setUserData(updatedUserData);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const toggleView = (view) => {
    setShowUserDataTable(view === 'userDataTable');
    setShowRestaurantTableView(view === 'restaurantTableView');
    setShowMenuTableView(view === 'menuTableView');
    setShowItemTableView(view === 'itemTableView'); // Toggle item table view
  };

  return (
    <div>
      <div style={buttonContainerStyle}>
        <button
          style={showUserDataTable ? activeButtonStyle : buttonStyle}
          onClick={() => toggleView('userDataTable')}
        >
          Show User Data Table
        </button>
        <button
          style={showRestaurantTableView ? activeButtonStyle : buttonStyle}
          onClick={() => toggleView('restaurantTableView')}
        >
          Show Restaurant Table
        </button>
        <button
          style={showMenuTableView ? activeButtonStyle : buttonStyle}
          onClick={() => toggleView('menuTableView')}
        >
          Show Menu Table
        </button>
        <button
          style={showItemTableView ? activeButtonStyle : buttonStyle} // New button for Item Table
          onClick={() => toggleView('itemTableView')} // New view identifier for Item Table
        >
          Show Item Table
        </button>
      </div>
      {showUserDataTable && <UserDataTable userData={userData} handleDelete={handleDelete} />}
      {showRestaurantTableView && <RestaurantTableView />}
      {showMenuTableView && <MenuTableView />}
      {showItemTableView && <ItemTableView />} {/* Render the ItemTableView component */}
    </div>
  );
};

export default ViewTable;
