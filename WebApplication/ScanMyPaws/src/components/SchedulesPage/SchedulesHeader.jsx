import React from "react";
import { Typography } from "@mui/material";
import Section from "../ReusableComponents/Section";

const SchedulesHeader = () => {
  return (
    <Section>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Schedules & Notifications
      </Typography>
      <Typography variant="body1">
        View and manage your upcoming appointments, reminders, and notifications.
      </Typography>
    </Section>
  );
};

export default SchedulesHeader;
