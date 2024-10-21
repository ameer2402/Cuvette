// Home.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome } from 'react-icons/fa'; // Import the home icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from '../components/Navbar';

export default function Home() {
  const navigate = useNavigate(); // Initialize navigate function

  const handleCreateInterview = () => {
    navigate('/create-interview'); // Navigate to CreateInterview component
  };

  return (
    <>
    <Navbar/>
    <div className="d-flex">
      {/* Wrapper for the sidebar and right side */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* Sidebar */}
        <aside
          className="bg-white"
          style={{
            width: '200px',
            height: '100vh',
            borderTop: '2px solid grey', // Top border for the sidebar
            borderRight: '2px solid grey', // Right border for the sidebar
          }}
        >
          <div className="d-flex align-items-center p-3">
            <FaHome size={24} />
            <span className="ms-2">Home</span>
          </div>
        </aside>

        {/* Right Side Division */}
        <div
          className="flex-grow-1 p-3"
          style={{
            height: '100vh',
            borderTop: '2px solid grey', // Top border for the right side
          }}
        >
          <div
            style={{
              // Remove border from the inner box
              borderRadius: '5px', // Optional: add some border radius
              padding: '20px', // Add padding inside the box
              height: '100%', // Make the box fill the right side height
              backgroundColor: '#fff', // Optional: add background color to make it distinct
            }}
          >
            <h3>Create Interview</h3>
            <button className="btn btn-primary" onClick={handleCreateInterview}>
              Create Interview
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
