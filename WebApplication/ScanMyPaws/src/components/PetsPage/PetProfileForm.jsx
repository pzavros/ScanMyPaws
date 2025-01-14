import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Alert, Grid } from "@mui/material";
import InputField from "../ReusableComponents/InputField";
import Section from "../ReusableComponents/Section";
import { createPetProfile, fetchDogBreeds } from "./api";
import Select from "react-select";

const PetProfileForm = ({ qrCodeId, onSuccess }) => {
    const [form, setForm] = useState({
        petName: "",
        breedId: null,
        age: "",
        sex: "",
        specialNotes: "",
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [breeds, setBreeds] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Fetch dog breeds
    useEffect(() => {
        const fetchBreeds = async () => {
            try {
                const data = await fetchDogBreeds();
                setBreeds(data.map((breed) => ({ value: breed.breedID, label: breed.breedName })));
            } catch (err) {
                console.error("Error fetching breeds:", err);
                setError("Failed to fetch dog breeds.");
            }
        };

        fetchBreeds();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (selectedOption) => {
        setForm((prev) => ({ ...prev, breedId: selectedOption?.value || null }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setError("");
        setImage(file);
        setImagePreview(URL.createObjectURL(file)); 
    };

    const handleRemoveImage = () => {
        setImage(null); 
        setImagePreview(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            // Prepare form data
            const formData = new FormData();
            formData.append("petName", form.petName);
            formData.append("breedId", form.breedId);
            formData.append("age", form.age);
            formData.append("sex", form.sex);
            formData.append("specialNotes", form.specialNotes);
            formData.append("qrCodeId", qrCodeId);

            if (image) {
                formData.append("Photo", image); 
            }

            // Call API with form data
            await createPetProfile(formData);
            setSuccess("Pet profile created successfully!");
            onSuccess();
        } catch (err) {
            setError(err.response?.data || "Failed to create pet profile.");
        }
    };

    return (
        <Section
            component="form"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            sx={{
                maxWidth: "500px",
                margin: "0 auto",
                padding: "24px",
                backgroundColor: "var(--card-background)",
                borderRadius: "16px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
        >
            <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold", mb: 3 }}>
                Add New Pet
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {/* Pet Name Field */}
            <InputField
                name="petName"
                label="Pet Name"
                value={form.petName}
                onChange={handleChange}
                required
                fullWidth
                sx={{
                    mb: 2,
                    input: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
                }}
            />

            {/* Breed Dropdown */}
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                Select Breed
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Select
                    options={breeds}
                    value={breeds.find((breed) => breed.value === form.breedId) || null}
                    onChange={handleSelectChange}
                    placeholder="Search Breeds"
                    isClearable
                    styles={{
                        control: (provided, state) => ({
                            ...provided,
                            backgroundColor: "var(--input-background)", 
                            color: "var(--text-color)",
                            borderColor: state.isFocused ? "var(--primary-color)" : "var(--input-border-color)",
                            boxShadow: state.isFocused ? "0 0 0 2px var(--primary-color)" : "none",
                            "&:hover": { borderColor: "var(--primary-color-hover)" },
                            borderRadius: "8px",
                            padding: "4px",
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: "var(--input-background)",
                            color: "var(--text-color)", 
                            borderRadius: "8px",
                            zIndex: 9999,
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? "var(--primary-color)" : "var(--input-background)",
                            color: state.isFocused ? "white" : "var(--text-color)",
                            padding: "8px",
                            "&:hover": { backgroundColor: "var(--primary-color-hover)", color: "white" },
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: "var(--text-color-secondary)",
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: "var(--text-color)",
                        }),
                    }}
                />
            </Box>

            {/* Age Field */}
            <InputField
                name="age"
                label="Age"
                type="number"
                value={form.age}
                onChange={handleChange}
                fullWidth
                sx={{
                    mb: 2,
                    input: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
                }}
            />

            {/* Sex Field */}
            <InputField
                name="sex"
                label="Sex"
                value={form.sex}
                onChange={handleChange}
                fullWidth
                sx={{
                    mb: 2,
                    input: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
                }}
            />

            {/* Photo Upload Field */}
            <Typography variant="body1" sx={{ mt: 2, mb: 1 }}>
                Upload Photo
            </Typography>
            <Box
                sx={{
                    mb: 3,
                    padding: "16px",
                    border: "2px dashed var(--input-border-color)",
                    borderRadius: "8px",
                    textAlign: "center",
                    backgroundColor: "var(--input-background)",
                    cursor: "pointer",
                    "&:hover": { borderColor: "var(--primary-color)" },
                }}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="photoUpload"
                />
                <label htmlFor="photoUpload" style={{ cursor: "pointer", color: "var(--text-color)" }}>
                    {imagePreview ? "Change Photo" : "Click to upload a photo"}
                </label>
            </Box>

            {/* Display the image preview if available */}
            {imagePreview && (
                <Box sx={{ position: "relative", textAlign: "center", mb: 3 }}>
                    <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                            width: "100%",
                            maxHeight: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                        }}
                    />
                    {/* Add the "X" button */}
                    <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={handleRemoveImage}
                        sx={{
                            position: "absolute",
                            top: "8px",
                            right: "8px",
                            minWidth: "24px",
                            height: "24px",
                            padding: "0",
                            borderRadius: "50%",
                            fontSize: "16px",
                            lineHeight: "1",
                        }}
                    >
                        &times;
                    </Button>
                </Box>
            )}

            {/* Special Notes Field */}
            <InputField
                name="specialNotes"
                label="Special Notes"
                multiline
                rows={3}
                value={form.specialNotes}
                onChange={handleChange}
                fullWidth
                sx={{
                    mb: 3,
                    textarea: { color: "var(--text-color)", backgroundColor: "var(--input-background)" },
                }}
            />

            {/* Submit Button */}
            <Button
                type="submit"
                variant="contained"
                sx={{
                    width: "100%",
                    fontSize: "1rem",
                    padding: "12px",
                    borderRadius: "8px",
                    background:
                      "linear-gradient(90deg, rgba(255,111,97,1) 0%, rgba(255,165,97,1) 100%)",
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                    borderRadius: "50px",
                    "&:hover": {
                      background:
                        "linear-gradient(90deg, rgba(255,165,97,1) 0%, rgba(255,111,97,1) 100%)",
                    },
                }}
            >
                Submit
            </Button>
        </Section>
    );
};

export default PetProfileForm;
