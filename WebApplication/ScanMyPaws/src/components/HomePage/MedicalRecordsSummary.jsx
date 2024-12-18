import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import Card from "../ReusableComponents/Card";
import { fetchMedicalRecords } from "./api";

const MedicalRecordsSummary = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const loadRecords = async () => {
      const data = await fetchMedicalRecords();
      setRecords(data);
    };

    loadRecords();
  }, []);

  return (
    <Section>
      <Text variant="h6" mb={2}>Medical Records Summary</Text>
      {records.map((record) => (
        <Card key={record.id}>
          <Text variant="body1" fontWeight="bold">
            {record.type}
          </Text>
          <Text variant="body2">Date: {record.date}</Text>
          <Text variant="body2">Vet: {record.vet}</Text>
        </Card>
      ))}
    </Section>
  );
};

export default MedicalRecordsSummary;
