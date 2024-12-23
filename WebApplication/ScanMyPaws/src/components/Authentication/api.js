import axios from "axios";

// Use Vite's `import.meta.env` for environment variables
const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

// Sign Up API Call
// Update signUpUser to use the correct endpoint
export const signUpUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}/api/User/register`, userData);
    return response.data;
};


// Sign In API Call
export const signInUser = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/api/User/login`, { email, passwordHash: password });
    localStorage.setItem("token", response.data.token); // Store token securely
    return response.data; // Return full user data if needed
  };
  

// Authorization Header Helper
const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

// Fetch User Profile
export const fetchUserProfile = async () => {
    const response = await axios.get(`${API_BASE_URL}/api/User/profile`, getAuthHeader());
    return response.data;
};

// Update User Profile
export const updateUserProfile = async (profileData) => {
    const response = await axios.put(`${API_BASE_URL}/api/User/profile`, profileData, getAuthHeader());
    return response.data;
};

// Check if User is Logged In
export const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token; // Returns true if a token exists
};
