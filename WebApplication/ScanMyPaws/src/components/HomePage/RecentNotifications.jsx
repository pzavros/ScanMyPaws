import React, { useEffect, useState } from "react";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchRecentNotifications } from "./api";

const RecentNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const loadNotifications = async () => {
      const data = await fetchRecentNotifications();
      setNotifications(data);
    };

    loadNotifications();
  }, []);

  return (
    <Section>
      <Text variant="h6" mb={2}>Recent Notifications</Text>
      <List>
        {notifications.map((notification) => (
          <ListItem key={notification.id}>
            <ListItemText
              primary={notification.title}
              secondary={notification.time}
            />
          </ListItem>
        ))}
      </List>
    </Section>
  );
};

export default RecentNotifications;
