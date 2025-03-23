import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import Select from "react-select";
import Section from "../ReusableComponents/Section";
import { fetchPetDetails, updatePetDetails, fetchDogBreeds } from "./api";
import Button from "../ReusableComponents/Button";
import EditIcon from "@mui/icons-material/Edit";
import PetsIcon from "@mui/icons-material/Pets";

const PetDetails = () => {
  const { petId } = useParams();
  console.log("Pet ID from URL:", petId);
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
          weight: petDetails.weight || "",
          size: petDetails.size || ""
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
      payload.append("Weight", form.weight);
      payload.append("Size", form.size);
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          mb: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
            gap: 2,
          }}
        >
          {/* Back to Pet List Button */}
          <Button
            onClick={() => navigate("/pets")}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "20px",
              padding: "6px 10px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              flex: 1,
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
          >
            Back
          </Button>

          {/* Create or View Pet Card Button */}
          <Button
            onClick={() =>
              pet?.isHavingCard
                ? navigate(`/petcard/${petId}`)
                : navigate(`/createpetcard/${petId}`)
            }
            sx={{
              background: pet?.isHavingCard
                ? "linear-gradient(90deg, #4caf50, #81c784)"
                : "linear-gradient(90deg, #ff6f61, #ff9671)",
              color: "white",
              borderRadius: "28px",
              padding: "8px 12px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.15)",
              flex: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              "&:hover": {
                background: pet?.isHavingCard
                  ? "linear-gradient(90deg, #81c784, #4caf50)"
                  : "linear-gradient(90deg, #ff9671, #ff6f61)",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <PetsIcon sx={{ fontSize: "1.1rem" }} />
            {pet?.isHavingCard ? "View Card" : "Create Card"}
          </Button>

          {/* Edit Button */}
          <Button
            onClick={handleEditToggle}
            sx={{
              backgroundColor: "var(--primary-color)",
              color: "white",
              borderRadius: "20px",
              padding: "6px 10px",
              fontSize: "0.75rem",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              "&:hover": {
                backgroundColor: "var(--secondary-color)",
              },
            }}
          >
            <EditIcon sx={{ fontSize: "1.1rem" }} />
            Edit
          </Button>
        </Box>

        {/* Explanation Text for Create Pet Card */}
        {!pet?.isHavingCard && (
          <Typography
            variant="body2"
            sx={{
              color: "var(--text-color-secondary)",
              textAlign: "center",
              maxWidth: "90%",
              fontSize: "0.75rem",
              marginTop: "8px",
            }}
          >
            Tap "Create Card" to generate a QR code for your pet. This card helps others return your pet if it's lost.
          </Typography>
        )}
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
                    zIndex: 10,
                  }),
                  menuPortal: (base) => ({
                    ...base,
                    zIndex: 9999,
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
                menuPortalTarget={document.body}
              />
              <TextField
                label="Weight (kg)"
                name="weight"
                value={form.weight}
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
                sx={{ mb: 1, color: "var(--text-color)" }}
              >
                Select Pet Size
              </Typography>
              <Select
                options={[
                  { value: "Small", label: "Small" },
                  { value: "Medium", label: "Medium" },
                  { value: "Large", label: "Large" }
                ]}
                value={form.size ? { value: form.size, label: form.size } : null}
                onChange={(selectedOption) =>
                  setForm((prev) => ({ ...prev, size: selectedOption?.value || "" }))
                }
                placeholder="Select Pet Size"
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "var(--input-background)",
                    borderRadius: "8px",
                    marginBottom: "16px",
                  }),
                  singleValue: (base) => ({ ...base, color: "white" }),
                  menu: (base) => ({ ...base, backgroundColor: "var(--input-background)", zIndex: 10 }),
                  option: (base, state) => ({
                    ...base,
                    color: state.isSelected ? "var(--primary-color)" : "white",
                    backgroundColor: state.isSelected ? "var(--secondary-color)" : "var(--input-background)",
                    "&:hover": {
                      backgroundColor: "var(--primary-color-hover)",
                    },
                  }),
                  placeholder: (base) => ({ ...base, color: "var(--text-color-secondary)" }),
                }}
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
                  mt: 2,
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
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  Weight: {pet.weight ? `${pet.weight} kg` : "N/A"}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" sx={{ color: "var(--text-color)" }}>
                  Size: {pet.size || "N/A"}
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
