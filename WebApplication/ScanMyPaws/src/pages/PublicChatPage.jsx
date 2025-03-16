import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchChatMessages, sendFinderMessage } from "../components/Chat/api";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";

const PublicChatPage = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [finderEphemeralId, setFinderEphemeralId] = useState(null);
  const chatContainerRef = useRef(null);
  const isSendingMessage = useRef(false);

  useEffect(() => {
    const storedFinderId = sessionStorage.getItem("finderEphemeralId");

    if (!storedFinderId) {
      alert("Your chat session has expired.");
      navigate(-1);
      return;
    }

    setFinderEphemeralId(storedFinderId);
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const fetchMessages = async () => {
    try {
      const chatData = await fetchChatMessages(sessionId);
      setMessages(chatData);

      if (isSendingMessage.current) {
        scrollToBottom();
        isSendingMessage.current = false;
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const senderId = sessionStorage.getItem("finderEphemeralId");
    if (!senderId) {
      console.error("Finder ID is missing.");
      return;
    }

    try {
      isSendingMessage.current = true;
      await sendFinderMessage(sessionId, newMessage, senderId);
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      console.error(error);
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "600px",
        margin: "auto",
        backgroundColor: "var(--background-color)",
        color: "var(--text-color)",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Chat Title */}
      <Box
        sx={{
          padding: "12px",
          textAlign: "center",
          backgroundColor: "var(--background-color)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h5">Chat with the Owner</Typography>
      </Box>

      {/* Scrollable Messages Container */}
      <Box
        ref={chatContainerRef}
        sx={{
          flex: 1,
          padding: "16px",
          overflowY: "auto",
          backgroundColor: "var(--card-background)",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {messages.length === 0 ? (
          <Typography variant="body2" sx={{ textAlign: "center", opacity: 0.6 }}>
            No messages yet.
          </Typography>
        ) : (
          messages.map((msg, index) => {
            const isFinder = msg.senderId === finderEphemeralId;
            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: isFinder ? "row-reverse" : "row",
                  alignItems: "center",
                  mb: 1,
                }}
              >
                <Paper
                  sx={{
                    padding: "8px 12px",
                    borderRadius: "16px",
                    backgroundColor: isFinder ? "#1976d2" : "#e0e0e0",
                    color: isFinder ? "#fff" : "#000",
                    maxWidth: "75%",
                    wordBreak: "break-word",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="body1">{msg.messageContent}</Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      display: "block",
                      textAlign: "right",
                      opacity: 0.7,
                      fontSize: "0.75rem",
                      marginTop: "4px",
                    }}
                  >
                    {new Date(msg.sentAt).toLocaleTimeString()}
                  </Typography>
                </Paper>
              </Box>
            );
          })
        )}
      </Box>

      {/* Fixed Input Field */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          gap: 1,
          padding: "10px",
          backgroundColor: "var(--background-color)",
          borderTop: "1px solid #ddd",
          zIndex: 1000,
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{
            backgroundColor: "var(--input-background)",
            borderRadius: "25px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "25px",
              paddingLeft: "12px",
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleSendMessage}
          sx={{
            borderRadius: "50px",
            padding: "12px 20px",
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
            },
          }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default PublicChatPage;
