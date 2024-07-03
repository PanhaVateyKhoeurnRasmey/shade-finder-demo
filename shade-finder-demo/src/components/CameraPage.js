import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function CameraPage() {
  const videoRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    };

    startCamera();
  }, []);

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
      <video ref={videoRef} autoPlay />
      <button onClick={takePicture}>Take Picture</button>
    </div>
  );
}

export default CameraPage;
