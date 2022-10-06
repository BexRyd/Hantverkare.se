import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Adds from "./components/Adds";
import MinSida from "./components/MinSida";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useState, useEffect } from 'react';

import "./css/App.css";

function App() {

  const [authorized, setAuthorized] = useState("");
  const [login, setLogin] = useState(false)


  useEffect(() => {
    setLogin(current => !current);
  }, [authorized])

  return (
    <div className="appContainer">
      <Header
        setLogginPage={(logginValue) => {
          setAuthorized(logginValue);

        }}
        login={login}
      />
      <Routes>
        <Route path="/" element={<Home authorized={authorized} />} />
        <Route path="/Adds" element={<Adds authorized={authorized} />} />
        <Route path="/MinSida" element={<MinSida authorized={authorized} setLogginPage={(logginValue) => {
          setAuthorized(logginValue);

        }} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;