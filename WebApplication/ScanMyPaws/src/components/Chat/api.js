import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_BASE_URL;

export const fetchChatMessages = async (sessionId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chat/messages/${sessionId}`);

    if (!response.data.messages || response.data.messages.length === 0) {
      return [];
    }

    return response.data.messages.map(msg => ({
      senderId: msg.senderId,
      messageContent: msg.messageContent,
      sentAt: msg.sentAt ? new Date(msg.sentAt).toLocaleTimeString() : "Unknown",
    }));
  } catch (error) {
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
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchOwnerChatSessions = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chat/sessions/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return [];
  }
};


export const fetchChatSessionByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/chat/sessions/${userId}`);

    if (!response.data || response.data.length === 0) {
      return null;
    }

    return response.data[0];
  } catch (error) {
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
  } catch (error) {
    throw error;
  }
};

// Existing for the Finder (anonymous user)
export const sendFinderMessage = async (sessionId, messageContent, senderId) => {
  const payload = {
    senderId,  
    messageContent,
  };

  // No Authorization header, because finder is anonymous
  const response = await axios.post(
    `${API_BASE_URL}/api/chat/send/${sessionId}`,
    payload
  );
  return response.data;
};

// New for the Owner (logged in)
export const sendOwnerMessage = async (sessionId, messageContent) => {
  const payload = {
    messageContent,
  };

  const response = await axios.post(
    `${API_BASE_URL}/api/chat/send/${sessionId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
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
    throw error;
  }
};

