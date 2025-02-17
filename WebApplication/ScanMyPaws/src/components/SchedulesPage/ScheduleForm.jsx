import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Box, Typography } from "@mui/material";
import InputField from "../ReusableComponents/InputField";
import Button from "../ReusableComponents/Button";
import { createSchedule, updateSchedule } from "./api";
import { getUserIDFromToken } from "./api";

const ScheduleForm = ({ isOpen, onClose, onSave, selectedSchedule }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
  });

  useEffect(() => {
    if (selectedSchedule) {
      setFormData({
        title: selectedSchedule.title || "",
        date: selectedSchedule.date ? selectedSchedule.date.split("T")[0] : "",
        time: selectedSchedule.time || "",
        description: selectedSchedule.description || "",
      });
    }
  }, [selectedSchedule]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const scheduleData = {
      scheduleID: selectedSchedule?.scheduleID || null,
      userID: getUserIDFromToken(),
      title: formData.title,
      date: formData.date,
      time: formData.time,
      description: formData.description,
    };

    try {
      let updatedSchedule;
      if (selectedSchedule) {
        updatedSchedule = await updateSchedule(scheduleData);
      } else {
        updatedSchedule = await createSchedule(scheduleData);
      }

      onSave(updatedSchedule);
      setFormData({ title: "", date: "", time: "", description: "" });
      onClose();
    } catch (error) {
      console.error("Failed to save schedule:", error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight="bold">
          {selectedSchedule ? "Edit Schedule" : "Add New Schedule"}
        </Typography>
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
        <Button onClick={handleSubmit} variant="primary">
          {selectedSchedule ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleForm;
