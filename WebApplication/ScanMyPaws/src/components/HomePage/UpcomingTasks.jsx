import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Text from "../ReusableComponents/Text";
import Row from "../ReusableComponents/Row";
import Card from "../ReusableComponents/Card";
import Section from "../ReusableComponents/Section";
import { fetchUpcomingTasks } from "./api";

const UpcomingTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const loadTasks = async () => {
      const data = await fetchUpcomingTasks();
      setTasks(data);
    };

    loadTasks();
  }, []);

  return (
    <Section>
      <Box mb={3}>
        <Text variant="h6" mb={1}>
          Upcoming Tasks
        </Text>
        <Row>
          {tasks.map((task, index) => (
            <Card key={index}>
              <Text variant="body1" fontWeight="bold">
                {task.title}
              </Text>
              <Text variant="body2" color="textSecondary">
                {task.description}
              </Text>
            </Card>
          ))}
        </Row>
      </Box>
    </Section>
  );
};

export default UpcomingTasks;
