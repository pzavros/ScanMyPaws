import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import SectionTitle from "../ReusableComponents/SectionTitle";
import { fetchPetLocationHistory } from "./api";

const PetLocationHistory = () => {
  const { petId } = useParams();
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        if (!petId) return;
        const data = await fetchPetLocationHistory(petId);
        setLocations(data);
      } catch (err) {
        console.error("Failed to fetch location history:", err);
      }
    };

    loadHistory();
  }, [petId]);

  const handleLocationClick = (lat, lng) => {
    if (!lat || !lng) return;
    const mapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapsUrl, "_blank");
  };

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Pet Location History</SectionTitle>
        <Row>
          {locations.length === 0 ? (
            <Text variant="body1" align="center">No location history found.</Text>
          ) : (
            locations.map((loc, index) => (
              <Card key={index}>
                <Text
                  variant="body1"
                  fontWeight="bold"
                  sx={{ cursor: loc.latitude && loc.longitude ? "pointer" : "default", color: "var(--primary-color)" }}
                  onClick={() => handleLocationClick(loc.latitude, loc.longitude)}
                >
                  Click to view location
                </Text>
                <Text variant="body2">
                  Found by: {loc.finderName} ({loc.finderContact})
                </Text>
                <Text variant="caption" color="gray">
                  {new Date(loc.dateFound).toLocaleString()}
                </Text>
              </Card>
            ))
          )}
        </Row>
      </Box>
    </Section>
  );
};

export default PetLocationHistory;
