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
import {
  arrayUnion,
  updateDoc,
  doc,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import moment from "moment";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

const Inputs = () => {
  const [content, setContent] = useState("");
  const { currentChat } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    const photo = document.getElementById("photo");

    if (photo.files.length !== 0) {
      const storageRef = ref(storage, currentUser.uid + photo.files[0].name);
      await uploadBytesResumable(storageRef, photo.files[0]).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateDoc(doc(db, "chats", currentChat.chatId), {
              messages: arrayUnion({
                id: uuid(),
                content,
                senderId: currentUser.uid,
                img: downloadURL,
                time: moment.now(),
              }),
            });
          } catch (err) {}
        });
      });
    } else {
      await updateDoc(doc(db, "chats", currentChat.chatId), {
        messages: arrayUnion({
          id: uuid(),
          content,
          senderId: currentUser.uid,
          time: moment.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [currentChat.chatId + ".lastMessage"]: {
        content,
      },
      [currentChat.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", currentChat.user.uid), {
      [currentChat.chatId + ".lastMessage"]: {
        content,
      },
      [currentChat.chatId + ".date"]: serverTimestamp(),
    });

    setContent("");
    photo.value = "";
  };

  return (
    <>
      <div className="inputs-level1">
        <FormatBoldIcon />
        <FormatItalicRoundedIcon />
        <StrikethroughSRoundedIcon />
        <input
          type="file"
          style={{ display: "none" }}
          id="photo"
          placeholder="Password"
        />
        <label htmlFor="photo">
          <AttachFileRoundedIcon />
        </label>
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
