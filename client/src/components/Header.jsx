import Button from 'react-bootstrap/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar'
import { useState, useEffect } from 'react';
import React from 'react';
import "../css/header.css"
import '../css/Adds.css'
import { get, post } from "./../utility/fetchHealper"
import LoginError from './LoginError'
import Recaptcha from './ReCAPTCHA'







function Header(props) {

  const [registrera, setRegistrera] = useState(false);
  const [login, setLogin] = useState(false);

  const [loginPassword, setLoginPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [errorLogin, setErrorLogin] = useState(false);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState(""); // ska vara en validering för email endast på frontend- Ska jämföras med email och emailconfirm innan det skickas till backend.
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [recaptchaState, setRecaptchaState] = useState(false)



  let navigate = useNavigate();

  function routeBack() {
    navigate('/')
  }

  const handlePopUp = (state) => {
    state(current => !current); //toggle
  }

  const handleSubmit = event => {
    event.preventDefault();
  }

  // HEADER CONTAINER

  return (
    <div className="appContainer">
      <div className="header">
        <NavLink to="/" className='logo'>
          <img className='logo_img' src='../images/logo.png'></img>
          <span className='logo_text_span'>Hantverkare.se</span>
        </NavLink>
        
          <NavLink to="/" className='menu_link'>Hem</NavLink>
          <NavLink to="/Adds" className='menu_link'>Annonser</NavLink>
          {!props.login ? (
            <NavLink to="/MinSida" className='menu_link'>Minsida</NavLink>
          )
            : null
          }

          <div className='buttons'>

            {props.login ? (

              (<button className='btn_nav_red' onClick={() => {

                handlePopUp(setLogin);

              }}>Logga in</button>))

              : (<button className='btn_nav_red' onClick={() => {
                props.setLogginPage("");

                get("/logout")
                routeBack()
              }}>Logga ut</button>)}



            <div className='blurr'
              style={{
                opacity: login ? '1' : '0',
                visibility: login ? 'visible' : 'hidden',
                zIndex: login ? '2' : '-2',
              }}
            >
              {login ? (

                <div className='popup_form'>
                  <div>
                    <p className="popUp--close_form" onClick={() => {
                      handlePopUp(setLogin);
                      setErrorLogin(false)
                      setRecaptchaState(false)
                    }}
                    >&times; </p>
                    <div className="popup_login_form">
                      <h2 className='popUp--title_form'>Logga in</h2>
                      <form onSubmit={handleSubmit}>

                        <label for="email">E-post</label>
                        <input className='form_login_input' required type="email" id="email" name="email" placeholder="Ange e-post" onChange={e => setLoginEmail(e.target.value)} />
                        <label for="password">Lösenord</label>
                        <input className='form_login_input' required id="password" name='password' type="password" pattern=".{8,16}$" title='Lösenordet måste vara minst 8 tecken långt' placeholder="Ange Lösenord" onChange={e => setLoginPassword(e.target.value)} />

                        <Recaptcha className='recaptcha_container' setRecaptchaValue={(value) => {
                          setRecaptchaState(value);

                        }} />

                        {recaptchaState ? (
                          <button className="setForm_submit" id="login_btn"

                            onClick={() => {
                              post("/login", {


                                email: loginEmail,
                                password: loginPassword,



                              })
                                .then((response) => {

                                  // props.setUser(response.data)


                                  if (response.data) {
                                    props.setLogginPage(response.data)
                                    handlePopUp(setLogin);
                                    setLoginEmail("");
                                    setLoginPassword("");
                                    setRecaptchaState(false)

                                  }
                                  else if (!response.data) {
                                    handlePopUp(setErrorLogin);

                                  }

                                })


                            }}


                          >
                            Logga in
                          </button >
                        ) : <button className="setForm_submit" id="login_btn" disabled>Logga in</button>}
                        {errorLogin ? (
                          <LoginError
                            setLoginError={(btnUseState) => {
                              setErrorLogin(btnUseState);

                            }}
                          />
                        )
                          : null
                        }
                      </form>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>


            <button className='btn_nav' onClick={() => {
              handlePopUp(setRegistrera);
            }} >Registrera</button>


            <div className='blurr'
              style={{
                opacity: registrera ? '1' : '0',
                visibility: registrera ? 'visible' : 'hidden',
                zIndex: registrera ? '2' : '-2',

              }}
            >
              {registrera ? (
                <div className='popup_form'>
                  <div>
                    <p className="popUp--close_form" onClick={() => {
                      handlePopUp(setRegistrera);
                      setRecaptchaState(false);
                    }}
                    >&times; </p>
                    <div className="popup_login_form">
                      <h2 className='popUp--title_form'>Bli medlem</h2>
                      <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Ange namn</Form.Label>
                          <Form.Control required type="text" placeholder="Ange namn" onChange={(e) => setName(e.target.value)} />
                          <Form.Label>Ange E-post</Form.Label>
                          <Form.Control required type="email" placeholder="Ange e-post" onChange={(e) => setEmail(e.target.value)} />
                          <Form.Label>Upprepa E-post</Form.Label>
                          <Form.Control required type="email" placeholder="Upprepa e-post" onChange={(e) => setEmailConfirm(e.target.value)} />

                          {/* <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                          </Form.Text> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Lösenord</Form.Label>
                          <Form.Control required type="password" pattern=".{7,16}$" placeholder="Minst 8 tecken" onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Upprepa lösenordet</Form.Label>
                          <Form.Control required type="password" placeholder="Minst 8 tecken" onChange={(e) => setPasswordConfirm(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                          {/*  <Form.Check type="checkbox" label="Bekräfta" /> */}
                        </Form.Group>

                        <Recaptcha className='recaptcha_container' setRecaptchaValue={(value) => {
                          setRecaptchaState(value);

                        }} /> {recaptchaState ? (
                          <button className="setForm_submit"
                            onClick={() => {
                              post("/signUp", {
                                name: name,
                                email: email,
                                password: password,
                                passwordConfirm: passwordConfirm
                              }).then((response) => {
                                if (response.data) {
                                  handlePopUp(setRegistrera);
                                  setRecaptchaState(false);
                                }
                              })


                            }}
                          >
                            Registrera dig
                          </button>
                        ) : <button className="setForm_submit" disabled>Registrera dig</button>}
                      </Form>
                    </div>
                  </div>
                </div>

              ) : null}
            </div>
          </div>
        </div>
      </div>
  );
}

export default Header;