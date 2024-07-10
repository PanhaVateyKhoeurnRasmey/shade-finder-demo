import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/StartNewAnalysisButton.css";

function StartNewAnalysisButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const startNewAnalysis = () => {
    navigate("/camera");
  };

  if (location.pathname === "/" || location.pathname === "/camera") {
    return null;
  }

  return (
    <button className="new-analysis-button" onClick={startNewAnalysis}>
      ← Start New Analysis
    </button>
  );
}

export default StartNewAnalysisButton;
