import "../pages/css/offer.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Offer = ({ token, apiUrl }) => {
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${apiUrl}/offer/${id}`);

      console.log(response.data);
      setOffer(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id, apiUrl]);
  return (
    <section className="offer-section">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="single-offer-container container">
          <div className="album-container">
            {offer.product_pictures ? (
              <div className="row-img-container">
                {offer.product_pictures &&
                  offer.product_pictures.map((img, index) => {
                    return (
                      <div key={index} className="offer " style={{ height: "300px" }}>
                        <img src={img.url} alt="" />
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="col-img-container">{offer.product_image && <img src={offer.product_image.secure_url} alt="" />}</div>
            )}
          </div>

          <div className="detail-container">
            <p className="price">{offer.product_price} €</p>
            <div className="single-offer-detail">
              <div className="detail-title">
                <p>MARQUE </p>
                <p>TAILLE </p>
                <p>ÉTAT </p>
                <p>COULEUR : </p>
                <p>EMPLACEMENT </p>
              </div>

              <div>
                <p>{offer.product_details[0].MARQUE}</p>
                <p>{offer.product_details[1].TAILLE}</p>
                <p>{offer.product_details[2].ÉTAT}</p>
                <p>{offer.product_details[3].COULEUR}</p>
                <p>{offer.product_details[4].EMPLACEMENT}</p>
              </div>
            </div>

            <div className="buy-container">
              <h3>{offer.product_name}</h3>
              <p>{offer.product_description}</p>
              <div className="avatar-container">
                {offer.owner.account.avatar && <img src={offer.owner.account.avatar.secure_url} alt="" className="avatar" />}
                <span>{offer.owner.account.username}</span>
              </div>

              {token ? (
                <Link to="/payment" state={{ title: offer.product_name, price: offer.product_price }}>
                  <button className="buy-btn">Acheter</button>
                </Link>
              ) : (
                <Link to="/login">
                  <button className="buy-btn">Acheter</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Offer;
