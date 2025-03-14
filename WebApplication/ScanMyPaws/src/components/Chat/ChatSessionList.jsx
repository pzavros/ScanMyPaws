import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Badge,
  Box,
  Typography,
  Avatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatSessionList = ({ chatSessions }) => {
  const navigate = useNavigate();
  const [selectedChats, setSelectedChats] = useState([]);

  // Checks if there are ANY unread messages from the finder.
  const hasUnreadFinderMessages = (session) => {
    const finderId = session.finderEphemeralId;
    return session.messages.some(
      (msg) => msg.senderId === finderId && msg.isRead === false
    );
  };

  // Handle right-click ("long press") to select a chat (for potential deletion).
  const handleLongPress = (sessionId, e) => {
    e.preventDefault();
    setSelectedChats((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  return (
    <List
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
      }}
    >
      {chatSessions.map((session) => {
        const finderName = session.finderName || "Unknown";
        const finderSurname = session.finderSurname || "User";

        // Are there any unread from the finder?
        const hasUnread = hasUnreadFinderMessages(session);

        return (
          <ListItem
            key={session.chatSessionId}
            onClick={() => navigate(`/owner-chat/${session.chatSessionId}`)}
            onContextMenu={(e) => handleLongPress(session.chatSessionId, e)}
            sx={{
              cursor: "pointer",
              mb: 1,
              borderRadius: 2,
              // If selected, gray background. Else if has unread, tinted. Otherwise default.
              backgroundColor: selectedChats.includes(session.chatSessionId)
                ? "lightgray"
                : hasUnread
                ? "#fff5f5" // a very soft red highlight
                : "inherit",
              borderLeft: hasUnread
                ? "4px solid #f44336" // MUI's red[500]
                : "4px solid transparent",
              "&:hover": { backgroundColor: "#f7f7f7" },
            }}
          >
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: hasUnread ? "error.main" : "primary.main" }}>
                {finderName.charAt(0).toUpperCase()}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Typography fontWeight={hasUnread ? "bold" : "normal"}>
                  Chat with {finderName} {finderSurname}
                </Typography>
              }
              secondary={
                hasUnread
                  ? "New unread messages from finder"
                  : "All finder messages are read"
              }
            />

            {/* Optionally show a Badge if you want a dot on the right side */}
            <ListItemSecondaryAction>
              {hasUnread && (
                <Badge color="error" variant="dot" overlap="circular">
                  <Box sx={{ width: 24, height: 24 }} />
                </Badge>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ChatSessionList;
