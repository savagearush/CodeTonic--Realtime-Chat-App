import Avatar from "../assets/avatar.jpg";
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import DuoIcon from "@mui/icons-material/Duo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Messages from "./Messages.jsx";
import Inputs from "./Inputs";
import { useContext, useEffect, useRef, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../../firebase.js";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";

const Chats = ({ element }) => {
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const messageRef = useRef();
  useEffect(() => {
    const unsub = onSnapshot(doc(db, "users", currentChat.user.uid), (doc) => {
      doc.exists() && setOnlineStatus(doc.data().onlineStatus);
    });

    if (messageRef.current) {
      messageRef.current.style.display = "";
      document.getElementsByClassName("leftSidebar")[0].style.display = "none";
    }

    return () => {
      unsub();
    };
  }, [currentChat, onlineStatus]);

  window.onresize = (e) => {
    setWindowWidth((prev) => e.target.innerWidth);
  };

  const handleSideBar = () => {
    document.getElementsByClassName("leftSidebar")[0].style.display = "";
    messageRef.current.style.display = "none";
  };

  if (windowWidth >= 1000) {
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
  } else {
    return currentChat.chatId !== null ? (
      <div className="messages" ref={messageRef}>
        <div className="header">
          <AlignHorizontalLeftIcon onClick={() => handleSideBar()} />
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
            {/* <AddIcCallIcon className="icons" /> */}
            {/* <DuoIcon className="icons" /> */}
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
  }
};

export default Chats;
