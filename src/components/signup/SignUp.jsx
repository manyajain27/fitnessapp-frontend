import React, { useState, useContext } from 'react';
import Animation from '../homepage/Animation';
import { MDBContainer, MDBCol, MDBRow } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import API_BASE_URL from '../../api/api';
import LoadingPage from '../homepage/LoadingPage';

function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State to hold error messages
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { setEmail: setEmailInContext ,storeTempPassword} = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match."); // Set error message
      return; // Prevent form submission
    } else {
      setErrorMessage(''); // Clear error message if passwords match
    }
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/register/`, {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        confirm_password: password,
      });
      console.log(response);
      if (response.status === 201) {
        setEmailInContext(email); 
        storeTempPassword(password);
        navigate('/verify-account'); // Redirect to verification page   
    }
    } catch (error) {
      console.error('Registration failed:', error);
      if (error.response && error.response.data) {
        // Set the error message from backend response
        if (error.response.data.email) {
          setErrorMessage('User account already exists.'); // User already exists
        } else {
          // Display other validation errors
          setErrorMessage(Object.values(error.response.data).flat().join(', '));
        }
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <>
      <Animation />
      
      {loading ? ( // Conditional rendering for loading
        <LoadingPage/>
      ):(<div className='mt-2' style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div>
          <h1 style={{ color: "lightgray", marginTop: "0px" }}>Sign Up</h1>
          <p style={{ color: "lightgray" }}>Create your Account</p>
        </div>
        
        <MDBContainer className="p-3">
          <MDBRow style={{ marginBottom: "0", position: "relative" }}>
            <MDBCol col='4' md='6' className='' style={{ margin: "0 auto", padding: "0 20px", maxWidth: "380px", boxShadow: "0 0 10px black", background: "rgba(0,0,0,0.4)", borderRadius: "20px" }}>
              <form onSubmit={handleSubmit}>
                <div className='form-group'>
                  <label className='mb-1 fs-5' style={{ marginTop: "10px", color: "lightgray" }}>First Name</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='First Name*'
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='mb-1 fs-5' style={{ marginTop: "10px", color: "lightgray" }}>Last Name</label>
                  <input
                    className='form-control'
                    type='text'
                    placeholder='Last Name*'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='mb-1 fs-5' style={{ marginTop: "10px", color: "lightgray" }}>Email</label>
                  <input
                    className='form-control'
                    type='email'
                    placeholder='Email*'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='mb-1 fs-5' style={{ marginTop: "10px", color: "lightgray" }}>Password</label>
                  <input
                    className='form-control'
                    type='password'
                    placeholder='Password*'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength='6'
                    required
                  />
                </div>
                <div className='form-group'>
                  <label className='mb-1 fs-5' style={{ marginTop: "10px", color: "lightgray" }}>Confirm Password</label>
                  <input
                    className='form-control'
                    type='password'
                    placeholder='Confirm Password*'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    minLength='6'
                    required
                  />
                </div>
                {errorMessage && <div className="alert text-white p-2" style={{backgroundColor:"rgba(255,0,0,0.5)"}}>{errorMessage}</div>} {/* Display error message */}
                <button className='btn btn-success mt-4 mb-4 container' type='submit'>Register</button>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        
        <br />
        <p style={{ color: "lightgray" }}>
          Already have an account? <Link to='/login' style={{ color: "lightgray" }}>Sign In</Link>
        </p>
      </div>
      )}
    </>
  );
}

export default SignUp;
