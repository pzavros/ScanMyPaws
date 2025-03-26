import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createChatSession } from "./api";

function StartChatModal({ open, onClose, petId }) {
  const [finderName, setFinderName] = useState("");
  const [finderSurname, setFinderSurname] = useState("");
  const [finderEmail, setFinderEmail] = useState("");
  const navigate = useNavigate();

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
    setFinderName("");
    setFinderSurname("");
    setFinderEmail("");
    onClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
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
          Start Chat with Pet Owner
        </Typography>

        <Typography variant="body2" sx={{ mb: 2 }}>
          Please enter your details before starting the chat:
        </Typography>

        <TextField
          fullWidth
          label="First Name"
          value={finderName}
          onChange={(e) => setFinderName(e.target.value)}
          sx={{
            mb: 2, input: {
              color: "var(--text-color)"
            },
          }}
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
        />
        <TextField
          fullWidth
          label="Surname"
          value={finderSurname}
          onChange={(e) => setFinderSurname(e.target.value)}
          sx={{
            mb: 2, input: {
              color: "var(--text-color)"
            },
          }}
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
        />
        <TextField
          fullWidth
          label="Email (optional)"
          type="email"
          value={finderEmail}
          onChange={(e) => setFinderEmail(e.target.value)}
          sx={{
            mb: 3, input: {
              color: "var(--text-color)"
            },
          }}
          InputLabelProps={{ style: { color: "var(--text-color)" } }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleStartChat}
            sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
          >
            Start Chat
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default StartChatModal;
