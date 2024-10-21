import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Home from './components/Home';
import OtpVerification from './components/OtpVerification';
import CreateInterview from './components/Create-interview';

function App() {
  return (
    <Router>
      <div className="App">
        
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} /> {/* Redirect root to signup */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/create-interview" element={<CreateInterview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
