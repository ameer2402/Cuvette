import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome
import Navbar from "../components/Navbar";


export default function Signup() {
  const navigate = useNavigate(); // Initialize navigate
  const [formData, setFormData] = useState({
    EmployeeName: '',
    phone: '',
    companyName: '',
    companyEmail: '',
    employeeSize: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  // Helper function to generate random 6-digit OTP
const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = generateOtp(); // Generate OTP here

    try {
      axios.post('https://cuvette-y42d.onrender.com/send-email-otp', { email:formData.companyEmail, otp})
        .then(() => {
          console.log('Email OTP generated and sent.'); // Set success message
        })
        .catch(error => {
          console.error('Error sending Email OTP:', error);
          // setErrorMessage('Failed to send Email OTP.'); 
        });
        navigate('/otp-verification',{ state: { phone: formData.phone, email: formData.companyEmail,otp,formData } });
        console.log(formData.phone);
        console.log( formData.companyEmail);
    //   const response = await axios.post('http://localhost:3000/signup', formData);
    //   console.log('Signup successful:', response.data);
      // Navigate to OTP verification component
       // Change route to OTP verification
    } catch (error) {
      console.error('There was an error signing up:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row" style={{ height: '100vh' }}> {/* Set row height */}
        {/* Left side: Paragraph */}
        <div className="col-md-6"> {/* Remove flexbox classes */}
          <div className="pt-5"> {/* Optional: add padding top to adjust the spacing */}
            <h2>Welcome to Our Platform!</h2>
            <p>
              Sign up today to get access to our exclusive content and features. Whether you're 
              here to learn, network, or grow, we have something for everyone. Join our community 
              of innovators and make the most out of your experience.
            </p>
          </div>
        </div>

        {/* Right side: Signup form within a card */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center">Signup Form</h3> {/* Centered heading */}
              <p className="mb-4 text-center">Please fill in the details below to create an account:</p> {/* Centered text */}
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  {/* Name input */}
                  <div className="form-group col-md-6">
                    <label htmlFor="EmployeeName">Name</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                      </div>
                      <input
                        type="text"
                        id="EmployeeName"
                        name="EmployeeName"
                        className="form-control"
                        value={formData.EmployeeName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Phone number input */}
                  <div className="form-group col-md-6">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-phone"></i></span>
                      </div>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  {/* Company name input */}
                  <div className="form-group col-md-6">
                    <label htmlFor="companyName">Company Name</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-building"></i></span>
                      </div>
                      <input
                        type="text"
                        id="companyName"
                        name="companyName"
                        className="form-control"
                        value={formData.companyName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Company email input */}
                  <div className="form-group col-md-6">
                    <label htmlFor="companyEmail">Company Email</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-envelope"></i></span>
                      </div>
                      <input
                        type="email"
                        id="companyEmail"
                        name="companyEmail"
                        className="form-control"
                        value={formData.companyEmail}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  {/* Employee size input */}
                  <div className="form-group col-md-6">
                    <label htmlFor="employeeSize">Employee Size</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text"><i className="fas fa-users"></i></span>
                      </div>
                      <input
                        type="text"
                        id="employeeSize"
                        name="employeeSize"
                        className="form-control"
                        value={formData.employeeSize}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center"> {/* Center the button */}
                  <button type="submit" className="btn btn-primary btn-lg">
                    Proceed
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
