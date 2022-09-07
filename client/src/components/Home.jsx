import React from "react";
import "../css/Hem.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='Home'>
        <div className='main_information'>
            <h1 className='main_h1'>Behöver du måla en vägg eller montera ett skåp?</h1>
            <h3 className='main_h3'>Här hittar du yrkesverksamma som hjälper dig:</h3>
            <Link to="/Adds">
              <button className="main_btn">Hitta en tjänst</button>
            </Link>
        </div>
        <div className="main_images">
          <img className="image_homepage_stars" src="./images/Group_2.png" alt="Stars images" />
          <img className="image_homepage_workers" src="./images/Worker.png" alt="Main images" />          
        </div>
    </div>  
    )
}
