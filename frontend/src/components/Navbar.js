import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userName, setUserName] = useState(null);
  const currentPath = window.location.pathname;

  useEffect(() => {
    fetch('https://cuvette-ic2y.onrender.com/home', {
        method: 'GET',
        credentials: 'include',
    })
    .then(response => {
        console.log('Response status:', response.status); // Log the status
        if (!response.ok) {
            if (response.status === 401 && currentPath !=="/signup" && currentPath !=="/otp-verification" && currentPath !=="/create-interview" ) {
                console.log('Redirecting to signup...'); // Log the redirect
                window.location.replace("/signup"); 
                return; 
            }
            throw new Error('Failed request');
        }
        return response.json(); 
    })
    .then(data => {
        if (data.success) {
            setUserName(data.user.employeeName);
        }
    })
    .catch(error => {
        console.error('Error fetching user data:', error);
        if(currentPath !=="/signup"  && currentPath !=="/otp-verification"  ){
          window.location.href = "/signup"; 
        }
    });
}, []);


  

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    fetch('https://cuvette-ic2y.onrender.com/logout', {
      method: 'POST',
      credentials: 'include', // Ensure cookies are sent
    })
    .then(response => {
      if (response.ok) {
        window.location.href = "/signup"; // Redirect to signup page if logout is successful
      } else {
        console.error('Failed to log out');
      }
    })
    .catch(error => {
      console.error('Error logging out:', error);
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-w">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="navbar-brand">
          <img
            src="https://cuvette.tech/app/static/media/logo.74bda650.svg"
            alt="Cuvette Logo"
            style={{ height: "30px" }}
          />
        </div>

        <div className="d-flex align-items-center">
          <h5 className="mr-3">Contact</h5>

          {userName ? (
            <div className="dropdown">
              <div
                className="d-flex align-items-center border p-2 dropdown-toggle"
                style={{
                  height: "40px",
                  borderRadius: "5px",
                  backgroundColor: "#f8f9fa",
                  marginLeft: "10px",
                }}
                onClick={toggleDropdown}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "grey",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                ></div>
                <span>{userName}</span>
              </div>

              {dropdownOpen && (
                <div className="dropdown-menu dropdown-menu-end show">
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) :null}
        </div>
      </div>
    </nav>
  );
}
