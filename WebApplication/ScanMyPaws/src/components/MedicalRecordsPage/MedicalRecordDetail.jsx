import React from "react";
import { Typography, Button, Box, Divider } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";

const MedicalRecordDetail = ({ record, onBack }) => {
  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "0 auto",
        padding: 4,
        borderRadius: "16px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: 80,
          height: 80,
          background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
          borderRadius: "50%",
          margin: "0 auto",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <PetsIcon sx={{ color: "#fff", fontSize: "2.5rem" }} />
      </Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: "var(--text-color)",
          textAlign: "center",
          marginTop: 2,
          textShadow: "0px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        Medical Record Details
      </Typography>

      <Divider sx={{ margin: "24px 0", background: "rgba(0, 0, 0, 0.1)" }} />

      <Box sx={{ marginBottom: 2 }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Type:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: "var(--text-color)" }}>
          {record.type}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Date:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: "var(--text-color)" }}>
          {new Date(record.date).toLocaleDateString()}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Next Due Date:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: "var(--text-color)" }}>
          {record.nextDueDate
            ? new Date(record.nextDueDate).toLocaleDateString()
            : "N/A"}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Description:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: "var(--text-color)" }}>
          {record.description}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Notes:
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 2, color: "var(--text-color)" }}>
          {record.notes || "No additional notes"}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontSize: "1.1rem",
            color: "var(--text-color)",
            marginBottom: 1,
          }}
        >
          Vet Clinic:
        </Typography>
        <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
          {record.vetClinicName || "N/A"}
        </Typography>
      </Box>

      <Box
        sx={{
          textAlign: "center",
          marginTop: 4,
        }}
      >
        <Button
          variant="contained"
          onClick={onBack}
          sx={{
            borderRadius: "50px",
            padding: "10px 24px",
            background: "linear-gradient(135deg, #FF6F61, #FFC1A1)",
            color: "#fff",
            fontWeight: "bold",
            "&:hover": {
              background: "linear-gradient(135deg, #FFC1A1, #FF6F61)",
            },
          }}
        >
          Back to Records
        </Button>
      </Box>
    </Box>
  );
};

export default MedicalRecordDetail;
