import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { FaHome } from 'react-icons/fa'; // Import the home icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiFillCloseCircle } from 'react-icons/ai'; // Import close icon for removing emails
import Navbar from './Navbar';

export default function CreateInterview() {
  const navigate = useNavigate(); // Initialize navigate function
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateEmails, setCandidateEmails] = useState([]); // Array to hold multiple emails
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    const jobData={
      jobTitle,
      jobDescription,
      experienceLevel,
      candidateEmails, // The list of added emails
      endDate,
    };
    try {
        // Sending jobData to your Node.js backend
        const response = await axios.post('https://cuvette-ic2y.onrender.com/send-job-emails', jobData, {
          withCredentials: true, // Include credentials for cookie handling
        });
        console.log('Emails sent successfully:', response.data);
        
        // Optionally, navigate back or show a success message
        navigate('/home'); 
      } catch (error) {
        console.error('Error sending emails:', error);
      }
  };

  // Function to add an email to the list
  const handleAddEmail = () => {
    if (candidateEmail && !candidateEmails.includes(candidateEmail)) {
      setCandidateEmails([...candidateEmails, candidateEmail]);
      setCandidateEmail(''); // Clear the email input field
    }
  };

  // Function to remove an email from the list
  const handleRemoveEmail = (emailToRemove) => {
    setCandidateEmails(candidateEmails.filter(email => email !== emailToRemove));
  };

  return (
    <>
    <Navbar/>
    <div className="d-flex">
      <div style={{ display: 'flex', width: '100%' }}>
        {/* Sidebar */}
        <aside
          className="bg-white"
          style={{
            width: '200px',
            height: '100vh',
            borderTop: '2px solid black', // Top border for the sidebar
            borderRight: '2px solid black', // Right border for the sidebar
          }}
        >
          <div className="d-flex align-items-center p-3">
            <FaHome size={24} /> {/* Home icon */}
            <span className="ms-2">Home</span>
          </div>
        </aside>

        {/* Right Side Division */}
        <div
          className="flex-grow-1 d-flex justify-content-center align-items-center p-3"
          style={{
            height: '100vh',
            borderTop: '2px solid black', // Top border for the right side
          }}
        >
          <form onSubmit={handleSubmit} style={{ width: '70%' }}>
            {/* Job Title */}
            <div className="mb-3 row align-items-center fs-4">
              <label htmlFor="jobTitle" className="col-sm-2 col-form-label">Job Title</label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="jobTitle"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-3 row align-items-center fs-4">
              <label htmlFor="jobDescription" className="col-sm-2 col-form-label">Job Description</label>
              <div className="col-sm-8">
                <textarea
                  className="form-control"
                  id="jobDescription"
                  rows="3"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-3 row align-items-center fs-4">
              <label htmlFor="experienceLevel" className="col-sm-2 col-form-label">Experience Level</label>
              <div className="col-sm-8">
                <select
                  className="form-select"
                  id="experienceLevel"
                  value={experienceLevel}
                  onChange={(e) => setExperienceLevel(e.target.value)}
                  required
                >
                  <option value="">Select...</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                </select>
              </div>
            </div>

            {/* Candidate Email Input */}
            <div className="mb-3 row align-items-center fs-4">
              <label htmlFor="candidateEmail" className="col-sm-2 col-form-label">Add Candidates</label>
              <div className="col-sm-8">
                <div className="d-flex flex-wrap align-items-center border p-2">
                  {/* Display added emails inline within the input area */}
                  {candidateEmails.map((email, index) => (
                    <span
                      key={index}
                      className="badge bg-primary me-2 mb-1"
                      style={{ display: 'inline-flex', alignItems: 'center' }}
                    >
                      {email}
                      <AiFillCloseCircle
                        className="ms-1"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleRemoveEmail(email)}
                      />
                    </span>
                  ))}
                  {/* Input field to type and add more emails */}
                  <input
                    type="email"
                    className="form-control border-0"
                    id="candidateEmail"
                    value={candidateEmail}
                    onChange={(e) => setCandidateEmail(e.target.value)}
                    placeholder="Enter email"
                    style={{ flex: 1, minWidth: '150px' }}
                  />
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={handleAddEmail}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            {/* End Date */}
            <div className="mb-3 row align-items-center fs-4">
              <label htmlFor="endDate" className="col-sm-2 col-form-label">End Date</label>
              <div className="col-sm-8">
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="col-sm-10 offset-sm-2">
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
    </>
  );
}
