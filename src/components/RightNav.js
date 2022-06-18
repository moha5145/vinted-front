import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const RightNav = ({ token, setToken, setActive }) => {
  return (
    <nav className="nav">
      {token && (
        <div>
          <Link
            to="/publish"
            onClick={() => {
              setActive(false);
            }}
            className="vendre"
          >
            vends tes articles
          </Link>

          <Link
            className="logout"
            to="/login"
            onClick={() => {
              setToken(Cookies.remove("token"));
              setActive(false);
            }}
          >
            se deconnecter
          </Link>
        </div>
      )}
      {!token && (
        <div>
          <Link
            to="/login"
            onClick={() => {
              setActive(false);
            }}
          >
            se connecter
          </Link>

          <Link
            to="/signup"
            onClick={() => {
              setActive(false);
            }}
          >
            s'inscrire
          </Link>

          <Link
            to="/login"
            onClick={() => {
              setActive(false);
            }}
            className="vendre"
          >
            vends tes articles
          </Link>
        </div>
      )}
    </nav>
  );
};
export default RightNav;
