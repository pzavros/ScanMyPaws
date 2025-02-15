import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem } from "@mui/material";

// Utility function to format date to yyyy-MM-dd
const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const MedicalRecordForm = ({ onClose, petID, onSave, editableRecord }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    typeID: "",
    nextDueDate: "",
    description: "",
    notes: "",
    vetClinicName: "",
  });

  useEffect(() => {
    if (editableRecord) {
      setFormData({
        title: editableRecord.title || "",
        date: formatDate(editableRecord.date),
        typeID: editableRecord.typeID || "",
        nextDueDate: formatDate(editableRecord.nextDueDate),
        description: editableRecord.description || "",
        notes: editableRecord.notes || "",
        vetClinicName: editableRecord.vetClinicName || "",
      });
    }
  }, [editableRecord]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const recordData = {
        id: editableRecord?.id,
        petID: parseInt(petID, 10),
        typeID: parseInt(formData.typeID, 10),
        date: formData.date,
        nextDueDate: formData.nextDueDate || null,
        description: formData.description,
        notes: formData.notes || null,
        vetClinicName: formData.vetClinicName || null,
      };
      await onSave(recordData, true);
      onClose();
    } catch (error) {
      console.error("Error updating record:", error);
    }
  };

  const handleCreate = async () => {
    try {
      const recordData = {
        petID: parseInt(petID, 10),
        typeID: parseInt(formData.typeID, 10),
        date: formData.date,
        nextDueDate: formData.nextDueDate || null,
        description: formData.description,
        notes: formData.notes || null,
        vetClinicName: formData.vetClinicName || null,
      };
      await onSave(recordData, false);
      onClose();
    } catch (error) {
      console.error("Error creating record:", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        maxWidth: 600,
        margin: "0 auto",
        background: "var(--card-background)",
        padding: 3,
        borderRadius: "16px",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, color: "var(--text-color)" }}>
        {editableRecord ? "Edit Medical Record" : "Add Medical Record"}
      </Typography>

      <TextField
        label="Type"
        name="typeID"
        value={formData.typeID}
        onChange={handleChange}
        select
        fullWidth
        required
        InputProps={{
          style: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
        }}
        InputLabelProps={{
          style: { color: "var(--text-color)" },
        }}
      >
        <MenuItem value="1">Vaccination</MenuItem>
        <MenuItem value="2">Deworming</MenuItem>
        <MenuItem value="3">Preventive Care</MenuItem>
        <MenuItem value="4">Surgery</MenuItem>
        <MenuItem value="5">Routine Check-up</MenuItem>
      </TextField>

      <TextField
        label="Date"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        fullWidth
        required
        InputProps={{
          style: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: "var(--text-color)" },
        }}
      />

      <TextField
        label="Next Due Date"
        name="nextDueDate"
        type="date"
        value={formData.nextDueDate}
        onChange={handleChange}
        fullWidth
        InputProps={{
          style: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
        }}
        InputLabelProps={{
          shrink: true,
          style: { color: "var(--text-color)" },
        }}
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        required
        multiline
        rows={2}
        InputProps={{
          style: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
        }}
        InputLabelProps={{
          style: { color: "var(--text-color)" },
        }}
      />

      <TextField
        label="Notes"
        name="notes"
        value={formData.notes}
        onChange={handleChange}
        fullWidth
        multiline
        rows={2}
        InputProps={{
          style: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
        }}
        InputLabelProps={{
          style: { color: "var(--text-color)" },
        }}
      />

      <TextField
        label="Vet Clinic Name"
        name="vetClinicName"
        value={formData.vetClinicName}
        onChange={handleChange}
        fullWidth
        InputProps={{
          style: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
        }}
        InputLabelProps={{
          style: { color: "var(--text-color)" },
        }}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            color: "var(--text-color)",
            borderColor: "var(--text-color)",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
          }}
        >
          Cancel
        </Button>

        {editableRecord ? (
          <Button
            onClick={handleUpdate}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
              },
            }}
          >
            Update
          </Button>
        ) : (
          <Button
            onClick={handleCreate}
            variant="contained"
            sx={{
              background: "linear-gradient(90deg, rgba(97,255,111,1) 0%, rgba(165,255,97,1) 100%)",
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(90deg, rgba(165,255,97,1) 0%, rgba(97,255,111,1) 100%)",
              },
            }}
          >
            Create
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default MedicalRecordForm;
