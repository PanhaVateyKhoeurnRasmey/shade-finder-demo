import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/ReviewPage.css";
// import uploadToS3 from "../services/uploadToS3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo, faCamera } from "@fortawesome/free-solid-svg-icons";

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
      // Ensure imageData is valid
      if (!imageData.startsWith("data:image")) {
        throw new Error("Invalid image data format.");
      }

      const responseBlob = await fetch(imageData);
      const blob = await responseBlob.blob();

      const formData = new FormData();
      formData.append("file", blob, "image.png");

      console.log("Sending API request");

      const response = await fetch("http://localhost:8000/v2/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      console.log("API response:", data);

      // const file = new File([blob], "image.png", { type: blob.type });
      // const s3Url = await uploadToS3(file);

      navigate("/email", { state: { data: data } });
    } catch (error) {
      console.error("Error fetching from API:", error);
      alert(`Failed to fetch data from the API: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  function retakePhoto() {
    navigate("/camera");
  }

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
        <button onClick={retakePhoto} className="icon-button">
          <FontAwesomeIcon icon={faCamera} /> Retake Photo
        </button>
        <button onClick={rotateImage} className="icon-button">
          <FontAwesomeIcon icon={faRedo} /> Rotate
        </button>
        <button onClick={sendToAPI} className="icon-button">
          Confirm and Analyze
        </button>
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
}

export default ReviewPage;
