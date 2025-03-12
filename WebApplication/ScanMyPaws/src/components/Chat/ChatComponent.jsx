import React, { useState, useEffect, useRef } from "react";
import { fetchChatMessages, sendMessage } from "./api";
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";

const ChatComponent = ({ sessionId, isOwner }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatEndRef = useRef(null);
  const [userId, setUserId] = useState(null);
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const storedFinderId = sessionStorage.getItem("finderEphemeralId");
    const storedUserId = localStorage.getItem("userId");

    const currentUser = isOwner ? storedUserId : storedFinderId;
    if (!currentUser) {
      alert("Chat session expired.");
      return;
    }
    setUserId(currentUser);

    // Fetch messages initially
    fetchMessages();

    // Setup real-time connection
    const newConnection = new HubConnectionBuilder()
      .withUrl(`${import.meta.env.VITE_APP_API_BASE_URL}/chatHub`)
      .withAutomaticReconnect()
      .build();

    newConnection
      .start()
      .then(() => {
        console.log("Connected to SignalR hub");
        newConnection.invoke("JoinChatSession", sessionId);
      })
      .catch(err => console.error("Error starting SignalR:", err));

    newConnection.on("ReceiveMessage", (updatedSession) => {
      setMessages(updatedSession.messages || []);
      scrollToBottom();
    });

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.stop();
      }
    };
  }, [sessionId, isOwner]);

  const fetchMessages = async () => {
    try {
      const chatData = await fetchChatMessages(sessionId);
      setMessages(chatData);
      scrollToBottom();
  
      const userId = isOwner ? localStorage.getItem("userId") : sessionStorage.getItem("finderEphemeralId");
      console.log("User ID:", userId);
      console.log("HIiiiii");
      if (userId) {
        await markMessagesAsRead(sessionId, userId);
      }
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

    try {
      await sendMessage(sessionId, payload);
      setNewMessage("");

      if (connection) {
        await connection.invoke("SendMessage", sessionId, userId, newMessage);
      }
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
        {isOwner ? "Chat with the Pet Finder" : "Chat with the Pet Owner"}
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
