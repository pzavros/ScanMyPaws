import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatComponent from "../components/Chat/ChatComponent";
import Page from "../components/ReusableComponents/Page";

const ChatPage = () => {
  const navigate = useNavigate();
  const [chatSessionId, setChatSessionId] = useState(null);

  useEffect(() => {
    const storedSessionId = sessionStorage.getItem("chatSessionId");
    if (!storedSessionId) {
      alert("No active chat session found.");
      navigate(-1);
    } else {
      setChatSessionId(storedSessionId);
    }
  }, []);

  if (!chatSessionId) return <div>Loading...</div>;

  return (
    <Page>
      <ChatComponent sessionId={chatSessionId} />
    </Page>
  );
};

export default ChatPage;
