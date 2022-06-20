import "./css/publish.scss";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Publish = ({ token }) => {
  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [exchange, setExchange] = useState(false);
  const [preview, setPreview] = useState();
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      if (title && price) {
        const formData = new FormData();
        formData.append("picture", picture);

        formData.append("title", title);
        formData.append("description", description);
        formData.append("brand", brand);
        formData.append("size", size);
        formData.append("color", color);
        formData.append("condition", condition);
        formData.append("city", city);
        formData.append("price", price);

        const response = await axios.post("https://vinted-clone-back.herokuapp.com/offer/publish", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        navigate(`/offer/${response.data._id}`);
      } else {
        setMessage("Le titre et le prix sont obligatoires");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const submitPublish = (event) => {
    event.preventDefault();

    fetchData();
  };
  return token ? (
    <section className="publish">
      <div className="container">
        <h2>Vends ton article</h2>
        <form
          onSubmit={(event) => {
            submitPublish(event);
          }}
        >
          <section className="drop-zone">
            <label className="input-img-label">
              + Ajoute une photo
              <input
                className="img-input"
                id="inputTag"
                type="file"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  setPreview(URL.createObjectURL(event.target.files[0]));
                }}
              />
            </label>
            <img src={preview} alt="" className="img-preview" />
          </section>

          <section className="title-and-description">
            <div className="title-container">
              <span>Title</span>
              <input
                type="text"
                value={title}
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="description">
              <span>Décris ton article</span>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="ex: porté quelquefois, taille correctement "
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </section>

          <section className="product-detail">
            <div className="input-container">
              <span>Marque</span>
              <input
                type="text"
                value={brand}
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <span>Taille</span>
              <input
                type="text"
                value={size}
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <span>Couleur</span>
              <input
                type="text"
                placeholder="ex: Fushia"
                value={color}
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <span>Etat</span>
              <input
                type="text"
                placeholder="Neuf avec étiquette"
                value={condition}
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>

            <div className="input-container">
              <span>Lieux</span>
              <input
                type="text"
                placeholder="ex: Paris"
                value={city}
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </section>

          <section className="price">
            <span>Price</span>
            <div className="input-container">
              <input
                type="text"
                placeholder="0,00 €"
                value={price}
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  value={exchange}
                  onChange={(event) => {
                    setExchange(event.target.checked);
                  }}
                />
                <span>Je suis intéressé(e) par les échanges</span>
              </div>
            </div>
          </section>
          <p style={{ color: "red" }}>{message}</p>
          <div className="submit-container">
            <input type="submit" className="submit-btn" value="Ajouter" />
          </div>
        </form>
      </div>
    </section>
  ) : (
    navigate("/login")
  );
};

export default Publish;
