import React from 'react';

const UserDataTable = ({ userData, handleDelete }) => {
  const containerStyle = {
    marginTop: '20px',
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
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

  const buttonStyle = {
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
    <div style={containerStyle}>
      <h2>User Table</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>ID</th>
            <th style={thTdStyle}>Name</th>
            <th style={thTdStyle}>Email</th>
            <th style={thTdStyle}>Phone</th>
            <th style={thTdStyle}>Username</th>
            <th style={{ ...thTdStyle, ...thStyle }}>Role</th>
            <th style={thTdStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user) => (
            <tr key={user._id}>
              <td style={thTdStyle}>{user._id}</td>
              <td style={thTdStyle}>{user.name}</td>
              <td style={thTdStyle}>{user.email}</td>
              <td style={thTdStyle}>{user.phone}</td>
              <td style={thTdStyle}>{user.username}</td>
              <td style={{ ...thTdStyle, ...thStyle }}>{user.role}</td>
              <td style={thTdStyle}>
                {user.role !== 'admin' && (
                  <button
                    style={buttonStyle}
                    onClick={() => handleDelete(user._id)}
                    onMouseOver={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserDataTable;
