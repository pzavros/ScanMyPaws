// Updated PlannerHighlights.js
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import { fetchPlannerHighlights } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const PlannerHighlights = ({ petId }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      if (petId) {
        const data = await fetchPlannerHighlights(petId);
        setEvents(data);
      }
    };

    loadEvents();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Planner Highlights</SectionTitle>
        <Row>
          {events.map((event, index) => (
            <Card key={index}>
              <Text variant="body1" fontWeight="bold">
                {event.title}
              </Text>
              <Text variant="body2">{event.date}</Text>
            </Card>
          ))}
        </Row>
      </Box>
    </Section>
  );
};

export default PlannerHighlights;