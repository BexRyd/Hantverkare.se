import React from "react";
import "../css/Hem.css";
import { NavLink } from "react-router-dom";
import video from "./../img/cuttingWood.mp4"
import logo from "../img/logo.png"

export default function Home(props) {
  console.log(props)
  return (
    <div className='Home'>
      <div className='main_information'>
        <h1 className='main_h1'>Behöver du måla en vägg eller montera ett skåp?</h1>
        <h3 className='main_h3'>Här hittar du yrkesverksamma som hjälper dig:</h3>
        <NavLink className="navlink" to="/Adds">
          <button className="main_btn">Hitta en tjänst</button>
        </NavLink>
        <div className="bg-video">
          <video className="bg-video__content" autoPlay muted loop>
            <source src={video} type="video/mp4" />
            <source src="img/video.webm" type="video/webm" />
            Your browser is not supported!
          </video>
        </div>


      </div>

      <div className="main_images">

        {props.authorized ?
          (
            <div className="welcome">
              <img className="LogoWelcome" src={logo}></img>

              <p className="welcomeP">Välkommen {props.authorized.user.name}</p>
            </div>
          ) : null}
        {/* <img className="image_homepage_stars" src="./images/Group_2.png" alt="Stars images" />
        <img className="image_homepage_workers" src="./images/Worker.png" alt="Main images" /> */}
      </div>
    </div>
  )
}


