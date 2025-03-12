import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchChatMessages = async (sessionId) => {
  try {
    console.log("Fetching messages for session ID:", sessionId);
    const response = await axios.get(`${API_BASE_URL}/api/chat/messages/${sessionId}`);

    if (!response.data.messages || response.data.messages.length === 0) {
      console.warn("No messages received from API.");
      return [];
    }

    return response.data.messages.map(msg => ({
      senderId: msg.senderId,
      messageContent: msg.messageContent,
      sentAt: msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString() : "Unknown",
    }));
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    return [];
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
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating chat session:", error.response?.data || error.message);
    throw error;
  }
};

export const fetchOwnerChatSessions = async () => {
  try {
    console.log("Fetching owner's chat sessions...");
    const response = await axios.get(`${API_BASE_URL}/api/chat/sessions/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log("Chat sessions received:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching owner's chat sessions:", error.response?.data || error.message);
    return [];
  }
};


export const fetchChatSessionByUserId = async (userId) => {
  try {
    console.log(`Fetching chat session for user ID: ${userId}`);
    const response = await axios.get(`${API_BASE_URL}/api/chat/sessions/${userId}`);

    if (!response.data || response.data.length === 0) {
      console.warn("No chat session found for this user.");
      return null;
    }

    return response.data[0]; 
  } catch (error) {
    console.error("Error fetching chat session by user ID:", error);
    return null;
  }
};


