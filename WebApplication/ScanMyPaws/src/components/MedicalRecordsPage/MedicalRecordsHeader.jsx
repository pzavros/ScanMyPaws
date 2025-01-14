import React from "react";
import { Typography } from "@mui/material";
import Section from "../ReusableComponents/Section";

const MedicalRecordsHeader = () => {
  return (
    <Section>
      <Typography variant="h4" component="h1" sx={{ marginBottom: 2 }}>
        Medical Records
      </Typography>
      <Typography variant="body1">
        View and manage all your pet's medical records here.
      </Typography>
    </Section>
  );
};

export default MedicalRecordsHeader;
