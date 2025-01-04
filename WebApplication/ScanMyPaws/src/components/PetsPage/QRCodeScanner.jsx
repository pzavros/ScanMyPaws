import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Alert, Typography } from "@mui/material";
import Section from "../ReusableComponents/Section";
import { scanQRCode } from "./api";
import Webcam from "react-webcam";
import jsQR from "jsqr";

const QRCodeScanner = ({ onScanSuccess, onCancel }) => {
  const [qrError, setQrError] = useState("");
  const [scannedCode, setScannedCode] = useState(null);
  const webcamRef = useRef(null);

  const captureAndDecode = () => {
    const canvas = document.createElement("canvas");
    const video = webcamRef.current?.video;

    if (!video) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, canvas.width, canvas.height);

    if (code) {
      setScannedCode(code.data);
      clearInterval(scanInterval); // Stop scanning once a QR code is detected
    }
  };

  const handleSubmit = async () => {
    try {
      if (!scannedCode) {
        setQrError("No QR code detected.");
        return;
      }
      const response = await scanQRCode(scannedCode);
      onScanSuccess(scannedCode);
    } catch (error) {
      setQrError(error.message || "An error occurred while validating the QR Code.");
    }
  };

  const handleSimulateScan = () => {
    const simulatedCode = "4"; // Simulated QRCodeID for testing
    setScannedCode(simulatedCode);
  };

  useEffect(() => {
    async function requestCameraAccess() {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
      } catch (error) {
        setQrError("Camera access denied. Please enable camera permissions.");
      }
    }
    requestCameraAccess();
  }, []);
  
  

  return (
    <Section>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Scan QR Code
      </Typography>
      {qrError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {qrError}
        </Alert>
      )}
      <Webcam
        ref={webcamRef}
        audio={false}
        width="100%"
        screenshotFormat="image/png"
        videoConstraints={{ facingMode: "environment" }}
      />
      <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
        {scannedCode && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "var(--primary-color)",
              "&:hover": { backgroundColor: "var(--secondary-color)" },
            }}
          >
            Submit
          </Button>
        )}
        <Button onClick={handleSimulateScan} variant="contained" sx={{ backgroundColor: "var(--secondary-color)" }}>
          Simulate QR Code Scan
        </Button>
        <Button onClick={onCancel} variant="outlined" sx={{ color: "var(--primary-color)" }}>
          Cancel
        </Button>
      </Box>
    </Section>
  );
};

export default QRCodeScanner;
