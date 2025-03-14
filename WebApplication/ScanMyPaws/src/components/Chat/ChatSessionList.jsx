import React, { useState } from "react";
import { List, ListItem, ListItemText, Badge, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChatSessionList = ({ chatSessions, onDelete }) => {
    const navigate = useNavigate();
    const [selectedChats, setSelectedChats] = useState([]);

    // Handle Long Press to Select for Deletion
    const handleLongPress = (sessionId) => {
        setSelectedChats((prev) => {
            if (prev.includes(sessionId)) {
                return prev.filter((id) => id !== sessionId);
            }
            return [...prev, sessionId];
        });
    };

    const hasUnreadMessages = (messages) => {
        return messages.some((msg) => msg.isRead === false);
    };


    return (
        <List sx={{ width: "100%", bgcolor: "background.paper", borderRadius: "8px", boxShadow: 1 }}>
            {chatSessions.map((session) => {
                const finderName = session.finderName || "Unknown";
                const finderSurname = session.finderSurname || "User";
                const unread = hasUnreadMessages(session.messages);

                return (
                    <ListItem
                        key={session.chatSessionId}
                        onClick={() => navigate(`/owner-chat/${session.chatSessionId}`)}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleLongPress(session.chatSessionId);
                        }}
                        sx={{
                            cursor: "pointer",
                            backgroundColor: selectedChats.includes(session.chatSessionId)
                                ? "lightgray"
                                : unread
                                    ? "#ffebee"
                                    : "inherit",
                            "&:hover": { backgroundColor: "#f5f5f5" },
                            borderBottom: "1px solid #ddd",
                            padding: "12px",
                        }}
                    >
                        <Badge color="secondary" variant={unread ? "dot" : "standard"} overlap="circular">
                            <ListItemText
                                primary={
                                    <Typography fontWeight={unread ? "bold" : "normal"}>
                                        Chat with {finderName} {finderSurname}
                                    </Typography>
                                }
                            />
                        </Badge>
                    </ListItem>

                );
            })}
        </List>
    );
};

export default ChatSessionList;
