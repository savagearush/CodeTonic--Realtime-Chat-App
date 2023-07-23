import { createContext, useEffect, useState } from "react";
import { auth } from "../../firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { db } from "../../firebase.js";
import { updateDoc, doc } from "firebase/firestore";
export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          onlineStatus: true,
        });
      }
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
