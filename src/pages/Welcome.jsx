import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css'; // Ensure this CSS file is linked correctly

const Welcome = () => {
  const navigate = useNavigate();

  const handleStartClick = () => {
    navigate('/home'); // Navigate to the home page
  };

  return (
    <div className="welcome-container">
      <div className="icon-3d">🛒</div>  {/* Example emoji icon for Cheap */}
      
      <button onClick={handleStartClick} className="start-button">Start Shopping Cheap</button>
    </div>
  );
};

export default Welcome;
