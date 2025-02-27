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
      window.location.href = "/";
    } catch (err) {
      console.error("API error response:", err.response);
      let errorMessage = "Failed to log in.";
      if (err.response && err.response.data) {
        errorMessage = err.response.data;
      }
      setError(errorMessage);
    }
  };

  return (
    <Section
      style={{
        padding: "32px 16px",
        maxWidth: "400px",
        margin: "0 auto",
        textAlign: "center",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        color: "var(--text-color)",
      }}
    >
      {/* Logo */}
      <Box sx={{ marginBottom: 3 }}>
        <img
          src="media/HomePage1.jpg"
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
            background:
              "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
            color: "#fff",
            "&:hover": {
              background:
                "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
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
