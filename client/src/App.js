import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Adds from "./components/Adds";
import MinSida from "./components/MinSida";
import Footer from "./components/Footer";
import Header from "./components/Header";

import "./css/App.css";

function App() {
  return (
    <div className="appContainer">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Adds" element={<Adds />} />
        <Route path="/MinSida" element={<MinSida />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
