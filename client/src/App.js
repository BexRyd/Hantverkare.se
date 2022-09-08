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
  const [user, setUser] = ([]);
  return (
    <div className="appContainer">
      <Header 
       setLogginPage={(logginValue) => {
          setAuthorized(logginValue);
          
        }}
       setUser={(logginValue) => {
          setUser(logginValue);
         
        }}
      />
      <Routes>
        <Route path="/" element={<Home authorized={authorized} user={user}/>} />
        <Route path="/Adds" element={<Adds authorized={authorized} user={user} />} />
        <Route path="/MinSida" element={<MinSida authorized={authorized} user={user} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
