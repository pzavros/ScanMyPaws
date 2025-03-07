import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchChatMessages = async (sessionId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/chat/messages/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching chat messages:", error);
      throw error;
    }
  };
  
  export const sendMessage = async (sessionId, messageData) => {
    console.log("API Sending Data:", { sessionId, messageData }); // Debugging

    try {
        const response = await axios.post(
            `${API_BASE_URL}/api/chat/send/${sessionId}`,
            messageData,
            { headers: { "Content-Type": "application/json" } } // Ensure JSON format
        );
        return response.data;
    } catch (error) {
        console.error("Error sending message:", error.response?.data || error.message);
        throw error;
    }
};


  