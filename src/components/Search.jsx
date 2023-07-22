import { useContext, useState } from "react";
import { db } from "../../firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc,
  arrayUnion,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext.jsx";

const Search = () => {
  const [fullname, setFullName] = useState("");
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const q = query(collection(db, "users"), where("fullName", "==", fullname));

  const handleSearch = async () => {
    const querySnapshot = await getDocs(q);
    const allUsers = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      allUsers.push(doc.data());
    });
    setUsers(allUsers);
  };

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //Add user in userChat
        //create user chats

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            fullName: user.fullName,
            profilePic: user.profilePic,
          },
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            fullName: currentUser.displayName,
            profilePic: currentUser.photoURL,
          },
        });
      }
    } catch (err) {
      console.log(err);
    }

    setUsers([]);
    setFullName("");
  };

  return (
    <div className="search">
      <input
        type="search"
        className="searchInput"
        placeholder="Search chat here..."
        value={fullname}
        onKeyDown={(e) => handleKey(e)}
        onChange={(e) => setFullName(e.target.value)}
      />
      {users && (
        <div className="userSearchResult">
          {users?.map((user) => {
            return (
              <span
                className="userCard"
                key={user.uid}
                onClick={() => handleSelect(user)}
                id={user.uid}
              >
                <img
                  src={user.profilePic}
                  width={40}
                  height={40}
                  className="profilePic"
                />
                <div className="userData">
                  <div className="userName" style={{ fontWeight: "bolder" }}>
                    {user.fullName}
                  </div>
                </div>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
