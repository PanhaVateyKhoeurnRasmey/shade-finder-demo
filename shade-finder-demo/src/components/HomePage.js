import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  const startShadeFinder = () => {
    navigate("/camera");
  };

  return (
    <div className="home-page">
      <header>
        <h1>ROSE INC</h1>
      </header>
      <div className="content">
        <h1>Welcome to Shade Finder</h1>
        <div className="button-container">
          <button onClick={startShadeFinder}>Start</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
