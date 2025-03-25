import React, { useState } from "react";
import { Button, TextField, Modal, Box, Typography, CircularProgress } from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { submitLocation } from "../../components/PetCardPage/api";

function SendLocationModal({ open, onClose, petCardID }) {
  const [finderName, setFinderName] = useState("");
  const [finderContact, setFinderContact] = useState("");
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);

  const handleGetCurrentLocation = () => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      setLocationLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const mapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
        setLatitude(lat);
        setLongitude(lng);
        setLocation(mapsLink);
        setLocationLoading(false);
      },
      (error) => {
        console.error("Error getting location:", error);
        alert("Unable to retrieve your location.");
        setLocationLoading(false);
      }
    );
  };

  const handleSend = async () => {
    try {
      await submitLocation(petCardID, finderName, finderContact, location, latitude, longitude);
      onClose();
    } catch (err) {
      console.error("Error submitting location:", err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "var(--card-background)",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 320,
          color: "var(--text-color)",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
          Send Location
        </Typography>

        <TextField
          fullWidth
          label="Your Name"
          value={finderName}
          onChange={(e) => setFinderName(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
        />
        <TextField
          fullWidth
          label="Contact Info"
          value={finderContact}
          onChange={(e) => setFinderContact(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
        />

        <Box sx={{ display: "flex", gap: 1, mb: 2, alignItems: "center" }}>
          <TextField
            fullWidth
            label="Location Found"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            InputLabelProps={{ style: { color: "var(--text-color)" } }}
          />
          <Button
            onClick={handleGetCurrentLocation}
            variant="contained"
            disabled={locationLoading}
            sx={{ minWidth: "48px", height: "56px", bgcolor: "var(--primary-color)" }}
          >
            {locationLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <MyLocationIcon />}
          </Button>
        </Box>

        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={handleSend}
            sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SendLocationModal;
