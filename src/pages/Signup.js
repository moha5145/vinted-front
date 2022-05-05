import "../pages/css/signup.scss";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

const Signup = ({ setisUserIsLoged, setToken }) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [check, setCheck] = useState(false);
  //   const [token, setToken] = useState("");
  const navigate = useNavigate();

  //   useEffect(() => {}, []);

  const fetchData = async () => {
    try {
      const user = {
        username: userName,
        email: email,
        password: password,
        check: check,
      };
      const response = await axios.post("https://vinted-clone-react.herokuapp.com/user/signup", user);
      //   console.log(response.data.token);
      const token = response.data.token;
      if (token) {
        setToken(Cookies.set("token", token));

        // setisUserIsLoged(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
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
          <input
            type="checkbox"
            placeholder=""
            onChange={(event) => {
              const value = event.target.value;
              setCheck(value);
            }}
          />
          <span>S'inscrire à notre newsletter</span>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes & Conditions et Politique de Confidentialité de Vinted. Je confirme avoir au moins 18
            ans.
          </p>
          <input type="submit" className="submit" />

          <Link to="/login">
            <p>Tu as déjà un compte ? Connecte-toi !</p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
