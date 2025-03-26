import React, { useEffect, useState } from "react";
import { fetchOwnerChatSessions } from "../components/Chat/api";
import Page from "../components/ReusableComponents/Page";
import ChatSessionList from "../components/Chat/ChatSessionList";
import { Box, Typography } from "@mui/material";

const ChatPage = () => {
  const [chatSessions, setChatSessions] = useState([]);

  const loadChatSessions = async () => {
    try {
      const sessions = await fetchOwnerChatSessions();
      setChatSessions(sessions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
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
          <ChatSessionList
            chatSessions={chatSessions}
            onDeleted={loadChatSessions}
          />
        )}
      </Box>
    </Page>
  );
};

export default ChatPage;
