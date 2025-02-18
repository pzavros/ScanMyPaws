import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import { fetchUpcomingTasks } from "./api";
import SectionTitle from "../ReusableComponents/SectionTitle";

const UpcomingTasks = ({ userId }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      if (userId) {
        const data = await fetchUpcomingTasks(userId);
        setTasks(data);
      }
    };

    loadTasks();
  }, [userId]);

  return (
    <Section>
      <Box mb={3}>
        <SectionTitle mb={1}>Upcoming Tasks</SectionTitle>
        <Row>
          {tasks.length === 0 ? (
            <Text variant="body1" align="center">No upcoming tasks.</Text>
          ) : (
            tasks.map((task, index) => (
              <Card key={index}>
                <Text variant="body1" fontWeight="bold">{task.title}</Text>
                <Text variant="body2">{task.description}</Text>
              </Card>
            ))
          )}
        </Row>
      </Box>
    </Section>
  );
};

export default UpcomingTasks;
