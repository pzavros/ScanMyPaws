import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import { fetchMedicalRecords } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";
import { formatDate } from "../ReusableComponents/dateUtils";

const MedicalRecordsSummary = ({ petId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      if (petId) {
        try {
          const data = await fetchMedicalRecords(petId);
          setRecords(data);
        } catch (error) {
          console.error("Error fetching medical records:", error);
        }
      }
    };

    loadRecords();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Medical Records Summary</SectionTitle>
        {records.length === 0 ? (
          <Text variant="body2" color="gray">
            No medical records available.
          </Text>
        ) : (
          <Row>
            {records.map((record) => (
              <Card key={record.medicalRecordID}>
                <Text variant="body1" fontWeight="bold">
                  {record.type || "Unknown Type"}
                </Text>
                <Text variant="body2">
                  Date: {formatDate(record.date)}
                </Text>
                <Text variant="body2">
                  Vet: {record.vetClinicName || "N/A"}
                </Text>
              </Card>
            ))}
          </Row>
        )}
      </Box>
    </Section>
  );
};

export default MedicalRecordsSummary;
