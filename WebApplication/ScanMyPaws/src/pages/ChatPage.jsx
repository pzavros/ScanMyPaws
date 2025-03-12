import React, { useEffect, useState } from "react";
import { fetchOwnerChatSessions } from "../components/Chat/api";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import Page from "../components/ReusableComponents/Page";

const ChatPage = () => {
  const navigate = useNavigate();
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
      <Box sx={{ maxWidth: "600px", margin: "auto", padding: "16px" }}>
        <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>
          Chat Sessions
        </Typography>
        {chatSessions.length === 0 ? (
          <Typography variant="body2" sx={{ textAlign: "center", opacity: 0.6 }}>
            No chat sessions found.
          </Typography>
        ) : (
          <List>
            {chatSessions.map((session) => {
              const finderName = session.finderName || "Unknown";
              const finderSurname = session.finderSurname || "User";
              return (
                <ListItem
                  key={session.chatSessionId}
                  button
                  onClick={() => navigate(`/chat/${session.chatSessionId}`)}
                >
                  <ListItemText primary={`Chat with ${finderName} ${finderSurname}`} />
                </ListItem>
              );
            })}
          </List>
        )}
      </Box>
    </Page>
  );
};

export default ChatPage;
