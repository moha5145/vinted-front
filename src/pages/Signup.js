import "../pages/css/signup.scss";
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

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
      const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/user/signup", user);
      const token = response.data.token;
      if (token) {
        Cookies.set("token", token);
        setToken(token);
        navigate("/");
      }
    } catch (error) {
      if (error.response.data.message === "This email already has an account") {
        setErrorMessage("Un compte avec ce mail mail exisit");
      } else {
        console.log("catch", error);
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
          <input
            type="text"
            placeholder="User name"
            value={userName}
            onChange={(event) => {
              const value = event.target.value;
              setUserName(value);
            }}
          />
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
          <div className="checkbox-container">
            <input
              type="checkbox"
              placeholder=""
              onChange={(event) => {
                const value = event.target.checked;
                setCheck(value);
              }}
            />
            <span>S'inscrire à notre newsletter</span>
          </div>

          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18
            ans.
          </p>
          <input type="submit" className="submit" />

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
