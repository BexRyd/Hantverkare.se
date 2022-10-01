import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
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
  const [emailConfirm, setEmailConfirm] = useState(""); // ska vara en validering för email endast på frontend- Ska jämföras med email och emailconfirm innan det skickas till backend.
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [autorized, setAutorized] = useState(false);


  // ***************************  VALIDATION STATES  *****************************************//

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailEpmty, setEmailEmpty] = useState(false)
  const [passwordEmpty, setPasswordEmpty] = useState(false)
  const [emailError, setEmailError] = useState('Ange e-post')
  const [passwordError, setPasswordEroor] = useState('Ange password')
  const [formIsValid, setFormIsValid] = useState(false)



  // ****************************  VALIDATION FUNKTIONER  **************************************//

  //VALIDATION FUNKTIONER

  const handleSubmit = event => {
    event.preventDefault();
  }

  useEffect(() => {
    if (emailError || passwordError) {
      setFormIsValid(false)
    } else {
      setFormIsValid(true)
    }
  }, [emailError, passwordError]);



  const emailHandler = (e) => {
    setEmail(e.target.value)
    const isValidEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!isValidEmail.test(e.target.value)) {
      setEmailError('E-post är inte korrekt!')
    } else {
      setEmailError("")
    }
  }


  const passwordHandler = (e) => {
    setPassword(e.target.value)
    if (e.target.value.length < 6 || e.target.value.length > 12) {
      setPasswordEroor('Lösenordet måste vara 6-12 tecken långt')
      if (e.target.value) {
        setPasswordEroor('Lösenordet är inte korrekt!')
      }
    } else {
      setPasswordEroor("")
    }
  }


  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email':
        setEmailEmpty(true)
        break
      case 'password':
        setPasswordEmpty(true)
        break
    }
  }

  //****************************************************************************//



  /*   useEffect(() => {
     get("/login").then((response) => setLogin(response.data));
   }, []);  */

  const handlePopUp = (state) => {
    state(current => !current); //toggle
  }

  // HEADER CONTAINER

  return (
    <div className="appContainer">
      <div className="header">
        <NavLink to="/" className='logo'>
          <img className='logo_img' src='../images/logo.png'></img>
          <span className='logo_text_span'>Hantverkare.se</span>
        </NavLink>
        <div className="menu_buttons_container">
          <NavLink to="/" className='menu_link'>Hem</NavLink>
          <NavLink to="/Adds" className='menu_link'>Annonser</NavLink>
          {!props.login ? (
            <NavLink to="/MinSida" className='menu_link'>Minsida</NavLink>
          )
            : null
          }
          <div className='buttons'>
            {console.log(props.login)}
            {props.login ? (

              (<button className='btn_nav_red' onClick={() => {

                handlePopUp(setLogin);

              }}>Logga in</button>))

              : (<button className='btn_nav_red' onClick={() => {
                props.setLogginPage("");

                get("/logout")
              }}>Logga ut</button>)}

            {/* { props.authorized!==""?( <button className='btn_nav_red' onClick={() => {
                props.setLogginPage("");
                setAutorized("");
                get("/logout")
              }}>Logga ut</button> ): null} */}


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
                    }}
                    >&times; </p>
                    <div className="popup_login_form">
                      <h2 className='popUp--title_form'>Logga in</h2>


                      <div>
                        {(emailEpmty && emailError) && <div style={{ color: 'red', fontSize: '12px' }}>{emailError}</div>}
                        <input className='form_login_input' onChange={e => emailHandler(e)} value={email} onBlur={e => blurHandler(e)} name="email" type="email" placeholder="Ange e-post" />
                        {(passwordEmpty && passwordError) && <div style={{ color: 'red', fontSize: '12px' }}>{passwordError}</div>}
                        <input className='form_login_input' onChange={e => passwordHandler(e)} value={password} onBlur={e => blurHandler(e)} name='password' type="password" placeholder="Ange password" />
                      </div>

                      <Recaptcha className='recaptcha_container' />

                      <button className="setForm_submit" id="login_btn"

                        onClick={() => {
                          post("/login", {


                            email: loginEmail,
                            password: loginPassword,



                          }).then((response) => {

                            // props.setUser(response.data)


                            if (response.data) {
                              props.setLogginPage(response.data)
                              handlePopUp(setLogin);
                              setLoginEmail("");
                              setLoginPassword("");
                            }
                            else {
                              handlePopUp(setErrorLogin);
                            }


                          })

                        }}


                      >
                        Logga in
                      </button >
                      {errorLogin ? (
                        <LoginError
                          setLoginError={(btnUseState) => {
                            setErrorLogin(btnUseState);

                          }}
                        />
                      )
                        : null
                      }

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
                    }}
                    >&times; </p>
                    <div className="popup_login_form">
                      <h2 className='popUp--title_form'>Bli medlem</h2>
                      <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Ange namn</Form.Label>
                          <Form.Control type="text" placeholder="Ange namn" onChange={(e) => setName(e.target.value)} />
                          <Form.Label>Ange E-post</Form.Label>
                          <Form.Control type="email" placeholder="Ange e-post" onChange={(e) => setEmail(e.target.value)} />
                          <Form.Label>Upprepa E-post</Form.Label>
                          <Form.Control type="email" placeholder="Upprepa e-post" onChange={(e) => setEmailConfirm(e.target.value)} />

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
                      </Form>
                      <button variant="primary"
                        onClick={() => {
                          post("/signUp", {
                            name: name,
                            email: email,
                            password: password,
                            passwordConfirm: passwordConfirm
                          }).then((response) => {
                            if (response.data) {
                              handlePopUp(setRegistrera);
                            }
                          })


                        }}
                      >
                        Registrera dig
                      </button>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;