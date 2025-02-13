// Updated UpcomingTasks.js
import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import { fetchUpcomingTasks } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const UpcomingTasks = ({ petId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      if (petId) {
        const data = await fetchUpcomingTasks(petId);
        setTasks(data);
      }
    };

    loadTasks();
  }, [petId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Upcoming Tasks</SectionTitle>
        <Row>
          {tasks.map((task, index) => (
            <Card key={index}>
              <Text variant="body1" fontWeight="bold">
                {task.title}
              </Text>
              <Text variant="body2">{task.description}</Text>
            </Card>
          ))}
        </Row>
      </Box>
    </Section>
  );
};

export default UpcomingTasks;