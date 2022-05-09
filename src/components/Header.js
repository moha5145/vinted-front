import "../components/header.scss";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import Cookies from "js-cookie";
import Range from "./Range";
import { useLocation } from "react-router-dom";

const Header = ({ token, setToken, setSearchInput, values, setValues, sort, setSort }) => {
  const location = useLocation();
  console.log("use location", location.pathname);
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

                <Link to="/publish" className="vendre">
                  vends tes articles
                </Link>
              </div>
            )}

            {!token && (
              <div>
                <Link to="/login">se connecter</Link>

                <Link to="/signup">s'inscrire</Link>

                <Link to="/publish" className="vendre">
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
          {location.pathname === "/" && (
            <div className="filters-container">
              <span>Trier par prix : </span>
              {sort === "price-desc" ? (
                <i
                  className="fa-solid fa-toggle-off switch"
                  onClick={() => {
                    setSort("price-asc");
                    // console.log(sort);
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-toggle-on switch"
                  onClick={() => {
                    setSort("price-desc");
                    // console.log(sort);
                  }}
                ></i>
              )}

              <span>Prix entre :</span>
              <div className="range">
                <Range values={values} setValues={setValues} />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
