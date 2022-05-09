import "../pages/css/offer.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Offer = () => {
  const [offer, setOffer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://lereacteur-vinted-api.herokuapp.com/offer/${id}`);
      setOffer(response.data);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);
  return (
    <section className="offer-section">
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="single-offer-container container">
          <div className="album-container">
            <div className="col-img-container">{offer.owner.account !== undefined && <img src={offer.product_image.secure_url} alt="" />}</div>
            <div className="row-img-container">
              {offer.product_pictures.map((img, index) => {
                return (
                  <div key={index} className="offer " style={{ height: "300px" }}>
                    <img src={img.url} alt="" />
                  </div>
                );
              })}
            </div>
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
            {console.log(offer.owner.account)}
            <div className="buy-container">
              <h3>{offer.product_name}</h3>
              <p>{offer.product_description}</p>
              <div className="avatar-container">
                <img src={offer.owner.account.avatar.secure_url} alt="" className="avatar" />
                <span>{offer.owner.account.username}</span>
              </div>

              <button className="buy-btn">Acheter</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Offer;
