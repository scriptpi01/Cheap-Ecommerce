import React, { useState } from 'react';
import '../styles/ForgotPassword.css'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle password recovery goes here
    console.log("Recovery email sent to:", email);
    // You would typically make an API call here
  };

  return (
    <div className="forgot-password-container">
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <h2>Password Recovery</h2>
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit" className="recovery-button">Send Recovery Email</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
