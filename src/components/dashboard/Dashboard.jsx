import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../api/api';

function Dashboard() {
  const handleClick = (event) => {
    event.preventDefault(); // Prevent the default link behavior
    window.open('/profile', '_blank', 'noopener,noreferrer');
  };

  return(
    <div>
      <h1>Dashboard</h1>
      <Link to={'/profile'} onClick={handleClick}>Go to profile</Link>
    </div>
    
  )
}

export default Dashboard;
