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
    const [images, setImages] = useState([]); // Store the selected images
    const [imagePreviews, setImagePreviews] = useState([]); // Store the image previews
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
        const files = Array.from(e.target.files);

        if (images.length + files.length > 5) {
            setError("You can upload up to 5 images.");
            return;
        }

        setError("");
        setImages((prev) => [...prev, ...files]);

        // Generate image previews
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setImagePreviews((prev) => [...prev, ...newPreviews]);
    };

    const handleRemoveImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
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
            images.forEach((image, index) => formData.append(`photos[${index}]`, image)); // Append all images
            formData.append("qrCodeId", qrCodeId);

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
                            backgroundColor: "var(--input-background)", // Matches input background
                            color: "var(--text-color)", // Text color for input
                            borderColor: state.isFocused ? "var(--primary-color)" : "var(--input-border-color)",
                            boxShadow: state.isFocused ? "0 0 0 2px var(--primary-color)" : "none",
                            "&:hover": { borderColor: "var(--primary-color-hover)" },
                            borderRadius: "8px",
                            padding: "4px",
                        }),
                        menu: (provided) => ({
                            ...provided,
                            backgroundColor: "var(--input-background)", // Matches input background
                            color: "var(--text-color)", // Text color inside dropdown
                            zIndex: 9999,
                            borderRadius: "8px",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        }),
                        menuList: (provided) => ({
                            ...provided,
                            backgroundColor: "var(--input-background)", // Matches input background
                            color: "var(--text-color)", // Text color for options
                            maxHeight: "200px",
                            overflowY: "auto", // Scrollable options
                        }),
                        option: (provided, state) => ({
                            ...provided,
                            backgroundColor: state.isFocused ? "var(--primary-color)" : "var(--input-background)", // Highlight focused option
                            color: state.isFocused ? "white" : "var(--text-color)", // Adjust text color for dark mode
                            padding: "8px",
                            "&:hover": { backgroundColor: "var(--primary-color-hover)", color: "white" }, // Hover styles
                        }),
                        placeholder: (provided) => ({
                            ...provided,
                            color: "var(--text-color-secondary)", // Placeholder text color
                        }),
                        singleValue: (provided) => ({
                            ...provided,
                            color: "var(--text-color)", // Selected value color
                        }),
                        input: (provided) => ({
                            ...provided,
                            color: "var(--text-color)", // Text color for typing in the search field
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
                Upload Photos (Up to 5)
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
                    multiple
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                    id="photoUpload"
                />
                <label htmlFor="photoUpload" style={{ cursor: "pointer", color: "var(--text-color)" }}>
                    {images.length > 0 ? "Add More Images" : "Click to upload or drag and drop images here"}
                </label>
            </Box>

            {/* Image Previews */}
            <Grid container spacing={2} sx={{ mb: 3 }}>
                {imagePreviews.map((preview, index) => (
                    <Grid item xs={4} key={index}>
                        <Box sx={{ position: "relative" }}>
                            <img
                                src={preview}
                                alt={`Preview ${index}`}
                                style={{
                                    width: "100%",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                }}
                            />
                            <Button
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={() => handleRemoveImage(index)}
                                sx={{
                                    position: "absolute",
                                    top: "4px",
                                    right: "4px",
                                    minWidth: "24px",
                                    height: "24px",
                                    padding: "0",
                                    fontSize: "12px",
                                }}
                            >
                                X
                            </Button>
                        </Box>
                    </Grid>
                ))}
            </Grid>

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
                    backgroundColor: "var(--primary-color)",
                    "&:hover": { backgroundColor: "var(--secondary-color)" },
                }}
            >
                Submit
            </Button>
        </Section>
    );
};

export default PetProfileForm;
