import { useRef } from "react";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebase.js";

const LeftSidebar = ({ element }) => {
  const { currentUser } = useContext(AuthContext);
  const { currentChat, setCurrentChat } = useContext(ChatContext);
  const [chats, setChats] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
      const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
      setChats(Object.entries(doc.data()));
    });

    return () => {
      unsub();
    };
  }, []);

  const currentChatElement = useRef();

  const handleSelect = (user) => {
    const combinedId =
      user.uid > currentUser.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;

    setCurrentChat((prev) => ({ ...prev, chatId: combinedId, user }));
  };

  const handleSignOut = async () => {
    signOut(auth);
    await updateDoc(doc(db, "users", currentUser.uid), {
      onlineStatus: false,
    });
  };

  return (
    <div className="leftSidebar">
      <div className="head">
        <span className="logo">CodeTonic - Chatting App</span>
      </div>
      <Search />
      <div className="users">
        {chats &&
          chats?.map((data) => {
            const { userInfo, lastMessage } = data[1];
            return (
              <span
                className="userCard"
                onClick={() => handleSelect(userInfo)}
                key={userInfo.uid}
                ref={currentChatElement}
              >
                <img
                  src={userInfo.profilePic}
                  width={40}
                  height={40}
                  className="profilePic"
                />
                <div className="userData">
                  <div className="userName" style={{ fontWeight: "bolder" }}>
                    {userInfo.fullName}
                  </div>
                  <div className="recentMsg">
                    {lastMessage ? lastMessage.content : ""}{" "}
                  </div>
                </div>
              </span>
            );
          })}
      </div>
      <div className="footer">
        <span className="userInfo">
          <img
            src={currentUser.photoURL}
            width={40}
            height={40}
            className="profilePic"
          />
          <span className="userName">{currentUser.displayName}</span>
          <button className="signoutBtn" onClick={() => handleSignOut()}>
            Sign out
          </button>
        </span>
      </div>
    </div>
  );
};

export default LeftSidebar;
