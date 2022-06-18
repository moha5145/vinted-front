import "../pages/css/home.scss";
import { Link } from "react-router-dom";
import hero from "../assets/jumbotron.jpg";
import Pagination from "../components/Pagination";
import LimitParpage from "../components/LimitParPage";
const Home = ({ data, isLoading, token, setSwitchPage, switchPage, limit, setLimit }) => {
  return (
    <section className="home">
      <div className="hero-container">
        <img src={hero} alt="" className="hero" />
        <div className="float-div container">
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
          <div className="container filter-container">
            <h3>{data.count} items</h3>
            <div className="limit">
              <LimitParpage setLimit={setLimit} />
            </div>

            <div>
              <Pagination setSwitchPage={setSwitchPage} switchPage={switchPage} limit={limit} data={data} />
            </div>
          </div>

          <div className="offers container">
            {data.offers &&
              data.offers.map((offer) => {
                return (
                  <Link to={`/offer/${offer._id}`} key={offer._id}>
                    <div className="offer">
                      <div className="offer-title">
                        {/* {offer.owner.account.avatar && <img src={offer.owner.account.avatar.url} alt="" className="avatar"></img>} */}

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
          <div className="container filter-container">
            <h3>{data.count} items</h3>
            <div className="limit">
              <LimitParpage setLimit={setLimit} />
            </div>

            <Pagination setSwitchPage={setSwitchPage} switchPage={switchPage} limit={limit} data={data} />
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
