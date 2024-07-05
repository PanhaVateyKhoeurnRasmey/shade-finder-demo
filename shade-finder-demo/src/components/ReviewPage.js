import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../styles/ReviewPage.css"

function ReviewPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { imageData } = location.state || {};

  const sendToAPI = async () => {
    if (!imageData) return;

    try {
      // Convert base64 image data to a Blob
      const responseBlob = await fetch(imageData);
      const blob = await responseBlob.blob();
      
      const formData = new FormData();
      formData.append('file', blob, 'image.png');

      console.log("sending api request")

      const response = await fetch('https://gehx3uvqt3.execute-api.us-east-2.amazonaws.com/shade-finder-api-gateway-test/predict', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data)
      navigate('/results', { state: { data: data } });
    } catch (error) {
      console.error("Error fetching from API:", error);
      alert("Failed to fetch data from the API. Please try again later.");
    }
  };

  return (
    <div className="review-page">
      {imageData ? <img src={imageData} id="review-image" alt="Captured" /> : <p>No image captured</p>}
      <button onClick={sendToAPI}>Confirm and Analyze</button>
    </div>
  );
}

export default ReviewPage;
