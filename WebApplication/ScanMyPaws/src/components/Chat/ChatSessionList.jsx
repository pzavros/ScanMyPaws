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
import { deleteChatSession } from "./api"; // <--- Make sure you import the delete function

const ChatSessionList = ({ chatSessions, onDeleted }) => {
  const navigate = useNavigate();
  const [selectedChats, setSelectedChats] = useState([]);

  // Checks if there are ANY unread messages from the finder.
  const hasUnreadFinderMessages = (session) => {
    const finderId = session.finderEphemeralId;
    return session.messages.some(
      (msg) => msg.senderId === finderId && msg.isRead === false
    );
  };

  // Handle right-click ("long press") to select or deselect a chat
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
      // Delete them in parallel:
      await Promise.all(selectedChats.map(id => deleteChatSession(id)));
  
      alert("Deleted successfully.");
      setSelectedChats([]);
      // Optionally re-fetch your list
      onDeleted?.();
    } catch (error) {
      console.error("Failed to delete chats:", error);
    }
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      {/* Conditionally show a "Delete" button if anything is selected */}
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
          const isSelected = selectedChats.includes(session.chatSessionId);

          return (
            <ListItem
              key={session.chatSessionId}
              onClick={() => {
                // If in "selection mode" (long pressed at least once) and we click the item,
                // we can also toggle selection. Or navigate if we want. It's up to you.
                if (selectedChats.length > 0) {
                  // toggle selection on normal click
                  setSelectedChats((prev) =>
                    isSelected
                      ? prev.filter((id) => id !== session.chatSessionId)
                      : [...prev, session.chatSessionId]
                  );
                } else {
                  // Normal navigation
                  navigate(`/owner-chat/${session.chatSessionId}`);
                }
              }}
              onContextMenu={(e) => handleLongPress(session.chatSessionId, e)}
              sx={{
                cursor: "pointer",
                mb: 1,
                borderRadius: 2,
                backgroundColor: isSelected
                  ? "lightgray"
                  : hasUnread
                  ? "#fff5f5"
                  : "inherit",
                borderLeft: hasUnread
                  ? "4px solid #f44336"
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
