import "../components/header.scss";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Cookies from "js-cookie";
import Test from "./Range";

const Header = ({ token, setToken, setSearchInput, values, setValues }) => {
  return (
    <section className="header">
      <div className="container">
        <div className="top-nav">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
          <div className="search-container">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Rechercher des articles"
              onChange={(event) => {
                setSearchInput(event.target.value);
              }}
            />
          </div>
          <nav className="nav">
            {token && (
              <div>
                <Link
                  className="logout"
                  to="/login"
                  onClick={() => {
                    setToken(Cookies.remove("token"));
                  }}
                >
                  se deconnecter
                </Link>

                <Link to="/signup" className="vendre">
                  vends tes articles
                </Link>
              </div>
            )}

            {!token && (
              <div>
                <Link to="/login">se connecter</Link>

                <Link to="/signup">s'inscrire</Link>

                <Link to="/signup" className="vendre">
                  vends tes articles
                </Link>
              </div>
            )}
          </nav>
        </div>

        <div className="categorys">
          <nav>
            <Link to="/">Femme</Link>
            <Link to="/">Home</Link>
            <Link to="/">Enfants</Link>
            <Link to="/">Maison</Link>
            <Link to="/">Divertissement</Link>
            <Link to="/">Animaux</Link>
            <Link to="/">A propos</Link>
            <Link to="/">Notre platforme</Link>
          </nav>
          <Test values={values} setValues={setValues} />
        </div>
      </div>
    </section>
  );
};

export default Header;
