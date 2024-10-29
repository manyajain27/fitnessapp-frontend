import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import API_BASE_URL from '../../api/api';
import { useNavigate } from 'react-router-dom';
function AccountVerification() {
  const {email,tempPassword,loginUser,clearTempPassword}  = useContext(AuthContext);
  const [otp, setOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
        setErrorMessage('User email not found. Please register again.');
        return;
      }

    try {
      const response = await axios.post(`${API_BASE_URL}/verify-otp/`, {
        email, // Get email from context
        otp,
      });

      if (response.status === 200) {
        setSuccessMessage('OTP verified successfully!');
        setErrorMessage('');
        /// Automatically log in the user after OTP verification using tempPassword
        const loginResponse = await loginUser(email, tempPassword); // Use temporary password
        if (loginResponse.success) {
          // alert('Login successful');
          clearTempPassword(); // Clear the temporary password
          navigate('/user-data'); // Redirect to the dashboard after successful login
        }
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || 'Verification failed. Please try again.');
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Account Verification</h2>
      <form onSubmit={handleOtpSubmit}>
        <div>
          <label htmlFor="otp">Enter OTP:</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <button type="submit">Verify OTP</button>
      </form>
    </div>
  );
}

export default AccountVerification;
