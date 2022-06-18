import "../pages/css/signup.scss";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";

const Signup = ({ setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [check, setCheck] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    setErrorMessage("");

    try {
      const user = {
        username: userName,
        email: email,
        password: password,
        check: check,
      };

      // const response = await axios.post("http://localhost:4000/user/signup", user);
      // const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup", user);
      const response = await axios.post("https://vinted-clone-back.herokuapp.com/user/signup", user);

      const token = response.data.token;
      if (token) {
        Cookies.set("token", token);
        setToken(token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.error === "All fields are required") {
        setErrorMessage("Veuillez remplir tous les champs");
      }
      if (error.response.data.error === "email already exist") {
        setErrorMessage("Un compte avec ce mail mail exisit");
      } else if (error.response.data.message === "This email already has an account") {
        setErrorMessage("Un compte avec ce mail mail exisit");
      } else {
        console.log("catch", error.response);
      }
    }
  };

  const handelSumit = (event) => {
    event.preventDefault();
    fetchData();
  };
  return (
    <section className="sign-up">
      <div className="signup-container">
        <h2>S'inscrire</h2>

        <form
          onSubmit={(event) => {
            handelSumit(event);
          }}
        >
          <Input type="text" placeholder="User name" value={userName} setState={setUserName} />

          <Input type="email" placeholder="Email" value={email} setState={setEmail} />

          <Input type="password" placeholder="Password" value={password} setState={setPasword} />

          <div className="checkbox-container">
            <Input type="checkbox" placeholder="checkbox" value={check} setState={setCheck} />
            <span>S'inscrire à notre newsletter</span>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18
            ans.
          </p>
          <input type="submit" className="submit" value="S'inscrire" />

          <Link to="/login">
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>

          <p className="error-message">{errorMessage}</p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
