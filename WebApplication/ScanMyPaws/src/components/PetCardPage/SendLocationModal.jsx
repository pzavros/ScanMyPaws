import React, { useState } from "react";
import { Button, TextField, Modal, Box, Typography } from "@mui/material";
// Import the function you just created:
import { submitLocation } from "../../components/PetCardPage/api"; // or wherever api.js lives

function SendLocationModal({ open, onClose, petCardID }) {
  const [finderName, setFinderName] = useState("");
  const [finderContact, setFinderContact] = useState("");
  const [location, setLocation] = useState("");

  const handleSend = async () => {
    try {
      // Call the function from api.js
      await submitLocation(petCardID, finderName, finderContact, location);
      // If successful, close the modal
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
          bgcolor: "white",
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          minWidth: 300,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Send Location
        </Typography>

        <TextField
          fullWidth
          label="Your Name"
          value={finderName}
          onChange={(e) => setFinderName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Contact"
          value={finderContact}
          onChange={(e) => setFinderContact(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Location Found"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box sx={{ textAlign: "right" }}>
          <Button variant="contained" onClick={handleSend}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default SendLocationModal;
