import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Box } from "@mui/material";
import InputField from "../ReusableComponents/InputField";
import Button from "../ReusableComponents/Button";
import Text from "../ReusableComponents/Text";

const ScheduleForm = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    setFormData({ title: "", date: "", description: "" });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Text variant="h5" weight="bold">
          Add New Schedule
        </Text>
      </DialogTitle>
      <DialogContent>
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
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={onClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ScheduleForm;
