import React, { useState, useEffect } from "react";
import {
  TextField,
  Typography,
  Box,
  CircularProgress,
  Alert,
  LinearProgress,
  Modal,
} from "@mui/material";
import Confetti from "react-confetti";
import Button from "../ReusableComponents/Button";
import { fetchPetDetails, createPetCard } from "./api";

const CardForm = ({ petId }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    mobilePhone1: "",
    mobilePhone2: "",
    address: "",
    alternativeContactName: "",
    alternativeContactPhone: "",
    importantInformation: "",
    additionalInfo: "",
    specialNotes: "",
  });

  const [petDetails, setPetDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationSuccess, setOperationSuccess] = useState(false);

  // Reusable TextField style for both light & dark
  const textFieldStyle = {
    backgroundColor: "var(--input-background)",
    borderRadius: "8px",

    // Label color
    label: { color: "var(--text-color)" },

    // Single-line input color
    input: { color: "var(--text-color)" },

    "& .MuiOutlinedInput-input": {
      color: "var(--text-color)",
    },

    "& .MuiOutlinedInput-multiline": {
      color: "var(--text-color) !important",
    },

    "& .MuiInputBase-inputMultiline": {
      color: "var(--text-color) !important",
    },

    // Outline border overrides
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "var(--input-border-color)",
      },
      "&:hover fieldset": {
        borderColor: "var(--secondary-color)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "var(--primary-color)",
      },
    },
  };


  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchPetDetails(petId);
        setPetDetails(data);
      } catch (error) {
        console.error("Error fetching pet details:", error);
        setErrorMessage("Failed to fetch pet details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [petId]);

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isModalOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    setIsModalOpen(true);
    setOperationSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const decodedToken = JSON.parse(atob(token.split(".")[1]));
      const userId = parseInt(decodedToken.UserID || decodedToken.userID, 10);

      if (!userId) {
        throw new Error("User ID not found in the token.");
      }

      const petCardData = {
        petId,
        userID: userId,
        fullName: formData.fullName,
        mobilePhone1: formData.mobilePhone1,
        mobilePhone2: formData.mobilePhone2,
        address: formData.address,
        alternativeContactName: formData.alternativeContactName,
        alternativeContactPhone: formData.alternativeContactPhone,
        importantInformation: formData.importantInformation,
        additionalInfo: formData.additionalInfo,
        petName: petDetails.petName,
        breedName: petDetails.breedName,
        age: petDetails.age,
        sex: petDetails.sex,
        specialNotes: petDetails.specialNotes,
        photo: petDetails.photo,
        weight: petDetails.weight,
        size: petDetails.size
      };

      const simulateProgress = () => {
        let currentProgress = 0;
        const interval = setInterval(() => {
          currentProgress += 33;
          setProgress(currentProgress);

          if (currentProgress >= 100) {
            clearInterval(interval);
          }
        }, 1000);
      };

      simulateProgress();

      await createPetCard(petCardData);

      setOperationSuccess(true);
      setSuccessMessage("Pet card created successfully!");
      setShowConfetti(true);
    } catch (error) {
      console.error("Error creating pet card:", error);
      setOperationSuccess(false);
      setErrorMessage("Failed to create pet card. Please try again.");
    }
  };

  if (loading) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}
      >
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading pet details...</Typography>
      </Box>
    );
  }

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 600,
        margin: "0 auto",
        mt: 4,
      }}
      onSubmit={handleSubmit}
    >
      <Typography
        variant="h4"
        sx={{
          textAlign: "center",
          mb: 3,
          fontWeight: "bold",
          color: "var(--primary-color)",
        }}
      >
        Create Pet Card for {petDetails?.petName}
      </Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>}

      {/* Read-Only Fields */}
      <TextField
        label="Pet Name"
        value={petDetails?.petName || ""}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={textFieldStyle}
      />
      <TextField
        label="Breed"
        value={petDetails?.breedName || ""}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={textFieldStyle}
      />
      <TextField
        label="Age"
        value={petDetails?.age || "N/A"}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={textFieldStyle}
      />
      <TextField
        label="Sex"
        value={petDetails?.sex || "N/A"}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={textFieldStyle}
      />
      <TextField
        label="Weight"
        value={petDetails?.weight || "N/A"}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={textFieldStyle}
      />
      <TextField
        label="Size"
        value={petDetails?.size || "N/A"}
        fullWidth
        InputProps={{ readOnly: true }}
        sx={textFieldStyle}
      />
      <TextField
        label="Special Notes"
        name="specialNotes"
        value={formData.specialNotes || ""}
        onChange={handleChange}
        fullWidth
        multiline
        rows={3}
        sx={textFieldStyle}
      />
      {/* Editable Fields */}
      <TextField
        label="Full Name *"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        fullWidth
        required
        sx={textFieldStyle}
      />
      <TextField
        label="Mobile Phone 1 *"
        name="mobilePhone1"
        value={formData.mobilePhone1}
        onChange={handleChange}
        fullWidth
        required
        sx={textFieldStyle}
      />
      <TextField
        label="Mobile Phone 2"
        name="mobilePhone2"
        value={formData.mobilePhone2}
        onChange={handleChange}
        fullWidth
        sx={textFieldStyle}
      />
      <TextField
        label="Address *"
        name="address"
        value={formData.address}
        onChange={handleChange}
        fullWidth
        required
        sx={textFieldStyle}
      />
      <TextField
        label="Alternative Contact Name"
        name="alternativeContactName"
        value={formData.alternativeContactName}
        onChange={handleChange}
        fullWidth
        sx={textFieldStyle}
      />
      <TextField
        label="Alternative Contact Phone"
        name="alternativeContactPhone"
        value={formData.alternativeContactPhone}
        onChange={handleChange}
        fullWidth
        sx={textFieldStyle}
      />
      <TextField
        label="Important Information"
        name="importantInformation"
        value={formData.importantInformation}
        onChange={handleChange}
        multiline
        rows={3}
        fullWidth
        sx={textFieldStyle}
      />
      <TextField
        label="Additional Info"
        name="additionalInfo"
        value={formData.additionalInfo}
        onChange={handleChange}
        multiline
        rows={4}
        fullWidth
        sx={textFieldStyle}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        disabled={progress > 0 && progress < 100}
        sx={{
          fontSize: "1rem",
          height: "48px",
          borderRadius: "8px",
          background:
            "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
          color: "#fff",
          "&:hover": {
            background:
              "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
          },
        }}
      >
        Generate Pet Card
      </Button>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={() => { }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "var(--card-background)",
            color: "var(--text-color)",
            borderRadius: 4,
            padding: 4,
            width: 300,
            margin: "auto",
            mt: 10,
          }}
        >
          <Typography>
            {operationSuccess ? "Success!" : "Processing..."}
          </Typography>
          <LinearProgress variant="determinate" value={progress} sx={{ width: "100%", my: 2 }} />
          {operationSuccess ? (
            <Button
              variant="contained"
              onClick={() => (window.location.href = `/petcard/${petId}`)}
              sx={{
                backgroundColor: "var(--button-background)",
                "&:hover": { backgroundColor: "var(--button-hover-background)" },
              }}
            >
              View Card
            </Button>
          ) : (
            !operationSuccess && (
              <Typography sx={{ color: "var(--error-color)" }}>{errorMessage}</Typography>
            )
          )}
        </Box>
      </Modal>

      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} />}
    </Box>
  );
};

export default CardForm;
