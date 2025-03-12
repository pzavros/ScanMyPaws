import React, { useEffect, useState } from "react";
import { fetchOwnerChatSessions } from "../components/Chat/api";
import { Box, Typography, Button } from "@mui/material";
import Page from "../components/ReusableComponents/Page";
import ChatSessionList from "../components/Chat/ChatSessionList";

const ChatPage = () => {
  const [chatSessions, setChatSessions] = useState([]);

  useEffect(() => {
    const loadChatSessions = async () => {
      try {
        const sessions = await fetchOwnerChatSessions();
        console.log("Chat sessions received:", sessions);
        if (Array.isArray(sessions) && sessions.length > 0) {
          setChatSessions(sessions);
        }
      } catch (error) {
        console.error("Error loading chat sessions:", error);
      }
    };

    loadChatSessions();
  }, []);

  return (
    <Page>
      <Box sx={{ maxWidth: "600px", margin: "auto", padding: "16px", textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Chat Sessions
        </Typography>
        
        {chatSessions.length === 0 ? (
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            No chat sessions found.
          </Typography>
        ) : (
          <ChatSessionList chatSessions={chatSessions} />
        )}
      </Box>
    </Page>
  );
};

export default ChatPage;
