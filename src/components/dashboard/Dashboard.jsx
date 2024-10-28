import React, { useContext } from 'react';
import { AuthContext } from '../../auth/AuthContext'; // Adjust the import path based on your project structure

function Dashboard() {
  const { logoutUser } = useContext(AuthContext); // Get the logout function from AuthContext

  const handleLogout = () => {
    logoutUser(); // Call the logout function when the button is clicked
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
    </div>
  );
}

export default Dashboard;
