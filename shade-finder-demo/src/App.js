import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import CameraPage from "./components/CameraPage";
import ReviewPage from "./components/ReviewPage";
import ResultsPage from "./components/ResultsPage";
import EmailPage from "./components/EmailPage";
import StartNewAnalysisButton from "./components/StartNewAnalysisButton";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {<StartNewAnalysisButton />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/review" element={<ReviewPage />} />
          <Route path="/email" element={<EmailPage />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
