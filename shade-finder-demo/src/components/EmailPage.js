import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import saveEmail from "../services/dynamoDB";
import "../styles/EmailPage.css";

function EmailPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state || {};
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const submitEmail = async () => {
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");

    try {
      await saveEmail(email);
      alert("Email saved successfully!");
    } catch (error) {
      console.error("Error saving email:", error);
      alert("Error saving email");
    }
    navigate("/results", { state: { data: data } });
  };

  return (
    <div className="email-page">
      <h1>Get your results sent to your email</h1>
      <p>We will send your personalized recommendations to you!</p>
      <div className="email-container">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && <p className="error">{error}</p>}

        <button onClick={submitEmail}>Submit</button>
      </div>
      <p
        className="skip-link"
        onClick={() => navigate("/results", { state: { data: data } })}
      >
        Skip
      </p>
    </div>
  );
}

export default EmailPage;
