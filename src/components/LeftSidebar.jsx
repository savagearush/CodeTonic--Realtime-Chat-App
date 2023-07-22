import { useRef } from "react";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import Search from "../components/Search";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.js";

const LeftSidebar = () => {
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
    console.log("Woking");

    const combinedId =
      user.uid > currentUser.uid
        ? user.uid + currentUser.uid
        : currentUser.uid + user.uid;

    setCurrentChat((prev) => ({ ...prev, chatId: combinedId, user }));
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
            const { userInfo } = data[1];
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
                  <div className="recentMsg">Thank you</div>
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
          <button className="signoutBtn" onClick={() => signOut(auth)}>
            Sign out
          </button>
        </span>
      </div>
    </div>
  );
};

export default LeftSidebar;
