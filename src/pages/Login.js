import "../pages/css/login.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errorMessage, setUserMessage] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    setUserMessage("");
    try {
      const user = {
        email: email,
        password: password,
      };

      // const response = await axios.post("https://vinted-clone-back.herokuapp.com/user/login", user);
      const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login", user);

      const token = response.data.token;
      if (token) {
        Cookies.set("token", token);
        setToken(token);
        navigate("/publish");
      }
    } catch (error) {
      if (error.response.data.message === "User not found") {
        setUserMessage("Utilisateur inconnue");
      } else if (error.response.data.message === "Unauthorized") {
        setUserMessage("Votre email ou mot de passe incorect");
      } else {
        console.log(error.response.data.message);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <section className="login">
      <div className="login-container">
        <h2>Se Connnecter</h2>

        <form
          onSubmit={(event) => {
            submitHandler(event);
          }}
        >
          <input
            type="email"
            placeholder="Email"
            onChange={(event) => {
              const value = event.target.value;
              setEmail(value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => {
              const value = event.target.value;
              setPasword(value);
            }}
          />

          <input type="submit" className="submit" />
          <Link to="/signup">
            <span>Pas encore de compte ? Inscris-toi !</span>
          </Link>
        </form>

        <p className="error-message">{errorMessage}</p>
      </div>
    </section>
  );
};

export default Login;
