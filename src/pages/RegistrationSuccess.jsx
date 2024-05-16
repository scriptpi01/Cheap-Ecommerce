import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/RegistrationSuccess.css'; // Make sure to create and link this CSS file for styling

const RegistrationSuccess = () => {
  return (
    <div className="registration-success-container">
        <div className="registration-text">
            <h1>Registration Successful!</h1>
            <p>Your account has been created successfully.</p>
        </div>
      
      <Link to="/login" className="button">Go to Login</Link>
    </div>
  );
};

export default RegistrationSuccess;
