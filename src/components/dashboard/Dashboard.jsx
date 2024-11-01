import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../../api/api';

function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  const [data, setData] = useState({ userData: null });
  const [loading, setLoading] = useState(true);
  const { authTokens } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'application/json'
      }
    });

    const fetchData = async () => {
      try {
        const userResponse = await axiosInstance.get(`${API_BASE_URL}/profile/`);
        setData({ userData: userResponse.data });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [authTokens]);

  const handleLogout = () => {
    logoutUser();
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedImage) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('profile_image', selectedImage);

    const axiosInstance = axios.create({
      headers: {
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'multipart/form-data'
      }
    });

    try {
      await axiosInstance.patch(`${API_BASE_URL}/profile/profile_image/`, formData);
      const userResponse = await axiosInstance.get(`${API_BASE_URL}/profile/`);
      setData({ userData: userResponse.data });
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setUploading(false);
      setSelectedImage(null);
    }
  };

  if (loading) return <div>Loading...</div>;

  const profileImageUrl = data.userData.user?.profile_image
    ? `${API_BASE_URL}${data.userData.user.profile_image}` // Construct full URL
    : null;

  return (
    <div className="profile-page">
      <button onClick={handleLogout} className="btn btn-danger">Logout</button>
      <div className="user-info">
        <h2>{data.userData.user?.first_name} {data.userData.user?.last_name}</h2>
        <p>Email: {data.userData.user?.email}</p>
        {profileImageUrl && (
          <img 
            src={profileImageUrl} 
            alt="Profile" 
            style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
          />
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleImageUpload} disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>

      <div className="health-data">
        <h3>Health Data</h3>
        <p>Birthdate: {data.userData.health_data?.birthdate}</p>
        <p>Height: {data.userData.health_data?.heightCm} cm</p>
        <p>Gender: {data.userData.health_data?.gender}</p>
        <p>Current Weight: {data.userData.health_data?.currentWeightKg} kg</p>
        <p>Target Weight: {data.userData.health_data?.targetWeight} kg</p>
        <p>Age: {data.userData.health_data?.age}</p>
        <p>BMI: {data.userData.health_data?.bmi}</p>
        <p>Activity Level: {data.userData.health_data?.selectedActivity}</p>
        <p>Diet Preference: {data.userData.health_data?.selectedDiet}</p>

        <h4>Fitness Goals:</h4>
        <ul>
          {data.userData.health_data?.selectedGoals.map((goal, index) => (
            <li key={index}>{goal}</li>
          ))}
        </ul>

        <h4>Health Conditions:</h4>
        <ul>
          {data.userData.health_data?.selectedConditions.map((condition, index) => (
            <li key={index}>{condition}</li>
          ))}
        </ul>

        <p>Profile Created: {new Date(data.userData.health_data?.created_at).toLocaleString()}</p>
        <p>Last Updated: {new Date(data.userData.health_data?.updated_at).toLocaleString()}</p>
      </div>
    </div>
  );
}

export default Dashboard;
