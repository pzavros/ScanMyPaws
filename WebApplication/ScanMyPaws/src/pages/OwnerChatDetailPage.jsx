// /pages/OwnerChatDetailPage.jsx

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchChatMessages, sendMessage, markMessagesAsRead } from "../components/Chat/api";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import Page from "../components/ReusableComponents/Page";

const OwnerChatDetailPage = () => {
  const { sessionId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);

  // For marking messages read
  const userId = localStorage.getItem("userId"); // or decode from your JWT

  useEffect(() => {
    loadMessages();

    // Poll or set up WebSocket/SignalR, whichever you prefer
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [sessionId]);

  const loadMessages = async () => {
    try {
      const data = await fetchChatMessages(sessionId);
      setMessages(data);
  
      await markMessagesAsRead(sessionId);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
  
    try {
      await sendMessage(sessionId, newMessage);
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };
  
  

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Page>
      <Box>
        <Typography variant="h5">Owner's Chat Page</Typography>
        <Paper style={{ height: 300, overflowY: "auto" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: "flex",
              justifyContent: msg.senderId === userId ? "flex-end" : "flex-start"
            }}>
              <Paper>
                {msg.messageContent}
              </Paper>
            </div>
          ))}
          <div ref={chatEndRef}></div>
        </Paper>
        <Box>
          <TextField
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </Box>
      </Box>
    </Page>
  );
};

export default OwnerChatDetailPage;
