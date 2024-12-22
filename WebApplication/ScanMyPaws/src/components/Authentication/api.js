import axios from "axios";

const API_BASE_URL = "https://localhost:44330/api/User";

// Sign Up API Call
export const signUpUser = async (userData) => {
    const response = await axios.post(`${API_BASE_URL}`, userData);
    return response.data;
};

// Sign In API Call
export const signInUser = async (email, password) => {
    const response = await axios.post(`${API_BASE_URL}/login`, { email, passwordHash: password });
    localStorage.setItem("token", response.data.token); // Store token in local storage
    return response.data.user;
};

const getAuthHeader = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
});

export const fetchUserProfile = async () => {
    const response = await axios.get(`${API_BASE_URL}/profile`, getAuthHeader());
    return response.data;
};

export const updateUserProfile = async (profileData) => {
    const response = await axios.put(`${API_BASE_URL}/profile`, profileData, getAuthHeader());
    return response.data;
};

export const isLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token; // Returns true if a token exists
};
