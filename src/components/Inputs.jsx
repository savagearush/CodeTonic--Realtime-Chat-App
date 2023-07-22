import React, { useContext, useState } from "react";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import SendIcon from "@mui/icons-material/Send";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";
import { arrayUnion, updateDoc, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { v4 as uuid } from "uuid";
import moment from "moment";

const Inputs = () => {
  const [content, setContent] = useState("");
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    await updateDoc(doc(db, "chats", currentChat.chatId), {
      messages: arrayUnion({
        id: uuid(),
        content,
        senderId: currentUser.uid,
        time: moment.now(),
      }),
    });

    setContent("");
  };

  return (
    <>
      <div className="inputs-level1">
        <FormatBoldIcon />
        <FormatItalicRoundedIcon />
        <StrikethroughSRoundedIcon />
        <AttachFileRoundedIcon />
        <FormatQuoteIcon />
      </div>
      <div className="inputs-level2">
        <textarea
          placeholder="Type here..."
          onChange={(e) => setContent(e.target.value)}
          value={content}
        ></textarea>
      </div>
      <div className="inputs-level3">
        <div>
          <EmojiEmotionsIcon />
          <AlternateEmailIcon />
        </div>
        <button className="sendBtn" onClick={() => handleSubmit()}>
          Send <SendIcon />
        </button>
      </div>
    </>
  );
};

export default Inputs;
