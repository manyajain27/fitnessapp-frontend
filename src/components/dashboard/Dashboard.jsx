import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext'; // Adjust the import path based on your project structure
import axios from 'axios';
import API_BASE_URL from '../../api/api';

function Dashboard() {
  const { logoutUser } = useContext(AuthContext); // Get the logout function from AuthContext
  const [data, setData] = useState({ userData: null, healthData: null });
  const [loading, setLoading] = useState(true);
  const {authTokens}=useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem('access_token'); // Assuming the JWT is stored in localStorage

    // Configure Axios headers with the token
    const axiosInstance = axios.create({
        headers: {
            'Authorization': `Bearer ${authTokens.access}`,
            'Content-Type': 'application/json'
        }
    });

    const fetchData = async () => {
        try {
            // Fetch user data
            const userResponse = await axiosInstance.get(`${API_BASE_URL}/profile/`);
            const healthResponse = await axiosInstance.get(`${API_BASE_URL}/health-data/retrieve/`);

            // Set the state with the fetched data
            setData({ userData: userResponse.data, healthData: healthResponse.data });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, []);


  const handleLogout = () => {
    logoutUser(); // Call the logout function when the button is clicked
  };

  if (loading) return <div>Loading...</div>;


  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      <pre>{JSON.stringify(data.userData, null, 2)}</pre>
      <h2>Health Data</h2>
      <pre>{JSON.stringify(data.healthData, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;
