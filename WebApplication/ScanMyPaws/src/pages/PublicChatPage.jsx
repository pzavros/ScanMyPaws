import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchChatMessages, sendMessage } from "../components/Chat/api";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const PublicChatPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [finderEphemeralId, setFinderEphemeralId] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Get stored session details
    const storedFinderId = sessionStorage.getItem("finderEphemeralId");

    if (!storedFinderId) {
      alert("Your chat session has expired. Starting a new chat.");
      navigate(-1); // Go back to the previous page
      return;
    }

    setFinderEphemeralId(storedFinderId);

    // Fetch messages on load
    fetchMessages();

    // Polling (or use WebSockets for real-time updates)
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const fetchMessages = async () => {
    try {
      const chatData = await fetchChatMessages(sessionId);
      setMessages(chatData.messages);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const payload = {
        senderId: finderEphemeralId,
        messageContent: newMessage,
    };

    console.log("Sending message payload:", payload); // Debugging

    try {
        const response = await sendMessage(sessionId, payload);
        console.log("Message sent successfully:", response); // Log response
        setNewMessage("");
        fetchMessages();
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
    }
};


  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: "16px",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
      }}
    >
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Chat with the Pet Owner
      </Typography>

      <Paper
        sx={{
          flex: 1,
          padding: 2,
          overflowY: "auto",
          backgroundColor: "var(--card-background)",
          borderRadius: "8px",
          maxHeight: "50vh",
        }}
      >
        {messages.length === 0 ? (
          <Typography variant="body2" sx={{ textAlign: "center", opacity: 0.6 }}>
            No messages yet.
          </Typography>
        ) : (
          messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: msg.senderId === finderEphemeralId ? "row-reverse" : "row",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Paper
                sx={{
                  padding: "8px 12px",
                  borderRadius: "10px",
                  backgroundColor:
                    msg.senderId === finderEphemeralId
                      ? "var(--button-background)"
                      : "var(--input-background)",
                  color: msg.senderId === finderEphemeralId ? "#fff" : "var(--text-color)",
                }}
              >
                {msg.message}
              </Paper>
            </Box>
          ))
        )}
        <div ref={chatEndRef}></div>
      </Paper>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ backgroundColor: "var(--input-background)" }}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default PublicChatPage;
