import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import InputField from "../ReusableComponents/InputField";
import Button from "../ReusableComponents/Button";
import Text from "../ReusableComponents/Text";
import { createSchedule } from "./api";

const ScheduleForm = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const scheduleData = {
      title: formData.title,
      date: `${formData.date}T${formData.time}`, // Combining date and time for API
      description: formData.description,
    };

    try {
      const createdSchedule = await createSchedule(scheduleData);
      onSave(createdSchedule); // Pass new schedule to update UI
      setFormData({ title: "", date: "", time: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Failed to save schedule:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Text variant="h5" weight="bold">Add New Schedule</Text>
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "var(--background-color)" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <InputField
            label="Date"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            required
          />
          <InputField
            label="Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            required
          />
          <InputField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2, backgroundColor: "var(--background-color)" }}>
        <Button onClick={onClose} variant="outlined">Cancel</Button>
        <Button onClick={handleSubmit} variant="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleForm;
