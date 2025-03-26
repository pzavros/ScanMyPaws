import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import Page from "../components/ReusableComponents/Page";
import {
  fetchChatMessages,
  sendOwnerMessage,
  markMessagesAsRead,
} from "../components/Chat/api";
import { jwtDecode } from "jwt-decode";

const OwnerChatDetailPage = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);
  const isSendingMessage = useRef(false);

  // Decode token to get userId
  const token = localStorage.getItem("token");
  let decodedUserId = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      decodedUserId = String(decodedToken.UserID);
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const loadMessages = async () => {
    try {
      const data = await fetchChatMessages(sessionId);
      setMessages(data);
      await markMessagesAsRead(sessionId);

      if (isSendingMessage.current) {
        scrollToBottom();
        isSendingMessage.current = false;
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      isSendingMessage.current = true;
      await sendOwnerMessage(sessionId, newMessage);
      setNewMessage("");
      loadMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <Page>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          maxWidth: "600px",
          backgroundColor: "var(--background-color)",
          color: "var(--text-color)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >

        {/* Messages Container */}
        <Box
          ref={chatContainerRef}
          sx={{
            flex: 1,
            padding: "70px 16px 80px",
            overflowY: "auto",
            backgroundColor: "var(--card-background)",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          {messages.length === 0 ? (
            <Typography variant="body2" sx={{ textAlign: "center", opacity: 0.6 }}>
              No messages yet.
            </Typography>
          ) : (
            messages.map((msg, index) => {
              const isOwner = String(msg.senderId) === decodedUserId;
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    flexDirection: isOwner ? "row-reverse" : "row",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      padding: "8px 12px",
                      borderRadius: "16px",
                      backgroundColor: isOwner ? "#1976d2" : "#e0e0e0",
                      color: isOwner ? "#fff" : "#000",
                      maxWidth: "75%",
                      wordBreak: "break-word",
                      boxShadow: "2px 2px 5px rgba(0,0,0,0.1)",
                      position: "relative",
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
                      {msg.sentAt}
                    </Typography>
                  </Paper>
                </Box>
              );
            })
          )}
        </Box>

        {/* Messages Input Field */}
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
    </Page>
  );
};

export default OwnerChatDetailPage;
