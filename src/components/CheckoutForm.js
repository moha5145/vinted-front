import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import axios from "axios";

const CheckoutForm = ({ total, title }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log(stripeResponse);
      const stripeToken = stripeResponse.token.id;

      const response = await axios.post("https://lereacteur-vinted-api.herokuapp.com/payment", {
        token: stripeToken,
        title: title,
        amount: total,
      });
      console.log(response.data);

      if (response.data.status === "succeeded") {
        setCompleted(true);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleSubmit}>
          <div style={{ padding: "5px 0" }}>
            <CardElement />
          </div>
          <button
            type="submit"
            value="Pay"
            style={{ width: "100%", height: "44px", backgroundColor: "#00BB6A", color: "white", border: "none", borderRadius: "5px", margin: "10px 0" }}
          >
            Valider
          </button>
        </form>
      ) : (
        <span>Paiement effectué ! </span>
      )}
    </>
  );
};

export default CheckoutForm;
