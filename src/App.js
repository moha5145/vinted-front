import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import Publish from "./pages/Publish";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [searchInput, setSearchInput] = useState("");
  const [values, setValues] = useState([0, 500]);
  const [sort, setSort] = useState("price-desc");

  useEffect(() => {
    const fetchData = async () => {
      // if (values[0] > 0 || (values[1] < 500 && searchInput)) {
      const response = await axios.get(
        `https://lereacteur-vinted-api.herokuapp.com/offers?title=${searchInput}&priceMin=${values[0]}&priceMax=${values[1]}&sort=${sort}`
      );
      setData(response.data);
      setIsloading(false);
    };

    fetchData();
  }, [searchInput, values, sort]);
  return (
    <div className="App">
      <Router>
        <Header token={token} setToken={setToken} setSearchInput={setSearchInput} values={values} setValues={setValues} sort={sort} setSort={setSort} />
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} isLoading={isLoading} />}></Route>
          <Route path="/offer/:id" element={<Offer />}></Route>
          <Route path="/signup" element={<Signup setToken={setToken} />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/publish" element={<Publish token={token} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
