import "../components/header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";
import Cookies from "js-cookie";
import Range from "./Range";

const Header = ({ token, setToken, setSearchInput, values, setValues, sort, setSort, switchPage, setSwitchPage, setLimit, data }) => {
  const location = useLocation();
  const options = [
    { label: "10", value: 10 },
    { label: "15", value: 15 },
    { label: "20", value: 20 },
    { label: "25", value: 25 },
    { label: "30", value: 30 },
  ];
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

                <Link to="/login" className="vendre">
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
                  }}
                ></i>
              ) : (
                <i
                  className="fa-solid fa-toggle-on switch"
                  onClick={() => {
                    setSort("price-desc");
                  }}
                ></i>
              )}

              <span>Prix entre :</span>
              <div className="range">
                <Range values={values} setValues={setValues} />
              </div>

              <div className="select-limit-container">
                <span>Limit par page</span>
                <select
                  name="limit page"
                  id="limit-page"
                  onChange={(event) => {
                    setLimit(event.target.value);
                  }}
                >
                  {options.map((option, index) => {
                    return (
                      <option key={index} value={option.value}>
                        {" "}
                        {option.label}{" "}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="switch-page">
                {switchPage > 1 && (
                  <button
                    onClick={() => {
                      setSwitchPage(switchPage - 1);
                    }}
                  >
                    <i className="fa-solid fa-arrow-left "></i>
                    Previous Page
                  </button>
                )}
                <span>{switchPage}</span>
                {data.count / switchPage > switchPage && (
                  <button
                    onClick={() => {
                      console.log(data.count);
                      setSwitchPage(switchPage + 1);
                    }}
                  >
                    Next Page
                    <i className="fa-solid fa-arrow-right "></i>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
