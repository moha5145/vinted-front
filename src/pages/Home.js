import "../pages/css/home.scss";
import { Link } from "react-router-dom";
import hero from "../assets/jumbotron.jpg";
const Home = ({ data, isLoading, token }) => {
  return (
    <section className="home">
      <div className="hero-container">
        <img src={hero} alt="" className="hero" />
        <div className="float-div">
          <h1>Prêts à faire du tri dans vos placards ?</h1>

          {token ? (
            <Link to="/publish" className="vendre">
              <button>vends tes articles</button>
            </Link>
          ) : (
            <Link to="/login" className="vendre">
              <button>vends tes articles</button>
            </Link>
          )}
        </div>
      </div>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <>
          <div className="container">
            <h3>{data.count} items</h3>
          </div>

          <div className="offers container">
            {data.offers &&
              data.offers.map((offer) => {
                return (
                  <Link to={`/offer/${offer._id}`} key={offer._id}>
                    <div className="offer">
                      <div className="offer-title">
                        {offer.owner.account.avatar && <img src={offer.owner.account.avatar.url} alt="" className="avatar"></img>}

                        <p>{offer.product_name}</p>
                      </div>
                      <div className="offer-img-container">
                        <img src={offer.product_image && offer.product_image.url} alt="" />
                      </div>

                      <span className="price">{offer.product_price} €</span>

                      {offer.product_details.map((detail, index) => {
                        return <span key={index}>{detail.MARQUE}</span>;
                      })}
                      <span></span>
                    </div>
                  </Link>
                );
              })}
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
