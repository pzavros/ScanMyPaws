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

export const sendMessage = async (sessionId, messageContent, senderId) => {
  const payload = {
    senderId,
    messageContent,
  };

  const response = await axios.post(
    `${API_BASE_URL}/api/chat/send/${sessionId}`,
    payload
  );

  return response.data;
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

export const markMessagesAsRead = async (sessionId) => {
  try {
    await axios.post(
      `${API_BASE_URL}/api/chat/mark-read/${sessionId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(`Marked messages as read for session ${sessionId}`);
  } catch (error) {
    console.error("Error marking messages as read:", error.response?.data || error.message);
  }
};

// Existing: for the Finder (anonymous user)
export const sendFinderMessage = async (sessionId, messageContent, senderId) => {
  const payload = {
    senderId,       // ephemeral ID for the finder
    messageContent,
  };

  // No Authorization header, because finder is anonymous
  const response = await axios.post(
    `${API_BASE_URL}/api/chat/send/${sessionId}`,
    payload
  );
  return response.data;
};

// New: for the Owner (logged in)
export const sendOwnerMessage = async (sessionId, messageContent) => {
  const payload = {
    // No senderId in the body; the controller will set it from the token
    messageContent,
  };

  const response = await axios.post(
    `${API_BASE_URL}/api/chat/send/${sessionId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Must have token
      },
    }
  );

  return response.data;
};


export const deleteChatSession = async (sessionId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/api/chat/sessions/${sessionId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting chat session:", error);
    throw error;
  }
};

