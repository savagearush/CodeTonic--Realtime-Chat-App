import React, { createContext, useEffect, useMemo, useState } from "react";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [currentChat, setCurrentChat] = useState({ chatId: null, user: {} });

  useEffect(() => {
    console.log("CurrentChat : ", currentChat);
  }, [currentChat.chatId, currentChat.user]);

  return (
    <ChatContext.Provider value={{ currentChat, setCurrentChat }}>
      {children}
    </ChatContext.Provider>
  );
};
