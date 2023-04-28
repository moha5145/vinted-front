import "./App.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [searchInput, setSearchInput] = useState("");
  const [values, setValues] = useState([0, 250]); //range state
  const [sort, setSort] = useState("price-desc"); //price sort
  const [switchPage, setSwitchPage] = useState(1); //pagination
  const [limit, setLimit] = useState(5); //limite par page
  const [active, setActive] = useState(false); //modal

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          // `http://localhost:4000/offers?title=${searchInput}&priceMin=${values[0]}&priceMax=${values[1]}&sort=${sort}&limit=${limit}&page=${switchPage}`
          `https://vinted-back-clone.onrender.com/offers?title=${searchInput}&priceMin=${values[0]}&priceMax=${values[1]}&sort=${sort}&limit=${limit}&page=${switchPage}`
        );
        setData(response.data);
        setIsloading(false);
      };
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  }, [searchInput, values, sort, switchPage, limit]);
  return (
    <div className="App">
      <Router>
        <Header
          token={token}
          setToken={setToken}
          setSearchInput={setSearchInput}
          values={values}
          setValues={setValues}
          sort={sort}
          setSort={setSort}
          switchPage={switchPage}
          setSwitchPage={setSwitchPage}
          setLimit={setLimit}
          limit={limit}
          data={data}
          active={active}
          setActive={setActive}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                data={data}
                setData={setData}
                isLoading={isLoading}
                token={token}
                setSwitchPage={setSwitchPage}
                switchPage={switchPage}
                limit={limit}
                setLimit={setLimit}
                active={active}
                setActive={setActive}
              />
            }
          ></Route>
          <Route path="/offer/:id" element={<Offer token={token} />}></Route>
          <Route path="/signup" element={<Signup setToken={setToken} />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/publish" element={<Publish token={token} />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
