import React, { useState, useEffect, useRef } from "react";
import { fetchChatMessages, sendMessage } from "./api";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

const ChatComponent = ({ sessionId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedFinderId = sessionStorage.getItem("finderEphemeralId");
    const storedUserId = localStorage.getItem("userId");

    if (!storedFinderId && !storedUserId) {
      alert("Chat session expired.");
      return;
    }

    setUserId(storedFinderId || storedUserId);

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const fetchMessages = async () => {
    try {
      const chatData = await fetchChatMessages(sessionId);
      setMessages(chatData.messages || []);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
  
    const payload = {
      senderId: userId,
      messageContent: newMessage,
    };
  
    console.log("Sending message to session ID:", sessionId, "with data:", payload);
  
    try {
      await sendMessage(sessionId, payload);
  
      setMessages([...messages, { senderId: userId, messageContent: newMessage }]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ width: "100%", maxWidth: "600px", margin: "auto", padding: "16px" }}>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
        Chat
      </Typography>

      <Paper sx={{ height: 300, overflowY: "auto", padding: 2 }}>
        {messages.map((msg, index) => (
          <Box key={index} sx={{ display: "flex", flexDirection: msg.senderId === userId ? "row-reverse" : "row" }}>
            <Paper sx={{ padding: "8px 12px", borderRadius: "10px", backgroundColor: "#f0f0f0" }}>
              {msg.messageContent}
            </Paper>
          </Box>
        ))}
        <div ref={chatEndRef}></div>
      </Paper>

      <Box sx={{ display: "flex", gap: 1, mt: 2 }}>
        <TextField fullWidth value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type your message..." />
        <Button variant="contained" onClick={handleSendMessage}>Send</Button>
      </Box>
    </Box>
  );
};

export default ChatComponent;
