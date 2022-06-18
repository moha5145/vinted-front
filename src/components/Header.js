import "../components/styles/header.scss";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.svg";

import Range from "./Range";
import { useState } from "react";
import FilterByPrice from "./FilterByPrice";
import RightNav from "./RightNav";

const Header = ({ token, setToken, setSearchInput, values, setValues, sort, setSort, switchPage, setSwitchPage, setLimit, data, limit }) => {
  const location = useLocation();
  const [active, setActive] = useState(false);

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
          <RightNav token={token} setToken={setToken} setActive={setActive} />
          <i
            className="fa-solid fa-bars menu"
            onClick={() => {
              setActive(true);
            }}
          ></i>
        </div>

        {location.pathname === "/" && (
          <div className="filters-container">
            <div className="left-filter">
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
            </div>
          </div>
        )}
      </div>

      <section className={active ? "show-modal" : "hide-modal"}>
        <i
          className="fa-solid fa-xmark cancel"
          onClick={() => {
            setActive(false);
          }}
        ></i>

        <div className="container">
          {location.pathname === "/" && (
            <div className="filter-container">
              <div className="filter">
                <FilterByPrice sort={sort} setSort={setSort} />
                <div className="range-container">
                  <span className="title">Prix entre :</span>
                  <div className="range">
                    <Range values={values} setValues={setValues} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <RightNav token={token} setToken={setToken} setActive={setActive} />
        </div>
      </section>
    </section>
  );
};

export default Header;
