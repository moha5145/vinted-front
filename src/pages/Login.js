import "../pages/css/login.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Input from "../components/Input";

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

      const response = await axios.post("https://vinted-clone-back.herokuapp.com/user/login", user);
      // const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/login", user);

      const token = response.data.token;
      if (token) {
        Cookies.set("token", token);
        setToken(token);
        navigate("/publish");
      }
    } catch (error) {
      console.log(error.response);
      if (error.response.data.error === "Acount not found") {
        setUserMessage("Utilisateur inconnue");
      } else if (error.response.data.message === "Unauthorized") {
        setUserMessage("Votre email ou mot de passe incorect");
      } else if (error.response.data.error === "password or email is not corect") {
        setUserMessage("Votre email ou mot de passe incorect");
      } else if (error.response.data.error === "All fields are required") {
        setUserMessage("Veuillez remplir tous les champs");
      } else {
        console.log(error.response);
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
          <Input type="email" placeholder="Email" value={email} setState={setEmail} />

          <Input type="password" placeholder="Password" value={password} setState={setPasword} />

          <input type="submit" className="submit" value="Se Connnecter" />
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
