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
  useTheme,
} from "@mui/material";
import { createChatSession } from "./api";

function StartChatModal({ open, onClose, petId }) {
  const [finderName, setFinderName] = useState("");
  const [finderSurname, setFinderSurname] = useState("");
  const [finderEmail, setFinderEmail] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  const handleStartChat = async () => {
    if (!finderName.trim() || !finderSurname.trim()) {
      alert("Please enter your first name and surname.");
      return;
    }

    try {
      const response = await createChatSession({
        petId,
        finderName,
        finderSurname,
        finderEmail,
      });

      if (response.chatSessionId) {
        sessionStorage.setItem("finderEphemeralId", response.finderEphemeralId);
        sessionStorage.setItem("chatSessionId", response.chatSessionId);
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
    <Dialog open={open} onClose={handleClose} PaperProps={{
      sx: {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        borderRadius: 3,
        p: 2,
      }
    }}>
      <DialogTitle sx={{ fontWeight: "bold" }}>Start Chat with Pet Owner</DialogTitle>
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
            fullWidth
          />

          <TextField
            label="Surname"
            variant="outlined"
            value={finderSurname}
            onChange={(e) => setFinderSurname(e.target.value)}
            fullWidth
          />

          <TextField
            label="Email (optional)"
            type="email"
            variant="outlined"
            value={finderEmail}
            onChange={(e) => setFinderEmail(e.target.value)}
            fullWidth
          />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="error" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleStartChat} variant="contained">
          Start Chat
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default StartChatModal;
