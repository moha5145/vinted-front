import "../pages/css/login.scss";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = ({ setisUserIsLoged, setToken }) => {
  const [email, setEmail] = useState();
  const [password, setPasword] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const user = {
      email: email,
      password: password,
    };
    const response = await axios.post("https://vinted-clone-react.herokuapp.com/user/login", user);

    // console.log(response.data);
    const token = response.data.token;

    if (token) {
      setToken(Cookies.set("token", token));
      // setisUserIsLoged(true);
      navigate("/");
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
      </div>
    </section>
  );
};

export default Login;
