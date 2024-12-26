import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";

const steps = [
  {
    title: "Welcome to Scan My Paws",
    description: "Discover a smarter way to keep your pets safe and connected.",
    color: "#FF6F61", // Coral background
    icon: "🐾",
  },
  {
    title: "Stay Connected",
    description: "Easily share your pet's information with a simple scan.",
    color: "#FF914D", // Orange background
    icon: "📱",
  },
  {
    title: "Keep Pets Safe",
    description: "Ensure your pets are found quickly with secure QR codes.",
    color: "#FFD166", // Yellow background
    icon: "🛡️",
  },
  {
    title: "Let’s Get Started",
    description: "Log in and start exploring the world of Scan My Paws!",
    color: "#06D6A0", // Green background
    icon: "✅",
  },
];

const Wizard = ({ onComplete }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onComplete(); // Complete the wizard and move to login
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete(); // Skip the wizard
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: steps[activeStep].color,
        color: "#FFF",
        padding: 3,
      }}
    >
      {/* Icon */}
      <Typography variant="h2" sx={{ mb: 3 }}>
        {steps[activeStep].icon}
      </Typography>

      {/* Title */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        {steps[activeStep].title}
      </Typography>

      {/* Description */}
      <Typography sx={{ fontSize: "1.1rem", mb: 4, maxWidth: "80%" }}>
        {steps[activeStep].description}
      </Typography>

      {/* Progress Dots */}
      <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 4 }}>
        {steps.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: index === activeStep ? "#FFF" : "rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}
      </Box>

      {/* Buttons */}
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", px: 2 }}>
        <Button
          onClick={handleSkip}
          sx={{
            color: "#FFF",
            visibility: activeStep === steps.length - 1 ? "hidden" : "visible",
          }}
        >
          Skip
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: "#FFF",
            color: steps[activeStep].color,
            fontWeight: "bold",
            "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.9)" },
          }}
        >
          {activeStep === steps.length - 1 ? "Got it" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default Wizard;
