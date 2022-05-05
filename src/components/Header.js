import "../components/header.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import Cookies from "js-cookie";

const Header = ({ isUserIsLoged, setisUserIsLoged }) => {
  return (
    <section className="header">
      <div className="container">
        <div className="top-nav">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="search-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" placeholder="Rechercher des articles" />
          </div>
          <nav className="nav">
            {isUserIsLoged && (
              <div>
                <Link
                  to="/login"
                  onClick={() => {
                    let isLoged = isUserIsLoged;
                    isLoged = false;
                    setisUserIsLoged(isLoged);
                    Cookies.remove("token");
                  }}
                >
                  se deconnecter
                </Link>

                <a href="" className="vendre">
                  vends tes articles
                </a>
              </div>
            )}

            {!isUserIsLoged && (
              <div>
                <Link to="/login">se connecter</Link>

                <Link to="/signup">s'inscrire</Link>

                <a href="" className="vendre">
                  vends tes articles
                </a>
              </div>
            )}
          </nav>
        </div>

        <div className="categorys">
          <nav>
            <a href="#">Femme</a>
            <a href="#">Home</a>
            <a href="#">Enfants</a>
            <a href="#">Maison</a>
            <a href="#">Divertissement</a>
            <a href="#">Animaux</a>
            <a href="#">A propos</a>
            <a href="#">Notre platforme</a>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default Header;
