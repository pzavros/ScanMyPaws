// Updated MedicalRecordsSummary.js
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import { fetchMedicalRecords } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const MedicalRecordsSummary = ({ petId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      if (petId) {
        const data = await fetchMedicalRecords(petId);
        setRecords(data);
      }
    };

    loadRecords();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Medical Records Summary</SectionTitle>
        <Row>
          {records.map((record, index) => (
            <Card key={index}>
              <Text variant="body1" fontWeight="bold">
                {record.type}
              </Text>
              <Text variant="body2">Date: {record.date}</Text>
              <Text variant="body2">Vet: {record.vet}</Text>
            </Card>
          ))}
        </Row>
      </Box>
    </Section>
  );
};

export default MedicalRecordsSummary;