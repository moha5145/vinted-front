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

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [isUserIsLoged, setisUserIsLoged] = useState(false);
  const [token, setToken] = useState(Cookies.get("token") || "");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsloading(false);
    };

    fetchData();
  }, [token]);
  return (
    <div className="App">
      <Router>
        <Header token={token} setToken={setToken} />
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} isLoading={isLoading} />}></Route>
          <Route path="/offer/:id" element={<Offer data={data} />}></Route>
          <Route path="/signup" element={<Signup setToken={setToken} />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
