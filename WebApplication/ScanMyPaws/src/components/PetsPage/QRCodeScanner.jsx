import React, { useState, useRef, useEffect } from "react";
import { Box, Alert, Typography, Card } from "@mui/material";
import Section from "../ReusableComponents/Section";
import { scanQRCodeByData } from "./api";
import Webcam from "react-webcam";
import jsQR from "jsqr";
import Button from "../ReusableComponents/Button";

const QRCodeScanner = ({ onScanSuccess, onCancel }) => {
  const [qrError, setQrError] = useState("");
  const [scannedCode, setScannedCode] = useState(null);
  const webcamRef = useRef(null);

  // 1. Use a ref to store the interval ID
  const scanIntervalRef = useRef(null);

  // This function checks the webcam feed and attempts to decode a QR code
  const captureAndDecode = () => {
    try {
      const video = webcamRef.current?.video;
      if (!video) return;

      if (video.videoWidth <= 0 || video.videoHeight <= 0) return;

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, canvas.width, canvas.height);

      if (code) {
        // Store the entire string instead of parseInt
        setScannedCode(code.data);

        // Stop scanning
        if (scanIntervalRef.current) {
          clearInterval(scanIntervalRef.current);
        }
      }
    } catch (error) {
      console.error("QR scanning error:", error);
      setQrError("An error occurred while scanning the QR code.");
    }
  };


  // 2. Start scanning at an interval once the component mounts
  useEffect(() => {
    scanIntervalRef.current = setInterval(captureAndDecode, 1000);

    return () => {
      if (scanIntervalRef.current) {
        clearInterval(scanIntervalRef.current);
      }
    };
  }, []);

  // Ask for camera access when the component mounts
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

  const handleSubmit = async () => {
    if (!scannedCode) {
      setQrError("No QR code detected.");
      return;
    }
    try {
      await scanQRCodeByData(scannedCode);
      onScanSuccess(scannedCode);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error while validating the QR Code.";
      setQrError(errorMessage);
    }
  };



  // For testing only – do NOT use in production
  const handleSimulateScan = () => {
    const simulatedId = 2;
    setScannedCode(simulatedId);
  };

  return (
    <Section>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "var(--text-color-primary)",
            mb: 2,
          }}
        >
          Scan QR Code
        </Typography>

        {qrError && (
          <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
            {qrError}
          </Alert>
        )}

        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            padding: 2,
            borderRadius: "16px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
            backgroundColor: "var(--card-background)",
          }}
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/png"
            videoConstraints={{ facingMode: "environment" }}
            style={{
              width: "100%",
              borderRadius: "12px",
            }}
          />
        </Card>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
            width: "100%",
            maxWidth: 600,
          }}
        >
          {scannedCode && <Button onClick={handleSubmit}>Submit</Button>}
          <Button onClick={handleSimulateScan} variant="outlined">
            Simulate QR Code Scan
          </Button>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
        </Box>

        {scannedCode && (
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              color: "var(--text-color-secondary)",
              textAlign: "center",
              mt: 2,
            }}
          >
            Detected QR Code: <strong>{scannedCode}</strong>
          </Typography>
        )}
      </Box>
    </Section>
  );
};

export default QRCodeScanner;
