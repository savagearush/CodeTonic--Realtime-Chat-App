import "./home.css";
import Chats from "../components/Chats";
import LeftSidebar from "../components/LeftSidebar";
import { useContext } from "react";

import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="homeContainer">
      <div className="homeWrapper">
        <LeftSidebar />
        {currentChat.chatId !== null ? <Chats /> : <UnSelectedSideBar />}
      </div>
    </div>
  );
};

const UnSelectedSideBar = () => {
  return (
    <div className="messages">
      <div className="main">
        <h1>  CodeTonic - Chatting App</h1>
        <div> Connect With Your friends Easily 🚀</div>
      </div>
    </div>
  );
};

export default Home;
