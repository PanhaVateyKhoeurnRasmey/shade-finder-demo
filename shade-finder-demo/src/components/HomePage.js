import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  const startShadeFinder = () => {
    navigate('/camera');
  };

  return (
    <div className="home-page">
      <h1>Welcome to Shade Finder</h1>
      <button onClick={startShadeFinder}>Start</button>
    </div>
  );
}

export default HomePage;
