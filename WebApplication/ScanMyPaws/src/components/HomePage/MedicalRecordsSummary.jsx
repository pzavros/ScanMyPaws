import React, { useEffect, useState } from "react";
import { Box, Paper } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import { fetchMedicalRecords } from "./api"; // ✅ Ensure correct import
import SectionTitle from "../ReusableComponents/SectionTitle";

const MedicalRecordsSummary = ({ petId }) => {
  const [medicalRecords, setMedicalRecords] = useState([]);

  useEffect(() => {
    const loadMedicalRecords = async () => {
      if (petId) {
        const data = await fetchMedicalRecords(petId);
        setMedicalRecords(data);
      }
    };
    loadMedicalRecords();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Medical Records Summary</SectionTitle>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          {medicalRecords.length === 0 ? (
            <Text>No medical records found.</Text>
          ) : (
            medicalRecords.map((record, index) => (
              <Paper
                key={record.recordID || `record-${index}`} // ✅ Ensures a unique key
                elevation={2}
                sx={{
                  padding: "16px",
                  borderRadius: "12px",
                  backgroundColor: "var(--card-background)",
                  color: "var(--text-color)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                <Text variant="body1" fontWeight="bold" mb={0.5}>
                  {record.type}
                </Text>
                <Text variant="body2">{record.description}</Text>
                <Text variant="caption" color="gray">
                  {new Date(record.dateCreated).toLocaleDateString()}
                </Text>
              </Paper>
            ))
          )}
        </Box>
      </Box>
    </Section>
  );
};

export default MedicalRecordsSummary;
