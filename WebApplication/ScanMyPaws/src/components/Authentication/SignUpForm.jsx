import React, { useState } from "react";
import { Box, Alert, Typography } from "@mui/material";
import Section from "../ReusableComponents/Section";
import Button from "../ReusableComponents/Button";
import InputField from "../ReusableComponents/InputField";
import { signUpUser } from "./api";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validate password confirmation
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // API Call
      const response = await signUpUser({
        firstName,
        lastName,
        email,
        passwordHash: password, // Ensure this key matches the backend model
      });
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect after success
    } catch (err) {
      // Display meaningful error messages
      setError(err || "Failed to create an account. Please try again.");
    }
  };

  return (
    <Section
      style={{
        padding: "32px 16px",
        maxWidth: "500px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "var(--card-background)",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", 
        color: "var(--text-color)",
      }}
    >
      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        Create Your Account
      </Typography>
      <Typography variant="body2" sx={{ color: "var(--text-color-secondary)", marginBottom: 3 }}>
        Please fill out the form below to get started.
      </Typography>

      {/* Error Message */}
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* Success Message */}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
        }}
      >
        {/* First Name */}
        <Box mb={3}>
          <InputField
            placeholder="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Box>

        {/* Last Name */}
        <Box mb={3}>
          <InputField
            placeholder="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Box>

        {/* Email */}
        <Box mb={3}>
          <InputField
            placeholder="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        {/* Password */}
        <Box mb={3}>
          <InputField
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>

        {/* Confirm Password */}
        <Box mb={3}>
          <InputField
            placeholder="Confirm Password"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Box>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            fontSize: "1rem",
            height: "48px",
            borderRadius: "8px",
            backgroundColor: "var(--primary-color)",
            "&:hover": {
              backgroundColor: "var(--secondary-color)",
            },
          }}
        >
          Sign Up
        </Button>
      </Box>
    </Section>
  );
};

export default SignUpForm;
