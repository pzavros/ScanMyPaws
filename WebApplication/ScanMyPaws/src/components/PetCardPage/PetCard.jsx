import React, { useState } from "react";
import { Box, Typography, Avatar, Grid, IconButton, InputBase } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PetsIcon from "@mui/icons-material/Pets";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import Section from "../ReusableComponents/Section";

const PetCard = ({ petDetails, onSave }) => {
  const [form, setForm] = useState(petDetails);
  const [isEditing, setIsEditing] = useState({});

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSave = (field) => {
    handleEditToggle(field);
    onSave(form);
  };

  const imageSrc = form.photo ? `data:image/jpeg;base64,${form.photo}` : null;

  return (
    <Section>
      {/* Header Section */}
      <Box
        sx={{
          textAlign: "center",
          padding: 3,
          background: "linear-gradient(90deg, #6fd3f5, #42a5f5)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Avatar
          src={imageSrc}
          alt="Pet Photo"
          sx={{
            width: 120,
            height: 120,
            margin: "auto",
            border: "4px solid white",
          }}
        />
        <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
          {isEditing.petName ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InputBase
                name="petName"
                value={form.petName || ""}
                onChange={handleInputChange}
                sx={{
                  fontSize: "1.5rem",
                  textAlign: "center",
                  borderBottom: "2px solid white",
                  color: "white",
                }}
              />

              <IconButton
                onClick={() => handleSave("petName")}
                sx={{ color: "white", ml: 1 }}
              >
                <SaveIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              {form.petName}
              <IconButton
                onClick={() => handleEditToggle("petName")}
                sx={{ color: "white", ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </Typography>
        <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "rgba(255, 255, 255, 0.8)" }}>
          {isEditing.breedName ? (
            <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <InputBase
                name="breedName"
                value={form.breedName}
                onChange={handleInputChange}
                sx={{
                  fontSize: "1rem",
                  textAlign: "center",
                  borderBottom: "2px solid white",
                  color: "white",
                }}
              />
              <IconButton
                onClick={() => handleSave("breedName")}
                sx={{ color: "white", ml: 1 }}
              >
                <SaveIcon />
              </IconButton>
            </Box>
          ) : (
            <>
              {form.breedName || "Unknown Breed"}
              <IconButton
                onClick={() => handleEditToggle("breedName")}
                sx={{ color: "rgba(255, 255, 255, 0.8)", ml: 1 }}
              >
                <EditIcon />
              </IconButton>
            </>
          )}
        </Typography>
      </Box>

      {/* Stats Section */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {[
            { label: "Sex", name: "sex", value: form.sex, color: "#ffc107" },
            { label: "Age", name: "age", value: form.age, color: "#28a745" },
            { label: "Weight", name: "weight", value: form.weight || "N/A", color: "#17a2b8" },
          ].map((stat, index) => (
            <Grid item xs={4} key={index}>
              <Box
                sx={{
                  textAlign: "center",
                  backgroundColor: stat.color,
                  color: "white",
                  padding: 2,
                  borderRadius: 3,
                  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                }}
              >
                <PetsIcon sx={{ mb: 1, fontSize: 30 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  {stat.label}
                </Typography>
                {isEditing[stat.name] ? (
                  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 1 }}>
                    <InputBase
                      name={stat.name}
                      value={form[stat.name]}
                      onChange={handleInputChange}
                      sx={{
                        color: "white",
                        borderBottom: "2px solid white",
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    />
                    <IconButton
                      onClick={() => handleSave(stat.name)}
                      sx={{ color: "white", ml: 1 }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    <Typography sx={{ mt: 1 }}>{stat.value}</Typography>
                    <IconButton
                      onClick={() => handleEditToggle(stat.name)}
                      sx={{ color: "white", mt: 1 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Contact Information */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "white", mb: 2, textAlign: "center" }}>
          Contact Information
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { label: "Phone 1", name: "mobilePhone1", value: form.mobilePhone1, icon: <PhoneIcon /> },
            { label: "Phone 2", name: "mobilePhone2", value: form.mobilePhone2 || "N/A", icon: <PhoneIcon /> },
            { label: "Address", name: "address", value: form.address || "N/A", icon: <HomeIcon /> },
            {
              label: "Alternative Contact",
              name: "alternativeContactName",
              value: `${form.alternativeContactName || "N/A"} - ${form.alternativeContactPhone || "N/A"}`,
              icon: <ContactPhoneIcon />,
            },
          ].map((contact, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  padding: 2,
                  background: "rgba(255, 255, 255, 0.1)",
                  borderRadius: 3,
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Box sx={{ color: "#6fd3f5" }}>{contact.icon}</Box>
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold", color: "white" }}>
                      {contact.label}
                    </Typography>
                    {isEditing[contact.name] ? (
                      <InputBase
                        name={contact.name}
                        value={form[contact.name]}
                        onChange={handleInputChange}
                        sx={{
                          color: "white",
                          borderBottom: "2px solid white",
                          fontSize: "1rem",
                        }}
                      />
                    ) : (
                      <Typography variant="body2" sx={{ color: "white" }}>
                        {contact.value}
                      </Typography>
                    )}
                  </Box>
                </Box>
                <IconButton
                  onClick={() =>
                    isEditing[contact.name] ? handleSave(contact.name) : handleEditToggle(contact.name)
                  }
                  sx={{ color: "white" }}
                >
                  {isEditing[contact.name] ? <SaveIcon /> : <EditIcon />}
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Section>
  );
};

export default PetCard;
