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
    <section>
      {isLoading ? (
        <p>Loading ...</p>
      ) : (
        <div className="single-offer-container container">
          <div className="album-container">
            <div className="col-img-container">
              <img src={offer.product_image.secure_url} alt="" />
            </div>
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

          <div>
            <p>{offer.product_price} €</p>
            <div className="single-offer-detail">
              <div>
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
          </div>
        </div>
      )}
    </section>
  );
};

export default Offer;
