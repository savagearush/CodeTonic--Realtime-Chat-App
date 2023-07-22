import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import Message from "./Message";

const Messages = () => {
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", currentChat.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unsub();
    };
  }, [currentChat.chatId]);

  console.log(messages);
  return messages?.map((message) => {
    return <Message data={message} />;
  });
};

export default Messages;
