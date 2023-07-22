import React, { useContext, useEffect, useRef } from "react";
import moment from "moment";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ data }) => {
  const { currentUser } = useContext(AuthContext);
  const { currentChat } = useContext(ChatContext);
  console.log(data);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  return (
    <div
      ref={ref}
      className={`message ${data.senderId === currentUser.uid && "owner"}`}
    >
      <img
        src={
          data.senderId === currentUser.uid
            ? currentUser.photoURL
            : currentChat.user.profilePic
        }
        alt="UserImage"
        width={40}
        height={40}
      />
      <div className="content">
        <div className="text">
          {data.content}{" "}
          <div className="msg-time">{moment(data.time.seconds).fromNow()}</div>
        </div>
        {data.img && (
          <img src={data.img} alt="content-img" className="content-img" />
        )}
      </div>
    </div>
  );
};

export default Message;
