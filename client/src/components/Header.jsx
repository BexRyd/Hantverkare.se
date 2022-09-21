import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import React from 'react';
import "../css/header.css"
import '../css/Adds.css'
import { get, post } from "./../utility/fetchHealper"






function Header(props) {

  const [registrera, setRegistrera] = useState(false);
  const [login, setLogin] = useState(false);

  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState(""); // ska vara en validering för email endast på frontend- Ska jämföras med email och emailconfirm innan det skickas till backend.
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


  const [autorized, setAutorized] = useState("");



  const handlePopUp = (state) => {
    state(current => !current); //toggle
  }


  return (
    <div className="appContainer">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand className="logo" href="/">hantverkare.se</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <ul>
              <li>
                <NavLink className='navlink' to="/"
                  style={({ isActive }) =>
                    isActive ? { color: "grey" } : { color: "black" }
                  }>Hem
                </NavLink>
              </li>
              {autorized ? (
                <li>
                  <NavLink className='navlink' to="/MinSida"
                    style={({ isActive }) =>
                      isActive ? { color: "grey" } : { color: "black" }
                    }
                  >Min sida

                  </NavLink>
                </li>
              ) : null}
              <li>
                <NavLink className='navlink' to="/Adds"
                  style={({ isActive }) =>
                    isActive ? { color: "grey" } : { color: "black" }
                  }
                >Annonser

                </NavLink>
              </li>
            </ul>





            <Container className='Buttons_container'>
              {autorized ? (<Button className='btn_register' size="sm" variant="dark" onClick={() => {
                props.setLogginPage("");
                setAutorized("");
                get("/logout")
              }}>Logga ut</Button>)

                : (<Button className='btn_register' size="sm" variant="dark" onClick={() => {

                  handlePopUp(setLogin);

                }}>Logga in</Button>)}




              <div className='blurr'
                style={{
                  opacity: login ? '1' : '0',
                  visibility: login ? 'visible' : 'hidden',
                  zIndex: login ? '2' : '-2',
                }}
              >
                {login ?



                  (<div className='popup_form'>
                    <div>
                      <p className="popUp--close_form" onClick={() => {
                        handlePopUp(setLogin);
                      }}
                      >&times; </p>
                      <div className="popup_login_form">
                        <h2 className='popUp--title_form'>Logga in</h2>
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>E-post</Form.Label>
                            <Form.Control type="email" placeholder="Ange e-post" onChange={e => setLoginEmail(e.target.value)} />
                            {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text> */}
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Lösenord</Form.Label>
                            <Form.Control type="password" placeholder="Ange lösenord" onChange={e => setLoginPassword(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            {/*  <Form.Check type="checkbox" label="Bekräfta" /> */}
                          </Form.Group>
                          <Button variant="primary"

                            onClick={() => {
                              post("/login", {



                                email: loginEmail,
                                password: loginPassword,



                              }).then((response) => {
                                props.setLogginPage(response.data)
                                // props.setUser(response.data)
                                setAutorized(response.data)

                                if (response.data) {
                                  handlePopUp(setLogin);
                                }







                              })

                            }}
                          >
                            Logga in
                          </Button >


                        </Form>
                      </div>
                    </div>
                  </div>
                  ) : null}
              </div>


              <Button size="sm" variant="outline-secondary" onClick={() => {
                handlePopUp(setRegistrera);
              }} >Registrera</Button>


              <div className='blurr'
                style={{
                  opacity: registrera ? '1' : '0',
                  visibility: registrera ? 'visible' : 'hidden',
                  zIndex: registrera ? '2' : '-2',

                }}
              >
                {login ?
                  (<div className='popup_form'>
                    <div>
                      <p className="popUp--close_form" onClick={() => {
                        handlePopUp(setRegistrera);
                      }}
                      >&times; </p>
                      <div className="popup_login_form">
                        <h2 className='popUp--title_form'>Bli medlem</h2>
                        <Form>
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Ange namn</Form.Label>
                            <Form.Control type="text" placeholder="Ange e-post" onChange={(e) => setName(e.target.value)} />
                            <Form.Label>Ange E-post</Form.Label>
                            <Form.Control type="email" placeholder="Ange e-post" onChange={(e) => setEmail(e.target.value)} />
                            <Form.Label>Upprepa E-post</Form.Label>
                            <Form.Control type="email" placeholder="Ange e-post" onChange={(e) => setEmailConfirm(e.target.value)} />

                            {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text> */}
                          </Form.Group>

                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Lösenord</Form.Label>
                            <Form.Control type="password" placeholder="Minst 8 tecken" onChange={(e) => setPassword(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Upprepa lösenordet</Form.Label>
                            <Form.Control type="password" placeholder="Minst 8 tecken" onChange={(e) => setPasswordConfirm(e.target.value)} />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            {/*  <Form.Check type="checkbox" label="Bekräfta" /> */}
                          </Form.Group>
                          <Button variant="primary"

                            onClick={() => {
                              post("/signUp", {
                                name: name,
                                email: email,
                                password: password,
                                passwordConfirm: passwordConfirm


                              })
                            }}
                          >



                            Registrera dig
                          </Button>
                        </Form>
                      </div>
                    </div>
                  </div>
                  ) : null}
              </div>

            </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
