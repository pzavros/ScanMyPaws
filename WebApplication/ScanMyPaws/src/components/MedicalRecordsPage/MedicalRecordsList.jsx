import React, { useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PetsIcon from "@mui/icons-material/Pets";
import Section from "../ReusableComponents/Section";
import { formatDate } from "../ReusableComponents/dateUtils";

const MedicalRecordsList = ({ records = [], onRecordSelect, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleEdit = (record) => {
    onEdit(record);
  };

  const handleDeleteClick = (record) => {
    setSelectedRecord(record);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedRecord(null);
  };

  const handleConfirmDelete = () => {
    console.log(selectedRecord);
    if (selectedRecord) {
      onDelete(selectedRecord);
    }
    handleClose();
  };

  if (!records.length) {
    return (
      <Section>
        <Typography sx={{ color: "var(--text-color)", textAlign: "center" }}>
          No medical records available.
        </Typography>
      </Section>
    );
  }

  return (
    <Section>
      {/* Title Section */}
      <Box
        sx={{
          textAlign: "center",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            width: 60,
            height: 60,
            background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
            borderRadius: "50%",
            marginBottom: 1,
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <PetsIcon sx={{ color: "#fff", fontSize: "1.8rem" }} />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Medical Records
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontStyle: "italic",
            color: "var(--text-color)",
          }}
        >
          A detailed log of your pet's health and wellness.
        </Typography>
      </Box>

      {/* Medical Records Grid */}
      <Grid container spacing={4}>
        {records.map((record, index) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            key={record.medicalRecordID || `${record.typeID}-${index}`} // Ensure a unique key
          >
            <Card
              sx={{
                position: "relative",
                background: "linear-gradient(135deg, #FFB7C5, #92E6FF)",
                borderRadius: "24px",
                boxShadow:
                  "0 15px 30px rgba(0, 0, 0, 0.2), 0 5px 15px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                transition: "transform 0.4s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0 25px 40px rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <CardContent
                sx={{
                  position: "relative",
                  zIndex: 2,
                  padding: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
                    borderRadius: "50%",
                    margin: "0 auto 16px",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <PetsIcon
                    sx={{
                      color: "#fff",
                      fontSize: "1.5rem",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "var(--text-color)",
                    textShadow: "0px 1px 2px rgba(0, 0, 0, 0.8)",
                    marginBottom: 1,
                  }}
                >
                  {record.type}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    textAlign: "center",
                    fontStyle: "italic",
                    color: "var(--text-color)",
                    marginBottom: 2,
                  }}
                >
                  {formatDate(record.date)}
                </Typography>
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    onClick={() => onRecordSelect(record)}
                    sx={{
                      borderRadius: "50px",
                      textTransform: "none",
                      fontWeight: "bold",
                      padding: "8px 24px",
                      background: "linear-gradient(135deg, #FF6F61, #FFC1A1)",
                      color: "#fff",
                      "&:hover": {
                        background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
                      },
                    }}
                  >
                    View Details
                  </Button>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    gap: 1,
                  }}
                >
                  <IconButton
                    onClick={() => handleEdit(record)}
                    sx={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#FF6F61",
                      "&:hover": { background: "#FFAB91" },
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeleteClick(record)}
                    sx={{
                      background: "rgba(255, 255, 255, 0.3)",
                      color: "#FF6F61",
                      "&:hover": { background: "#FFAB91" },
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this medical record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Section>
  );
};

export default MedicalRecordsList;
