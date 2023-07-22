import { useState } from "react";
import AddImage from "../assets/addImage.png";
import { auth, db, storage } from "../../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {
  const [err, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const profilePic = e.target[3].files[0];

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        const storageRef = ref(storage, user.uid + profilePic.name);

        await uploadBytesResumable(storageRef, profilePic).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // update Other Details
              await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                fullName,
                email,
                profilePic: downloadURL,
              });

              await updateProfile(user, {
                displayName: fullName,
                photoURL: downloadURL,
              });

              await setDoc(doc(db, "userChats", user.uid), {});
              navigate("/");
            } catch (err) {
              setError(err);
            }
          });
        });

        console.log(user);
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="title">ChatTonic - Chating App</h2>
        <div className="subTitle">Register your Account</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Full Name" required />
          <input type="text" placeholder="Email Id" required />
          <input type="password" placeholder="Password" required />
          <input
            type="file"
            style={{ display: "none" }}
            id="profilePic"
            placeholder="Password"
            required
          />
          <label htmlFor="profilePic">
            <img src={AddImage} width="20" height="20" />
            Add Profile Image
          </label>
          <button type="submit" className="submitBtn" id="registerBtn">
            Register
          </button>
          {err && <p>{err.message}</p>}
          <p>
            already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
