import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import React from 'react';
import "../css/header.css"
import '../css/Adds.css'
import {get, post} from "./../utility/fetchHealper"


function Header() {

  const [registrera, setRegistrera] = useState(false);
  const [login, setLogin] = useState(false);

  const[token, setToken] = useState("");

  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState(""); // ska vara en validering för email endast på frontend- Ska jämföras med email och emailconfirm innan det skickas till backend.
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");


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
            <Nav>
              <Nav.Link className='navlink' href="/">Hem</Nav.Link>
              <Nav.Link className='navlink' href="Categories">Sätt in annons</Nav.Link>
              <Nav.Link className='navlink' href="Adds">Mina Tjänster</Nav.Link>
            </Nav>
              <Form.Control
                type="search"
                placeholder="Sök"
                className="me-2"
                aria-label="Search"
              />

            <Container className='Buttons_container'>
              <Button className='btn_register' size="sm" variant="dark" onClick={() => {
                handlePopUp(setLogin);              
              }}>Logga in</Button>
              <div className='blurr'
                style={{
                  opacity: login ? '1' : '0',
                  visibility: login ? 'visible' : 'hidden',
                  zIndex: login ? '2' : '-2',
                }}
              >

                <div className='popup_form'>
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
                          <Form.Control type="email" placeholder="Ange e-post" onChange={e=> setLoginEmail(e.target.value)}/>
                          {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Lösenord</Form.Label>
                          <Form.Control type="password" placeholder="Ange lösenord" onChange={ e=> setLoginPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                         {/*  <Form.Check type="checkbox" label="Bekräfta" /> */}
                        </Form.Group>
                        <Button variant="primary" 
                        
                          onClick = {()=>{
                            post("/login",{
                                
                                  
                                  email:loginEmail,
                                  password: loginPassword,
                               

  
                        }).then((response) => setToken(response.token))
                        }}
                        >
                          Logga in
                        </Button >

                        <div>{token}</div>
                      </Form>
                    </div>
                  </div>
                </div>
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
              <div className='popup_form'>
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
                          <Form.Control type="text" placeholder="Ange e-post" onChange={ (e) => setName(e.target.value)} />
                          <Form.Label>Ange E-post</Form.Label>
                          <Form.Control type="email" placeholder="Ange e-post" onChange={ (e) => setEmail(e.target.value)} />
                          <Form.Label>Upprepa E-post</Form.Label>
                          <Form.Control type="email" placeholder="Ange e-post" onChange={ (e) => setEmailConfirm(e.target.value)} />
                          
                          {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Lösenord</Form.Label>
                          <Form.Control type="password" placeholder="Minst 8 tecken"  onChange={ (e) => setPassword(e.target.value)}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Upprepa lösenordet</Form.Label>
                          <Form.Control type="password" placeholder="Minst 8 tecken" onChange={ (e) => setPasswordConfirm(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                         {/*  <Form.Check type="checkbox" label="Bekräfta" /> */}
                        </Form.Group>
                        <Button variant="primary"  
                        
                        onClick = {()=>{
                            post("/signUp",{
                                  name: name,
                                  email:email,
                                  password: password,
                                  passwordConfirm:passwordConfirm

  
                        })
                        }}
                        >
                        
                        

                          Registrera dig
                        </Button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
                
              </Container>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Header;
