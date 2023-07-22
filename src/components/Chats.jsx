import Avatar from "../assets/avatar.jpg";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DuoIcon from "@mui/icons-material/Duo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages.jsx";
import Inputs from "./Inputs";
import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const Chats = () => {
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  return currentChat.chatId !== null ? (
    <div className="messages">
      <div className="header">
        <div className="active-userInfo">
          <img
            src={currentChat.user.profilePic}
            width={30}
            height={30}
            alt=""
          />
          {currentChat.user.fullName}
        </div>
        <div className="features">
          <AddIcCallIcon className="icons" />
          <DuoIcon className="icons" />
          <MoreHorizIcon className="icons" />
        </div>
      </div>
      <div className="live-messages">
        <Messages />
      </div>
      <div className="footer">
        <Inputs />
      </div>
    </div>
  ) : (
    "Select Chat"
  );
};

export default Chats;
