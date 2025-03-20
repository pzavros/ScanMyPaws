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
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { deleteChatSession } from "./api";

const ChatSessionList = ({ chatSessions, onDeleted }) => {
  const navigate = useNavigate();
  const [selectedChats, setSelectedChats] = useState([]);

  const hasUnreadFinderMessages = (session) => {
    const finderId = session.finderEphemeralId;
    return session.messages.some(
      (msg) => msg.senderId === finderId && !msg.isRead
    );
  };

  const handleLongPress = (sessionId, e) => {
    e.preventDefault();
    setSelectedChats((prev) =>
      prev.includes(sessionId)
        ? prev.filter((id) => id !== sessionId)
        : [...prev, sessionId]
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedChats.length === 0) return;

    if (!window.confirm("Are you sure you want to delete these chats?")) {
      return;
    }

    try {
      await Promise.all(selectedChats.map((id) => deleteChatSession(id)));
      alert("Deleted successfully.");
      setSelectedChats([]);
      onDeleted?.();
    } catch (error) {
      console.error("Failed to delete chats:", error);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {selectedChats.length > 0 && (
        <Box sx={{ textAlign: "right", mb: 1 }}>
          <Button variant="contained" color="error" onClick={handleDeleteSelected}>
            Delete Selected
          </Button>
        </Box>
      )}

      <List
        sx={{
          width: "100%",
          bgcolor: "var(--card-background)",
          borderRadius: 2,
          boxShadow: 1,
          overflow: "hidden",
        }}
      >
        {chatSessions.map((session) => {
          const finderName = session.finderName || "Unknown";
          const finderSurname = session.finderSurname || "User";

          const hasUnread = hasUnreadFinderMessages(session);
          const isSelected = selectedChats.includes(session.chatSessionId);

          return (
            <ListItem
              key={session.chatSessionId}
              onClick={() => {
                if (selectedChats.length > 0) {
                  setSelectedChats((prev) =>
                    isSelected
                      ? prev.filter((id) => id !== session.chatSessionId)
                      : [...prev, session.chatSessionId]
                  );
                } else {
                  navigate(`/owner-chat/${session.chatSessionId}`);
                }
              }}
              onContextMenu={(e) => handleLongPress(session.chatSessionId, e)}
              sx={{
                cursor: "pointer",
                mb: 1,
                borderRadius: 2,
                backgroundColor: isSelected
                  ? "var(--input-background)"
                  : hasUnread
                  ? "rgba(255, 87, 87, 0.1)" // Subtle red background for unread messages
                  : "inherit",
                borderLeft: hasUnread
                  ? "4px solid rgba(244, 67, 54, 0.7)" // Adjusted red for dark mode
                  : "4px solid transparent",
                "&:hover": {
                  backgroundColor: "var(--divider-color)",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: hasUnread ? "error.main" : "primary.main" }}>
                  {finderName.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Typography
                    fontWeight={hasUnread ? "bold" : "normal"}
                    sx={{ color: "var(--text-color)" }}
                  >
                    Chat with {finderName} {finderSurname}
                  </Typography>
                }
                secondary={
                  <Typography
                    sx={{
                      color: "var(--text-color-secondary)",
                      fontSize: "0.9rem",
                    }}
                  >
                    {hasUnread ? "New unread messages from finder" : "All messages read"}
                  </Typography>
                }
              />

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
    </Box>
  );
};

export default ChatSessionList;
