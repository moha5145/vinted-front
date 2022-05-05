import { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import Offer from "./pages/Offer";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("https://lereacteur-vinted-api.herokuapp.com/offers");
      setData(response.data);
      setIsloading(false);
      // console.log(response.data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home data={data} setData={setData} isLoading={isLoading} />}></Route>
          <Route path="/offer/:id" element={<Offer data={data} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
