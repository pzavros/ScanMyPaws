import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import Select from "react-select";
import Section from "../ReusableComponents/Section";
import { fetchPetDetails, updatePetDetails, fetchDogBreeds } from "./api";
import Button from "../ReusableComponents/Button";

const PetDetails = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [breeds, setBreeds] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!petId) {
          console.error("No petId provided in the URL.");
          return;
        }

        const petDetails = await fetchPetDetails(petId);
        setPet(petDetails);
        setForm({
          ...petDetails,
          breed: petDetails.breedID,
        });
        setImagePreview(
          petDetails.photo ? `data:image/jpeg;base64,${petDetails.photo}` : null
        );

        const breedData = await fetchDogBreeds();
        setBreeds(
          breedData.map((breed) => ({
            value: breed.breedID,
            label: breed.breedName,
          }))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [petId]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSelectChange = (selectedOption) => {
    setForm({ ...form, breed: selectedOption?.value || null });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, photo: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = new FormData();
      payload.append("PetName", form.petName);
      payload.append("Age", form.age);
      payload.append("BreedID", form.breed);
      payload.append("Sex", form.sex);
      payload.append("SpecialNotes", form.specialNotes);

      if (form.photo instanceof File) {
        payload.append("Photo", form.photo);
      }

      const updatedPet = await updatePetDetails(petId, payload);
      setPet(updatedPet);
      setForm({
        ...updatedPet,
        breed: updatedPet.breedID,
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating pet details:", error);
    }
  };

  if (!pet) {
    return (
      <Section>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", mt: 4, color: "var(--primary-color)" }}
        >
          Loading pet details...
        </Typography>
      </Section>
    );
  }

  return (
    <Section>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Button
          onClick={() => navigate("/pets")}
          sx={{
            backgroundColor: "var(--primary-color)",
            color: "white",
            borderRadius: "24px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "var(--secondary-color)",
            },
          }}
        >
          Back to Pet List
        </Button>
        <Button
          onClick={handleEditToggle}
          sx={{
            backgroundColor: isEditing
              ? "var(--secondary-color)"
              : "var(--primary-color)",
            color: "white",
            borderRadius: "24px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: isEditing
                ? "var(--secondary-color)"
                : "var(--secondary-color)",
            },
          }}
        >
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </Box>

      <Card
        sx={{
          maxWidth: 800,
          margin: "0 auto",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          backgroundColor: "var(--card-background)",
        }}
      >
        {imagePreview && (
          <Box
            sx={{
              position: "relative",
              cursor: isEditing ? "pointer" : "default",
              "&:hover": isEditing
                ? { opacity: 0.8, transition: "opacity 0.3s ease-in-out" }
                : {},
            }}
            onClick={() => {
              if (isEditing) {
                document.getElementById("imageUpload").click();
              }
            }}
          >
            <Box
              component="img"
              src={imagePreview}
              alt="Pet"
              sx={{
                width: "100%",
                maxHeight: "400px",
                objectFit: "cover",
                borderBottom: "1px solid var(--input-border-color)",
              }}
            />
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
            {isEditing && (
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  color: "white",
                  textAlign: "center",
                  padding: "8px 0",
                  fontSize: "14px",
                }}
              >
                Click to Replace Image
              </Box>
            )}
          </Box>
        )}

        <CardContent sx={{ padding: "24px" }}>
          {isEditing ? (
            <Box>
              <TextField
                label="Pet Name"
                name="petName"
                value={form.petName}
                onChange={handleInputChange}
                fullWidth
                sx={{
                  mb: 2,
                  backgroundColor: "var(--input-background)",
                  borderRadius: "8px",
                  input: { color: "var(--text-color)" },
                  label: { color: "var(--text-color)" },
                }}
              />
              <TextField
                label="Age"
                name="age"
                value={form.age}
                onChange={handleInputChange}
                fullWidth
                type="number"
                sx={{
                  mb: 2,
                  backgroundColor: "var(--input-background)",
                  borderRadius: "8px",
                  input: { color: "var(--text-color)" },
                  label: { color: "var(--text-color)" },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  mb: 1,
                  color: "var(--text-color)"
                }}
              >
                Breed
              </Typography>
              <Select
                options={breeds}
                value={breeds.find((breed) => breed.value === form.breed) || null}
                onChange={handleSelectChange}
                placeholder="Select Breed"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "var(--input-background)",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "white",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "var(--input-background)",
                    zIndex: 10, // Ensure dropdown menu appears on top
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999, // Extra high z-index for absolute positioning
                  }),
                  option: (base, state) => ({
                    ...base,
                    color: state.isSelected ? "var(--primary-color)" : "white",
                    backgroundColor: state.isSelected
                      ? "var(--secondary-color)"
                      : "var(--input-background)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-hover)",
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "var(--text-color-secondary)",
                  }),
                }}
                menuPortalTarget={document.body} // Ensures dropdown is appended to the body
              />

              <TextField
                label="Special Notes"
                name="specialNotes"
                value={form.specialNotes}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                sx={{
                  mt: 2, // Added spacing
                  mb: 2,
                  backgroundColor: "var(--input-background)",
                  borderRadius: "8px",
                  textarea: { color: "var(--text-color)" },
                  label: { color: "var(--text-color)" },
                }}
              />
              <Button
                onClick={handleUpdate}
                sx={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  borderRadius: "24px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  "&:hover": { backgroundColor: "var(--primary-color-hover)" },
                }}
              >
                Save Changes
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography
                variant="h4"
                sx={{ mb: 3, fontWeight: "bold", color: "var(--primary-color)" }}
              >
                {pet.petName}
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  Age: {pet.age || "N/A"}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  Breed: {pet.breedName || "N/A"}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  Sex: {pet.sex || "N/A"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  Special Notes:
                </Typography>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  {pet.specialNotes || "No special notes provided."}
                </Typography>
              </Box>
            </Box>
          )}
        </CardContent>
      </Card>
    </Section>
  );
};

export default PetDetails;
