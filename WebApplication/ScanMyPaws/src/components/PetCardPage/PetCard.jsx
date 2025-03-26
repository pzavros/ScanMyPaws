import React, { useState, useEffect } from "react";
import { Box, Typography, Avatar, Grid, IconButton, InputBase, Checkbox, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PetsIcon from "@mui/icons-material/Pets";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Section from "../ReusableComponents/Section";
import { fetchPetCardSetting, updatePetCardSetting } from "./api";

const PetCard = ({ petDetails, onSave, readOnly = false }) => {
  const [form, setForm] = useState(petDetails);
  const [globalEditMode, setGlobalEditMode] = useState(false);
  const [visibleFields, setVisibleFields] = useState({
    petName: true,
    breedName: true,
    sex: true,
    age: true,
    weight: true,
    mobilePhone1: true,
    mobilePhone2: true,
    address: true,
    alternativeContact: true,
  });
  const [editingVisibility, setEditingVisibility] = useState(false);
  const [petCardSettingId, setPetCardSettingId] = useState(null);

  // Load saved visibility settings from the backend
  useEffect(() => {
    const petID = petDetails?.PetID || petDetails?.petID;
    if (petID) {
      fetchPetCardSetting(petID)
        .then((data) => {
          if (data) {
            const settingId = data.petCardSettingId || data.PetCardSettingId;
            setPetCardSettingId(settingId);
            setVisibleFields({
              petName: data.petName,
              breedName: data.breedName,
              sex: data.sex,
              age: data.age,
              weight: data.weight,
              mobilePhone1: data.mobilePhone1,
              mobilePhone2: data.mobilePhone2,
              address: data.address,
              alternativeContact: data.alternativeContact,
            });
          }
        })
        .catch((error) => console.error("Error loading pet card settings:", error));
    }
  }, [petDetails]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Toggle global edit mode. When turning off, save changes.
  const toggleGlobalEditMode = () => {
    if (globalEditMode && onSave) {
      onSave(form);
    }
    setGlobalEditMode(!globalEditMode);
  };

  // Toggle the inline visibility editing mode.
  // When turning editing mode off, update the backend with the current visibleFields.
  const toggleVisibilityEditing = async () => {
    const newEditingVisibility = !editingVisibility;
    setEditingVisibility(newEditingVisibility);
    if (!newEditingVisibility && petCardSettingId) {
      const payload = {
        petName: visibleFields.petName,
        breedName: visibleFields.breedName,
        sex: visibleFields.sex,
        age: visibleFields.age,
        weight: visibleFields.weight,
        mobilePhone1: visibleFields.mobilePhone1,
        mobilePhone2: visibleFields.mobilePhone2,
        address: visibleFields.address,
        alternativeContact: visibleFields.alternativeContact,
      };
      try {
        await updatePetCardSetting(petCardSettingId, payload);
      } catch (error) {
        console.error("Error updating pet card settings:", error);
      }
    }
  };

  const shouldRenderField = (field) => editingVisibility || visibleFields[field];

  const imageSrc = form.photo ? `data:image/jpeg;base64,${form.photo}` : null;

  return (
    <Section>
      {/* Header Section with visibility and edit buttons */}
      <Box
        sx={{
          position: "relative",
          textAlign: "center",
          padding: 3,
          background: "linear-gradient(90deg, #6fd3f5, #42a5f5)",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        }}
      >
        {!readOnly && (
          <Box sx={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 1 }}>
            <Tooltip title="Select the fields that are going to be visible." placement="top" enterTouchDelay={500}>
              <IconButton onClick={toggleVisibilityEditing}>
                <VisibilityIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title={globalEditMode ? "Save changes" : "Edit details"} placement="top" enterTouchDelay={500}>
              <IconButton onClick={toggleGlobalEditMode}>
                {globalEditMode ? <SaveIcon sx={{ color: "white" }} /> : <EditIcon sx={{ color: "white" }} />}
              </IconButton>
            </Tooltip>
          </Box>
        )}
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
        {/* Pet Name */}
        {shouldRenderField("petName") && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2, color: "var(--text-color)" }}>
              {globalEditMode ? (
                <InputBase
                  name="petName"
                  value={form.petName || ""}
                  onChange={handleInputChange}
                  sx={{
                    fontSize: "1.5rem",
                    textAlign: "center",
                    borderBottom: "2px solid var(--text-color)",
                    color: "var(--text-color)",
                  }}
                />
              ) : (
                form.petName || "Unnamed Pet"
              )}
            </Typography>
            {editingVisibility && (
              <Checkbox
                icon={
                  <RadioButtonUncheckedIcon
                    sx={{ fontSize: 24, transition: "all 0.3s ease" }}
                  />
                }
                checkedIcon={
                  <CheckCircleIcon sx={{ fontSize: 24, transition: "all 0.3s ease" }} />
                }
                checked={visibleFields.petName}
                onChange={(e) =>
                  setVisibleFields((prev) => ({ ...prev, petName: e.target.checked }))
                }
                sx={{
                  color: "var(--text-color)",
                  "&.Mui-checked": { color: "var(--text-color)" },
                }}
              />
            )}
          </Box>
        )}
        {/* Breed Name */}
        {shouldRenderField("breedName") && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography variant="subtitle1" sx={{ fontStyle: "italic", color: "var(--text-color)" }}>
              {form.breedName || "Unknown Breed"}
            </Typography>
            {editingVisibility && (
              <Checkbox
                icon={
                  <RadioButtonUncheckedIcon
                    sx={{ fontSize: 24, transition: "all 0.3s ease" }}
                  />
                }
                checkedIcon={
                  <CheckCircleIcon sx={{ fontSize: 24, transition: "all 0.3s ease" }} />
                }
                checked={visibleFields.breedName}
                onChange={(e) =>
                  setVisibleFields((prev) => ({ ...prev, breedName: e.target.checked }))
                }
                sx={{
                  color: "var(--text-color)",
                  "&.Mui-checked": { color: "var(--text-color)" },
                }}
              />
            )}
          </Box>
        )}
      </Box>

      {/* Stats Section */}
      <Box sx={{ mt: 4 }}>
        <Grid container spacing={2} justifyContent="center">
          {[
            { label: "Sex", name: "sex", value: form.sex, color: "#ffc107" },
            { label: "Age", name: "age", value: form.age, color: "#28a745" },
            { label: "Weight", name: "weight", value: form.weight || "N/A", color: "#17a2b8" },
          ].map((stat, index) =>
            shouldRenderField(stat.name) ? (
              <Grid item xs={4} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    backgroundColor: stat.color,
                    color: "var(--text-color)",
                    padding: 2,
                    borderRadius: 3,
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <PetsIcon sx={{ mb: 1, fontSize: 30 }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: "bold", color: "var(--text-color)" }}>
                    {stat.label}
                  </Typography>
                  {globalEditMode ? (
                    <InputBase
                      name={stat.name}
                      value={form[stat.name]}
                      onChange={handleInputChange}
                      sx={{
                        color: "var(--text-color)",
                        borderBottom: "2px solid var(--text-color)",
                        textAlign: "center",
                        fontSize: "1rem",
                      }}
                    />
                  ) : (
                    <Typography sx={{ mt: 1, color: "var(--text-color)" }}>{stat.value}</Typography>
                  )}
                  {editingVisibility && (
                    <Checkbox
                      icon={
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: 24, transition: "all 0.3s ease", color: "var(--text-color)" }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleIcon sx={{ fontSize: 24, transition: "all 0.3s ease", color: "var(--text-color)" }} />
                      }
                      checked={visibleFields[stat.name]}
                      onChange={(e) =>
                        setVisibleFields((prev) => ({ ...prev, [stat.name]: e.target.checked }))
                      }
                      sx={{
                        color: "var(--text-color)",
                        "&.Mui-checked": { color: "var(--text-color)" },
                        mt: 1,
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>

      {/* Contact Information Section */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "var(--text-color)" }}>
          Contact Information
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {[
            { label: "Phone 1", name: "mobilePhone1", value: form.mobilePhone1, icon: <PhoneIcon /> },
            { label: "Phone 2", name: "mobilePhone2", value: form.mobilePhone2 || "N/A", icon: <PhoneIcon /> },
            { label: "Address", name: "address", value: form.address || "N/A", icon: <HomeIcon /> },
            {
              label: "Alternative Contact",
              name: "alternativeContact",
              value: `${form.alternativeContactName || "N/A"} - ${form.alternativeContactPhone || "N/A"}`,
              icon: <ContactPhoneIcon />,
            },
          ].map((contact, index) =>
            shouldRenderField(contact.name) ? (
              <Grid item xs={12} sm={6} key={index}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 2,
                    padding: 2,
                    background: "rgba(255, 255, 255, 0.1)",
                    borderRadius: 3,
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box sx={{ color: "#6fd3f5" }}>{contact.icon}</Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: "bold", color: "var(--text-color)" }}>
                        {contact.label}
                      </Typography>
                      {globalEditMode ? (
                        <InputBase
                          name={contact.name}
                          value={form[contact.name]}
                          onChange={handleInputChange}
                          sx={{
                            color: "var(--text-color)",
                            borderBottom: "2px solid var(--text-color)",
                            fontSize: "1rem",
                          }}
                        />
                      ) : (
                        <Typography variant="body2" sx={{ color: "var(--text-color)" }}>
                          {contact.value}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                  {editingVisibility && (
                    <Checkbox
                      icon={
                        <RadioButtonUncheckedIcon
                          sx={{ fontSize: 24, transition: "all 0.3s ease", color: "var(--text-color)" }}
                        />
                      }
                      checkedIcon={
                        <CheckCircleIcon sx={{ fontSize: 24, transition: "all 0.3s ease", color: "var(--text-color)" }} />
                      }
                      checked={visibleFields[contact.name]}
                      onChange={(e) =>
                        setVisibleFields((prev) => ({ ...prev, [contact.name]: e.target.checked }))
                      }
                      sx={{
                        color: "var(--text-color)",
                        "&.Mui-checked": { color: "var(--text-color)" },
                      }}
                    />
                  )}
                </Box>
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
    </Section>
  );
};

export default PetCard;