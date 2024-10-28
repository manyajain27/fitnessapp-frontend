import React, { useState, useContext } from 'react';
import {
  MDBContainer,
  MDBCheckbox,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import Homepage from '../homepage/Homepage';
import Animation from '../homepage/Animation';
import { AuthContext } from '../../auth/AuthContext';

function Login() {
    const { loginUser } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');  // State for error message
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { success, message } = await loginUser(email, password);
        if (success) {
            navigate('/dashboard');
        } else {
            setErrorMessage(message);  // Set the error message
        }
    };

    return (
        <>
            <MDBContainer fluid className="p-3 container main-container" style={{ marginTop: "100px" }}>
                <MDBRow className='d-flex'>
                    <MDBCol md='6' className='home-page-component d-flex'>
                        <Animation />
                        <Homepage />
                    </MDBCol>
                    <MDBCol md='4' className='container signup-container' style={{ padding: "0 20px 0 20px",width:"380px", maxWidth: "380px", minHeight: "510px", boxShadow: "0 0 10px black", background: "rgba(0,0,0,0.4)", borderRadius: "20px" }}>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label className='mb-1 fs-5' style={{ marginTop: "30px" }}>Email</label>
                                <input
                                    className='form-control'
                                    type='email'
                                    placeholder='Enter your Email'
                                    label='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className='form-group'>
                                <label className='mt-3 mb-1 fs-5'>Password</label>
                                <input
                                    className='form-control mb-4'
                                    type='password'
                                    placeholder='Enter Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    minLength='6'
                                />
                            </div>

                            {/* Display error message */}
                            {errorMessage && <div className="alert text-white p-2" style={{backgroundColor:"rgba(255,0,0,0.5)"}}>{errorMessage}</div>}

                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                                <Link to='/reset-password' className='forgot-pass' style={{ color: "white" }}>Forgot password?</Link>
                            </div>

                            <button className="mb-3 w-100 btn btn-dark" size="lg" type='submit'>Sign in</button>
                            <p className='text-center signup text-white'>Don't have an account? <Link to='/signup' className='signup' style={{ color: "white" }}>Sign Up</Link></p>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0" style={{ color: "white" }}>OR</p>
                            </div>

                            <button type='submit' className="d-flex justify-center items-center mb-4 w-100 btn btn-light mt-2 h-[40px]" size="lg" style={{ backgroundColor: '' }}>
                                <svg stroke="currentColor" style={{ scale: "1.5", marginBottom: "4px", marginRight: "30px" }} fill="currentColor" strokeWidth="0" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" enableBackground="new 0 0 48 48" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                </svg>
                                <div>Continue with Google</div>
                            </button>
                        </form>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </>
    );
}

export default Login;
