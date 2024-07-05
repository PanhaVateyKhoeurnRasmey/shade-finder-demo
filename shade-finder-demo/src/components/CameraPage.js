import React, { useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/CameraPage.css';

function CameraPage() {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [location.key]);

  const takePicture = () => {
    if (!videoRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageData = canvas.toDataURL('image/png');
    navigate('/review', { state: { imageData } });
  };

  return (
    <div className="camera-page">
      <div className="overlay">
        <div className="face-outline"></div>
      </div>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={takePicture}>Take Picture</button>
    </div>
  );
}

export default CameraPage;
