import React, { useState } from "react";
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
import { createChatSession } from "./api"; // or wherever your api.js is

function StartChatModal({ open, onClose, petId }) {
  const [finderName, setFinderName] = useState("");
  const [finderSurname, setFinderSurname] = useState("");
  const [finderEmail, setFinderEmail] = useState("");

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const payload = {
        senderId: finderEphemeralId,
        messageContent: newMessage,
    };

    console.log("Sending message payload:", payload); // Debugging

    try {
        await sendMessage(sessionId, payload);
        setNewMessage("");
        fetchMessages();
    } catch (error) {
        console.error("Error sending message:", error);
    }
};

  

  const handleClose = () => {
    onClose();
    // Clear fields if you wish
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
