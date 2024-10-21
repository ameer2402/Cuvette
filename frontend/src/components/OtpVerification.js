import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "../components/Navbar";

export default function OtpVerification() {
  const [emailVerified, setEmailVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const otpInputRef = useRef(null); // Create a ref for the OTP input

  const navigate = useNavigate();
  const location = useLocation();
  const {  email, otp, successMessage: initialSuccessMessage,formData } = location.state || {};

  useEffect(() => {
    if (initialSuccessMessage) {
      setSuccessMessage(initialSuccessMessage); // Set the initial success message
    }
  }, [initialSuccessMessage]);

  // Verify the email OTP
  const verifyEmailOtp = async () => {
    const emailOtp = otpInputRef.current.value; // Get the value from the ref
    try {
      const response = await axios.post('https://cuvette-ic2y.onrender.com/verify/mail', {
        email,
        emailOtp,
        formData,
      },{withCredentials:true});
      if (response.status === 200) {
        setEmailVerified(true);
        setErrorMessage('');
        setSuccessMessage('Email OTP verified successfully!'); // Set success message
      }
    } catch (error) {
      setErrorMessage('Failed to verify Email OTP.');
      console.error('Error verifying Email OTP:', error);
    }
  };

  // Navigate to success page if email OTP is verified
  useEffect(() => {
    if (emailVerified) {
      navigate('/home',{ state: { employeeName: formData.EmployeeName } });
    }
  }, [emailVerified, navigate]);

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row" style={{ height: '100vh' }}>
        <div className="col-md-6">
          <h2>Verify Your Account!</h2>
          <p>Please enter the OTP sent to your email to verify your account.</p>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">OTP Verification</h3>

              <form>
                <div className="form-group">
                  <label htmlFor="emailOtp">Enter Email OTP</label>
                  <input
                    type="text"
                    id="emailOtp"
                    name="emailOtp"
                    className="form-control"
                    ref={otpInputRef} // Attach the ref to the input
                    required
                  />
                  <div className="text-center mt-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={verifyEmailOtp}
                      disabled={emailVerified}
                    >
                      {emailVerified ? 'Email Verified' : 'Verify Email OTP'}
                    </button>
                  </div>
                </div>

                {/* Success message */}
                {successMessage && (
                  <div className="alert alert-success mt-3 text-center">
                    {successMessage}
                  </div>
                )}

                {/* Error message */}
                {errorMessage && (
                  <div className="alert alert-danger mt-3 text-center">
                    {errorMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
