import Avatar from "../assets/avatar.jpg";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DuoIcon from "@mui/icons-material/Duo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages.jsx";
import Inputs from "./Inputs";
import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase.js";
const Chats = () => {
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [onlineStatus, setOnlineStatus] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentChat.user.uid), (doc) => {
      doc.exists() && setOnlineStatus(doc.data().onlineStatus);
    });

    return () => {
      unsub();
    };
  }, [currentChat.chatId, onlineStatus]);

  return currentChat.chatId !== null ? (
    <div className="messages">
      <div className="header">
        <div className="active-userInfo">
          <div className="avatar">
            <img
              src={currentChat.user.profilePic}
              width={35}
              height={35}
              alt=""
            />
            {onlineStatus ? <div className="user-live-status"></div> : ""}
          </div>
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
