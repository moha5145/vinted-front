import "../components/header.scss";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

const Header = () => {
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
            <a href="">s'inscrire | se connecter</a>
            <a href="" className="vendre">
              vends tes articles
            </a>
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
