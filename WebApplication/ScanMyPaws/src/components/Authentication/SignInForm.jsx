import React, { useState } from "react";
import { Box, Alert, Divider, Typography, Button as MuiButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Section from "../ReusableComponents/Section";
import Button from "../ReusableComponents/Button";
import InputField from "../ReusableComponents/InputField";
import GoogleIcon from "@mui/icons-material/Google";
import { signInUser } from "./api";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await signInUser(email, password);
      setSuccess("Logged in successfully!");
      window.location.href = "/"; // Redirect to the homepage
    } catch (err) {
      setError(err.message || "Failed to log in.");
    }
  };

  return (
    <Section
      style={{
        padding: "32px 16px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "var(--card-background)",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Subtle shadow
        color: "var(--text-color)", // Adapt to dark/light mode
      }}
    >
      {/* Logo */}
      <Box sx={{ marginBottom: 3 }}>
        <img
          src="https://via.placeholder.com/64" // Replace with your logo URL
          alt="Logo"
          style={{ width: "64px", height: "64px", margin: "0 auto", borderRadius: "50%" }}
        />
      </Box>

      {/* Title */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: "8px" }}>
        Welcome Back!
      </Typography>
      <Typography variant="body2" sx={{ color: "var(--text-color-secondary)", marginBottom: 3 }}>
        Enter your account details below to access your account.
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
        {/* Email Field */}
        <Box mb={2}>
          <InputField
            placeholder="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              input: {
                color: "var(--text-color)",
                backgroundColor: "var(--input-background)",
                border: "1px solid var(--input-border-color)",
                borderRadius: "8px",
                padding: "12px",
                "&::placeholder": {
                  color: "var(--text-color-secondary)",
                },
              },
            }}
          />
        </Box>

        {/* Password Field */}
        <Box mb={2}>
          <InputField
            placeholder="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              input: {
                color: "var(--text-color)",
                backgroundColor: "var(--input-background)",
                border: "1px solid var(--input-border-color)",
                borderRadius: "8px",
                padding: "12px",
                "&::placeholder": {
                  color: "var(--text-color-secondary)",
                },
              },
            }}
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
          Login
        </Button>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 3, color: "var(--text-color-secondary)" }}>Or continue with</Divider>

      {/* Google Button */}
      <MuiButton
        variant="outlined"
        fullWidth
        startIcon={<GoogleIcon />}
        sx={{
          height: "48px",
          fontSize: "1rem",
          textTransform: "none",
          border: "1px solid var(--input-border-color)",
          color: "var(--text-color)",
          "&:hover": {
            backgroundColor: "var(--button-hover-background)",
            borderColor: "var(--input-border-color)",
          },
        }}
      >
        Google
      </MuiButton>

      {/* Register Link */}
      <Typography variant="body2" sx={{ mt: 3 }}>
        Don’t have an account?{" "}
        <Typography
          component="span"
          variant="body2"
          sx={{
            fontWeight: "bold",
            cursor: "pointer",
            color: "var(--primary-color)",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
          onClick={() => navigate("/SignUp")}
        >
          Register Here
        </Typography>
      </Typography>
    </Section>
  );
};

export default SignInForm;
