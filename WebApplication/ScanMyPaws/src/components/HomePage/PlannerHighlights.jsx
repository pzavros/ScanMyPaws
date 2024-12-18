import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Text from "../ReusableComponents/Text";
import Card from "../ReusableComponents/Card";
import { fetchPlannerHighlights } from "./api";

const PlannerHighlights = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchPlannerHighlights();
      setEvents(data);
    };

    loadEvents();
  }, []);

  return (
    <Section>
      <Text variant="h6" mb={2}>Planner Highlights</Text>
      {events.map((event) => (
        <Card key={event.id}>
          <Text variant="body1" fontWeight="bold">
            {event.title}
          </Text>
          <Text variant="body2">{event.date}</Text>
        </Card>
      ))}
    </Section>
  );
};

export default PlannerHighlights;
