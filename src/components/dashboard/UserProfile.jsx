import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../auth/AuthContext';
import axios from 'axios';
import API_BASE_URL from '../../api/api';
import default_pfp from './media/default_pfp.png';
import { Container, Row, Col, Card, Button, Form, Alert, Spinner, Modal  } from 'react-bootstrap';
import { Pencil } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Animation from '../homepage/Animation';

const activityLevelMap = {
    'sedentary': 'Sedentary',
    'lightly_active': 'Lightly Active',
    'moderately_active': 'Moderately Active',
    'very_active': 'Very Active'
  };
  
  const dietPreferenceMap = {
    'vegetarian': 'Vegetarian',
    'non_vegetarian': 'Non-Vegetarian',
    'vegan': 'Vegan',
    'jain': 'Jain'
  };

  const ProfilePictureModal = ({ 
    show, 
    onHide, 
    currentImage, 
    selectedImage, 
    onImageSelect, 
    onImageUpload, 
    onImageRemove, 
    uploading, 
    error, 
    hasProfileImage 
}) => (
    <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="text-center mb-4">
                <img 
                    src={currentImage} 
                    alt="Current Profile" 
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                />
            </div>
            <Form.Group controlId="profileImageUpload" className="mb-3">
                <Form.Label>Choose New Image</Form.Label>
                <Form.Control 
                    type="file" 
                    accept="image/*" 
                    onChange={onImageSelect} 
                    size="sm"
                />
                {selectedImage && (
                    <div className="mt-2 text-success">
                        Selected file: {selectedImage.name}
                    </div>
                )}
            </Form.Group>
            {error && <Alert variant="danger">{error}</Alert>}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
                Close
            </Button>
            <Button 
                variant="primary" 
                onClick={onImageUpload} 
                disabled={uploading || !selectedImage}
                style={{backgroundColor: "purple", border: "none"}}
            >
                {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
            {hasProfileImage && (
                <Button 
                    variant="danger" 
                    onClick={onImageRemove}
                >
                    Remove Profile Picture
                </Button>
            )}
        </Modal.Footer>
    </Modal>
);
  

function UserProfile() {
    const { logoutUser } = useContext(AuthContext);
    const [data, setData] = useState({ userData: null });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { authTokens, refreshAuthToken } = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [bio, setBio] = useState("This is your bio section! You can edit it to share a little about yourself, your interests, or anything you'd like others to know.");
    const [showModal, setShowModal] = useState(false);

  
    const createAxiosInstance = () => {
      const instance = axios.create({
          headers: {
              'Authorization': `Bearer ${authTokens.access}`,
              'Content-Type': 'application/json',
          },
      });
  
      instance.interceptors.response.use(
          (response) => response,
          async (error) => {
              const originalRequest = error.config;
  
              if (error.response.status === 401 && !originalRequest._retry) {
                  originalRequest._retry = true;
  
                  try {
                      // Get the refreshed access token
                      const newAccessToken = await refreshAuthToken();
  
                      // Update the authorization header with the new access token
                      originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
  
                      // Retry the original request
                      return instance(originalRequest);
                  } catch (refreshError) {
                      // If token refresh fails, log out the user
                      logoutUser();
                      return Promise.reject(refreshError);
                  }
              }
              return Promise.reject(error);
          }
      );
  
      return instance;
  };
  

  useEffect(() => {
    const REFRESH_INTERVAL = 9 * 60 * 1000; // 9 minutes
    const refreshInterval = setInterval(() => {
        if (authTokens) {
            refreshAuthToken();
        }
    }, REFRESH_INTERVAL);

    return () => clearInterval(refreshInterval);
}, [authTokens, refreshAuthToken]);

useEffect(() => {
  const fetchData = async () => {
      try {
          const axiosInstance = createAxiosInstance();
          const userResponse = await axiosInstance.get(`${API_BASE_URL}/profile/`);
          setData({ userData: userResponse.data });
          setBio(userResponse.data.user.bio || bio);
          setError(null);
      } catch (error) {
          console.error('Error fetching data:', error);
          setError('Failed to load user profile. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  fetchData();
}, [authTokens, bio]);
  
    const handleLogout = () => {
      logoutUser();
    };
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setSelectedImage(file);
          setError(null); // Clear any previous errors
      }
  };

  const handleModalClose = () => {
      setShowModal(false);
      setSelectedImage(null); // Clear selected image when modal is closed
      setError(null); // Clear any errors
  };
  
    const handleBioChange = (e) => {
      setBio(e.target.value);
    };

    

    const handleImageUpload = async () => {
      if (!selectedImage) return;

      setUploading(true);
      setError(null);

      const formData = new FormData();
      formData.append('profile_image', selectedImage);

      const axiosInstance = createAxiosInstance();
      axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';

      try {
          await axiosInstance.patch(`${API_BASE_URL}/profile/profile_image/`, formData);
          const userResponse = await axiosInstance.get(`${API_BASE_URL}/profile/`);
          setData({ userData: userResponse.data });
          setShowModal(false); // Close modal after successful upload
      } catch (error) {
          console.error('Error uploading image:', error);
          setError('Failed to upload profile image. Please try again.');
      } finally {
          setUploading(false);
          setSelectedImage(null);
      }
  };

  const handleImageRemove = async () => {
      const axiosInstance = createAxiosInstance();
      
      try {
          await axiosInstance.patch(`${API_BASE_URL}/profile/profile_image/`, { profile_image: null });
          setData((prevData) => ({
              ...prevData,
              userData: {
                  ...prevData.userData,
                  user: {
                      ...prevData.userData.user,
                      profile_image: null
                  }
              }
          }));
          setShowModal(false); // Close modal after successful removal
      } catch (error) {
          console.error('Error removing profile image:', error);
          setError('Failed to remove profile image. Please try again.');
      }
  };

 
  
    if (loading) return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  
    if (error) return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  
    const profileImageUrl = data.userData.user?.profile_image
      ? `${API_BASE_URL}${data.userData.user.profile_image}`
      : default_pfp;
  
    return (
      <Container className="my-5">
        <Animation/>
        <Row>
        <Col md={4}>
                    <Card className="mb-4" style={{background: 'rgba(255, 255, 255, 0.3)'}}>
                        <Card.Header className="text-center">
                            <h2>{data.userData.user?.first_name} {data.userData.user?.last_name}</h2>
                        </Card.Header>
                        <Card.Body className="text-center">
                            <div className="mb-3 d-flex justify-content-center position-relative">
                                <img 
                                    src={profileImageUrl} 
                                    alt="Profile" 
                                    className="rounded-circle mb-3"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }} 
                                />
                                <Button
                                    variant="light"
                                    className="position-absolute"
                                    style={{ 
                                        right: '24%', 
                                        bottom: '15%',
                                        borderRadius: '50%',
                                        padding: '8px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                    }}
                                    onClick={() => setShowModal(true)}
                                >
                                    <Pencil size={16} />
                                </Button>
                            </div>
                            <p className="text-muted mb-2">{data.userData.user?.email}</p>
                            <div className="user_bio mb-3">
                                <p className="text-muted">{data.userData.user?.bio||bio}</p>
                            </div>
                        </Card.Body>
                        <Card.Footer className="text-center">
                            <Button variant="danger" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Card.Footer>
                    </Card>
                </Col>
          <Col md={8}>
            <Card style={{background: 'rgba(255, 255, 255, 0.3)'}}>
              <Card.Header>
                <h3>Health Data</h3>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <h4>Personal Information</h4>
                    <p><strong>Birthdate:</strong> {data.userData.health_data?.birthdate}</p>
                    <p><strong>Age:</strong> {data.userData.health_data?.age}</p>
                    <p><strong>Gender:</strong> {data.userData.health_data?.gender}</p>
                    <p><strong>Height:</strong> {data.userData.health_data?.heightCm} cm</p>
                  </Col>
                  <Col md={6}>
                    <h4>Weight Goals</h4>
                    <p><strong>Current Weight:</strong> {data.userData.health_data?.currentWeightKg} kg</p>
                    <p><strong>Target Weight:</strong> {data.userData.health_data?.targetWeight} kg</p>
                    <p><strong>BMI:</strong> {data.userData.health_data?.bmi}</p>
                  </Col>
                </Row>
                
                <hr />
                
                <Row>
                  <Col md={6}>
                    <h4>Lifestyle</h4>
                    <p><strong>Activity Level:</strong> {activityLevelMap[data.userData.health_data?.selectedActivity] || 'N/A'}</p>
                    <p><strong>Diet Preference:</strong> {dietPreferenceMap[data.userData.health_data?.selectedDiet] || 'N/A'}</p>

                  </Col>
                  <Col md={6}>
                    <h4>Fitness Goals</h4>
                    <ul className="list-unstyled">
                      {data.userData.health_data?.selectedGoals.map((goal, index) => (
                        <li key={index}><i className="bi bi-check-circle text-success me-2"></i>{goal}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                
                <hr />
                
                <Row>
                  <Col>
                    <h4>Health Conditions</h4>
                    <ul className="list-unstyled">
                      {data.userData.health_data?.selectedConditions.map((condition, index) => (
                        <li key={index}><i className="bi bi-exclamation-triangle text-danger me-2"></i>{condition}</li>
                      ))}
                    </ul>
                  </Col>
                </Row>
                
                <hr />
                
                <div className="text-muted">
                  <p><strong>Profile Created:</strong> {new Date(data.userData.health_data?.created_at).toLocaleString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(data.userData.health_data?.updated_at).toLocaleString()}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <ProfilePictureModal 
                show={showModal}
                onHide={handleModalClose}
                currentImage={profileImageUrl}
                selectedImage={selectedImage}
                onImageSelect={handleImageChange}
                onImageUpload={handleImageUpload}
                onImageRemove={handleImageRemove}
                uploading={uploading}
                error={error}
                hasProfileImage={!!data.userData.user?.profile_image}
            />
        </Container>
    );
}

export default UserProfile;