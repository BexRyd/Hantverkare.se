import React from "react";
import { useState, useEffect } from "react";
import { get, erase } from "./../utility/fetchHealper";
import "./../css/Adds.css";


import { Button, Col, Row, NavLink, Form, Container } from "react-bootstrap";
import EmailForm from "./EmailForm";


export default function Adds(props) {
  const [AddsId, setAddsId] = useState("");
  const [adds, setAdds] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [img, setImg] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [search, setSearch] = useState("")

  function showDetail(id) {
    const index = adds[id];
    if (index == adds[id]) {
      setTitle(adds[id].heading);
      setDescription(adds[id].description);
      setImg(adds[id].img);
      setEmail(adds[id].email);
      setAddsId(adds[id]._id);


    }
  }

  const handlePopUp = () => {
    setPopUp((current) => !current); //toggle
  };




  useEffect(() => {
    get("/myPage").then((response) =>
      setAdds(response.data)
    );
  }, []);


  return (

    <div className="mainContainer">



      <div className="mainCategoryContainer">


        <div className=" tools" onClick={() => {

          get("/carpenter").then((response) =>
            setAdds(response.data)

          );

        }} >

          <h4 className="tools_h4"><span className="tools_h4_span"> Annonser för Snickare</span></h4>
        </div>



        <div className=" floorLayer" onClick={() => {

          get("/floorlayer").then((response) =>
            setAdds(response.data)

          );

        }} >
          <h4 className="floorLayer_h4"><span className="floorLayer_h4_span"> Annonser för Golvläggare</span></h4>
        </div>


        <div className=" painter" onClick={() => {

          get("/painter").then((response) =>
            setAdds(response.data)

          );

        }}  >


          <h4 className="painter_h4"><span className="painter_h4_span"> Annonser för Målare </span></h4>

        </div>




        <div className=" plumber" onClick={() => {

          get("/plumber").then((response) =>
            setAdds(response.data)

          );

        }} >
          <h4 className="plumber_h4"><span className="plumber_h4_span"> Annonser för Rörmokare</span></h4>
        </div>


        <div className="allAdds" onClick={() => {

          get("/MyPage").then((response) =>
            setAdds(response.data)

          );

        }}  >


          <h4 className="allAdds_h4"><span className="allAdds_h4_span"> Alla Annonser</span></h4>

        </div>
      </div>

      <div className="searchBox">


        <input


          type="search"
          placeholder="Sök"
          className="searchField"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}


        />
        <button className="searchButton" style={{ backgroundColor: "#e3420dee", border: "none", maxWidth: "50px" }} onClick={() => {
          get(`/search/${search}`).then((response) => setAdds(response.data)

          )




        }} >

        </button>


      </div>



      {
        adds ? (
          adds.map((add, id) => {

            return (
              <div className="main_adds_container">
                <div className="addsContainer" key={id}>
                  <img className="addsImg" src={add.img}></img>

                  <div className="textBox">
                    <h3 className="addsHeading">{add.heading}</h3>
                    <p className="addsDescription">{add.description}</p>
                  </div>

                  <button
                    className="addsBtn"
                    id={id}
                    onClick={() => {
                      showDetail(id);
                      handlePopUp();
                    }}
                  >
                    mer info
                  </button>




                </div>
              </div>

            );

          })
        ) : (


          <h2 className="searchError">Kunde inte hitta vad du söker</h2>



        )
      }





      {/* opacity: 0;
     visibility:hidden;
      z-index: -2; */}

      <div
        className="blurr"
        style={{
          opacity: popUp ? "1" : "0",
          visibility: popUp ? "visible" : "hidden",
          zIndex: popUp ? "2" : "-2",
        }}
      >
        <div className="popUp">
          <div className="popUp_content">
            <p className="popUp--close" onClick={handlePopUp}>
              &times;{" "}
            </p>
            <img className="popUp--img" src={img}></img>
            <h1 className="popUp--title">{title}</h1>
            <p className="popUp--description">{description}</p>
            {props.authorized ?
              (
                <p>{email}</p>
              )
              : null}

            {props.authorized ?
              props.authorized.user.role === "admin" ?
                (
                  <button
                    className="addsBtn"

                    onClick={() => {


                      console.log(AddsId)
                      erase(`/myPage/${AddsId}`);
                      get("/myPage").then((response) => setAdds(response.data));
                    }}
                  >ta bort</button>) : null
              : null
            }
          </div>

          <EmailForm />

        </div>
      </div>
    </div >
  );
}
