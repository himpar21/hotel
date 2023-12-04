import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddRestaurantForm from "./AddRestaurantForm";
import TableView from "./TableView";
import AddMenuForm from "./AddMenuForm";
import AddMenuItemForm from "./AddMenuItemForm"; // Import the AddMenuItemForm component
import FaceTable from "./face";
const WelcomePage = () => {
  const { role } = useParams();
  const [showTable, setShowTable] = useState(false);
  const [showAddRestaurantForm, setShowAddRestaurantForm] = useState(false);
  const [showAddMenuForm, setShowAddMenuForm] = useState(false);
  const [showAddMenuItemForm, setShowAddMenuItemForm] = useState(false); // State for AddMenuItemForm
  const [showFaceComponent, setShowFaceComponent] = useState(false);
  const handleAddRestaurant = (newRestaurant) => {
    // Handle restaurant addition if needed
  };

  const handleAddMenu = (newMenu) => {
    // Handle menu addition if needed
  };

  const handleAddMenuItem = (newMenuItem) => {
    // Handle menu item addition if needed
  };

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
  };

  const sidebarStyle = {
    width: "200px",
    backgroundColor: "#333",
    padding: "20px",
    color: "white",
  };

  const contentStyle = {
    flex: 1,
    padding: "20px",
  };

  const welcomeMessageStyle = {
    fontSize: "24px",
    marginBottom: "20px",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    color: "white",
    textDecoration: "none",
    textAlign: "left",
  };

  const addButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#3498db",
  };

  const faceButtonStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    backgroundColor: "#e74c3c", // Choose a color for the Face.js button
    color: "white",
    textDecoration: "none",
    textAlign: "left",
  };

  return (
    <div style={containerStyle}>
      <div style={sidebarStyle}>
        <button
          style={buttonStyle}
          onClick={() => {
            setShowAddRestaurantForm(false);
            setShowAddMenuForm(false);
            setShowAddMenuItemForm(false);
            setShowFaceComponent(false);
          }}
        >
          Logout
        </button>
        <button
          style={addButtonStyle}
          onClick={() => {
            setShowTable(!showTable);
            setShowAddRestaurantForm(false);
            setShowAddMenuForm(false);
            setShowAddMenuItemForm(false);
            setShowFaceComponent(false);
          }}
        >
          View Table
        </button>
        <button
          style={addButtonStyle}
          onClick={() => {
            setShowAddRestaurantForm(!showAddRestaurantForm);
            setShowTable(false);
            setShowAddMenuForm(false);
            setShowAddMenuItemForm(false);
            setShowFaceComponent(false);
          }}
        >
          Add Restaurant
        </button>
        <button
          style={addButtonStyle}
          onClick={() => {
            setShowAddMenuForm(!showAddMenuForm);
            setShowTable(false);
            setShowAddRestaurantForm(false);
            setShowAddMenuItemForm(false);
            setShowFaceComponent(false);
          }}
        >
          Add Menu
        </button>
        <button
          style={addButtonStyle}
          onClick={() => {
            setShowAddMenuItemForm(!showAddMenuItemForm);
            setShowTable(false);
            setShowAddRestaurantForm(false);
            setShowAddMenuForm(false);
            setShowFaceComponent(false);
          }}
        >
          Add Menu Item
        </button>
        <button
          style={faceButtonStyle}
          onClick={() => {
            setShowFaceComponent(!showFaceComponent);
            setShowTable(false);
            setShowAddRestaurantForm(false);
            setShowAddMenuForm(false);
            setShowAddMenuItemForm(false);
          }}
        >
          View Face.js
        </button>
      </div>
      <div style={contentStyle}>
        <p style={welcomeMessageStyle}>Welcome {role}</p>
        {showTable && <TableView />}
        {showAddRestaurantForm && (
          <AddRestaurantForm onAddRestaurant={handleAddRestaurant} />
        )}
        {showAddMenuForm && <AddMenuForm onAddMenu={handleAddMenu} />}
        {showAddMenuItemForm && (
          <AddMenuItemForm onAddMenuItem={handleAddMenuItem} />
        )}
        {showFaceComponent && <FaceTable />}
      </div>
    </div>
  );
};

export default WelcomePage;