import React from "react";
import { useState, useEffect } from "react";
import { get, erase } from "./../utility/fetchHealper";
import "./../css/Adds.css";

import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavLink from "react-bootstrap/esm/NavLink";
import Form from 'react-bootstrap/Form';

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

  const resetInputField = () => {
    setSearch("");
  };


  useEffect(() => {
    get("/myPage").then((response) =>
      setAdds(response.data)
    );
  }, []);


  return (

    <div className="mainContainer">

      <div className="searchBox">

        <Form className="searchFieldbox">
          <Form.Control


            type="search"
            placeholder="Sök"
            className="searchField"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}


          />
          <Button className="searchButton" style={{ backgroundColor: "lightgrey", border: "none", maxWidth: "50px" }} onClick={() => {
            get(`/search/${search}`).then((response) => setAdds(response.data)

            )




          }} >

          </Button>
          <NavLink className="navlink" to="/Adds">
            <Button className="backButton" onClick={() => {

              get("/myPage").then((response) =>
                setAdds(response.data)

              );

            }} >Tillbaka</Button>
          </NavLink>
        </Form>
      </div>



      <div className="mainCategoryContainer">


        <Row xs={1} s={3} md={6} lg={12} className="CategoryChoices">
          <Col className="mr-1 ">


            <Button className="mt-2  mr-1 cat-btn" variant="dark" onClick={() => {

              get("/carpenter").then((response) =>
                setAdds(response.data)

              );

            }} >

              Snickare
            </Button>
          </Col>
          <Col className="mr-1 ">

            <Button className="mt-2 cat-btn mr-1 " variant="dark" onClick={() => {

              get("/painter").then((response) =>
                setAdds(response.data)

              );

            }}  >
              Målare
            </Button>
          </Col>
          <Col className="mr-1 ">

            <Button className="mt-2 cat-btn mr-1 " variant="dark" onClick={() => {

              get("/floorlayer").then((response) =>
                setAdds(response.data)

              );

            }} >
              Golvläggare
            </Button>
          </Col>
          <Col className="mr-1 ">

            <Button className="mt-2 cat-btn mr-1 " variant="dark" onClick={() => {

              get("/plumber").then((response) =>
                setAdds(response.data)

              );

            }} >
              Rörmokare
            </Button>
          </Col>
        </Row>


      </div>


      {
        adds ? (
          adds.map((add, id) => {

            return (
              <div>
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


          <h2>Kunde inte hitta vad du söker</h2>



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
          <div>
            <p className="popUp--close" onClick={handlePopUp}>
              &times;{" "}
            </p>
            <img className="popUp--img" src={img}></img>
            <h1 className="popUp--title">{title}</h1>
            <p className="popUp--description">{description}</p>
            {props.authorized ?
              <p>{email}</p>
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

          <Form />
        </div>
      </div>
    </div >
  );
}
