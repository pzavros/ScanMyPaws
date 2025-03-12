import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchChatMessages = async (sessionId) => {
  try {
    console.log("Fetching messages for session ID:", sessionId);
    const response = await axios.get(`${API_BASE_URL}/api/chat/messages/${sessionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    throw error;
  }
};


export const sendMessage = async (sessionId, messageData) => {
  console.log("Sending message to session ID:", sessionId, "with data:", messageData);

  try {
    const response = await axios.post(
      `${API_BASE_URL}/api/chat/send/${sessionId}`,
      messageData,
      { headers: { "Content-Type": "application/json" } }
    );
    return response.data;
  } catch (error) {
    console.error("Error sending message:", error.response?.data || error.message);
    throw error;
  }
};





export const createChatSession = async (payload) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/chat/session`, payload);
    console.log("API Response:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("Error creating chat session:", error.response?.data || error.message);
    throw error;
  }
};
