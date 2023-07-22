import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { ChatContext } from "../context/ChatContext.jsx";

const Login = () => {
  const { setCurrentChat } = useContext(ChatContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentChat({ chatId: null, user: {} });
        navigate("/");
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <h2 className="title">ChatTonic - Chating App</h2>
        <div className="subTitle">Login your Account</div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="Email Id" />
          <input type="password" placeholder="Password" />

          <button type="submit" className="submitBtn" id="loginBtn">
            Login
          </button>
          {error && <p>Email or Password is incorrect !!</p>}
          <p>
            Don't have an account ? <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
