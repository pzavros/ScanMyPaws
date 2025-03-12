import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { createChatSession } from "./api";

function StartChatModal({ open, onClose, petId }) {
  const [finderName, setFinderName] = useState("");
  const [finderSurname, setFinderSurname] = useState("");
  const [finderEmail, setFinderEmail] = useState("");
  const navigate = useNavigate();

  const handleStartChat = async () => {
    if (!finderName.trim() || !finderSurname.trim()) {
      alert("Please enter your first name and surname to start the chat.");
      return;
    }

    try {
      const response = await createChatSession({
        petId,
        finderName,
        finderSurname,
        finderEmail,
      });

      console.log("Chat Session Response:", response);

      if (response.chatSessionId) {
        // Store finderEphemeralId and chatSessionId for use in chat
        sessionStorage.setItem("finderEphemeralId", response.finderEphemeralId);
        console.log("Generated Chat Session ID:", response.chatSessionId);
        sessionStorage.setItem("chatSessionId", response.chatSessionId);


        // Redirect to PublicChatPage
        navigate(`/chat/${response.chatSessionId}`);
      } else {
        alert("Failed to start chat. Please try again.");
      }
    } catch (error) {
      console.error("Error starting chat:", error.response?.data || error.message);
      alert("An error occurred while starting the chat.");
    }
  };


  const handleClose = () => {
    onClose();
    setFinderName("");
    setFinderSurname("");
    setFinderEmail("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Start Chat with Pet Owner</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Typography variant="body2">
            Please enter your details before starting the chat:
          </Typography>

          <TextField
            label="First Name"
            variant="outlined"
            value={finderName}
            onChange={(e) => setFinderName(e.target.value)}
          />

          <TextField
            label="Surname"
            variant="outlined"
            value={finderSurname}
            onChange={(e) => setFinderSurname(e.target.value)}
          />

          <TextField
            label="Email (optional)"
            type="email"
            variant="outlined"
            value={finderEmail}
            onChange={(e) => setFinderEmail(e.target.value)}
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleStartChat} variant="contained" color="primary">
          Start Chat
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StartChatModal;
