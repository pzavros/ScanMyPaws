import React, { useState } from "react";
import { Box, Alert } from "@mui/material";
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

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await signUpUser({
        firstName,
        lastName,
        email,
        passwordHash: password,
      });
      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/"), 2000); // Redirect to home page after success
    } catch (err) {
      setError(err.response?.data || "Failed to create an account.");
    }
  };

  return (
    <Section
      style={{
        padding: "32px 16px",
        maxWidth: "500px",
        margin: "0 auto",
      }}
    >
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
            label="First Name"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Box>

        {/* Last Name */}
        <Box mb={3}>
          <InputField
            label="Last Name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Box>

        {/* Email */}
        <Box mb={3}>
          <InputField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>

        {/* Password */}
        <Box mb={3}>
          <InputField
            label="Password"
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
            label="Confirm Password"
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
        >
          Sign Up
        </Button>
      </Box>
    </Section>
  );
};

export default SignUpForm;
