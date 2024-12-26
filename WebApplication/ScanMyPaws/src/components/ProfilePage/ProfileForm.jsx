import React, { useState, useEffect } from "react";
import {
  Box,
  Alert,
  FormControl,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import InputField from "../ReusableComponents/InputField";
import Button from "../ReusableComponents/Button";
import { fetchUserProfile, updateUserProfile } from "./api";

const ProfileForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setFirstName(profile.firstName || "");
        setLastName(profile.lastName || "");
        setEmail(profile.email || "");
        setPhoneNumber(profile.phoneNumber || "");
        setDateOfBirth(
          profile.dateOfBirth
            ? new Date(profile.dateOfBirth).toISOString().split("T")[0]
            : ""
        );
        setGender(
          profile.gender !== null ? (profile.gender ? "Male" : "Female") : ""
        );
        setAddress(profile.address || "");
        setCity(profile.city || "");
        setState(profile.state || "");
        setCountry(profile.country || "");
        setZipCode(profile.zipCode || "");
      } catch (err) {
        setError("Failed to load profile.");
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await updateUserProfile({
        firstName,
        lastName,
        email,
        phoneNumber,
        dateOfBirth,
        gender: gender === "Male" ? true : gender === "Female" ? false : null,
        address,
        city,
        state,
        country,
        zipCode,
      });
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "var(--card-background)",
        color: "var(--text-color)",
        padding: "24px",
        borderRadius: "16px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: "16px", fontWeight: "bold", color: "var(--text-color)" }}
      >
        Update Profile
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {[ // Input fields
        { placeholder: "First Name", value: firstName, setter: setFirstName },
        { placeholder: "Last Name", value: lastName, setter: setLastName },
        { placeholder: "Email", value: email, setter: setEmail, disabled: true },
        { placeholder: "Phone Number", value: phoneNumber, setter: setPhoneNumber },
        { placeholder: "Date of Birth", value: dateOfBirth, setter: setDateOfBirth, type: "date" },
        { placeholder: "Address", value: address, setter: setAddress },
        { placeholder: "City", value: city, setter: setCity },
        { placeholder: "State", value: state, setter: setState },
        { placeholder: "Country", value: country, setter: setCountry },
        { placeholder: "Zip Code", value: zipCode, setter: setZipCode },
      ].map(({ placeholder, value, setter, type = "text", disabled = false }, index) => (
        <Box key={index} mb={3}>
          <InputField
            placeholder={placeholder}
            fullWidth
            value={value}
            onChange={(e) => setter(e.target.value)}
            type={type}
            disabled={disabled}
            sx={{
              input: {
                color: "var(--text-color)",
                backgroundColor: "var(--input-background)",
                border: "1px solid var(--input-border-color)",
                borderRadius: "8px",
                padding: "12px",
                "&::placeholder": {
                  color: "var(--text-color)",
                },
              },
            }}
          />
        </Box>
      ))}

      <Box mb={3}>
        <FormControl fullWidth sx={{ backgroundColor: "var(--input-background)" }}>
          <Select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            displayEmpty
            sx={{
              borderRadius: "8px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--input-border-color)",
              },
              "& .MuiSelect-icon": {
                color: "var(--text-color)",
              },
              color: "var(--text-color)",
            }}
          >
            <MenuItem value="" disabled>
              Gender
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{
          borderRadius: "8px",
          padding: "12px 16px",
        }}
      >
        Update Profile
      </Button>
    </Box>
  );
};

export default ProfileForm;
