import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ReviewPage.css";

function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { imageData } = location.state || {};
  const [rotation, setRotation] = useState(0);
  const [loading, setLoading] = useState(false);

  const sendToAPI = async () => {
    if (!imageData) return;
    setLoading(true);

    try {
      const responseBlob = await fetch(imageData);
      const blob = await responseBlob.blob();

      const formData = new FormData();
      formData.append("file", blob, "image.png");

      console.log("sending api request");

      const response = await fetch(
        "https://gehx3uvqt3.execute-api.us-east-2.amazonaws.com/shade-finder-api-gateway-test/predict",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      navigate("/results", { state: { data: data } });
    } catch (error) {
      console.error("Error fetching from API:", error);
      alert("Failed to fetch data from the API. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const rotateImage = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  return (
    <div className="review-page">
      <div className="image-wrapper">
        {imageData ? (
          <img
            src={imageData}
            id="review-image"
            alt="Captured"
            style={{ transform: `rotate(${rotation}deg) scaleX(-1)` }}
          />
        ) : (
          <p>No image captured</p>
        )}
      </div>
      <div className="button-container">
        <button onClick={rotateImage}>Rotate</button>
        <button onClick={sendToAPI}>Confirm and Analyze</button>
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
}

export default ReviewPage;
