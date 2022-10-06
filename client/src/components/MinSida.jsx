import React from 'react'
import { useState, useEffect } from 'react'
import { post, get, erase, put, patch } from "../utility/fetchHealper"
import { useNavigate } from 'react-router-dom';
/* import "./../css/Adds.css" */
import "./../css/MinSida.css"
import Axios from "axios"
import { Image } from "cloudinary-react"
/* import UserAdds from './userAdds' */
export default function MinSida(props) {
  const [heading, setHeading] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0)
  const [popUp, setPopUp] = useState(false)
  const [imageUrl, setImageUrl] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [useradds, setUserAdds] = useState([]);
  const [myAdds, setMyAdds] = useState(false);
  const [newAdd, setNewAdd] = useState(false);
  const [settings, setSettings] = useState(false);
  const [newAddPopup, setNewAddPopup] = useState(false);
  const [AddsIdPopup, setAddsIdPopup] = useState("");
  const [titlePopup, setTitlePopup] = useState("");
  const [descriptionPopup, setDescriptionPopup] = useState("");
  const [emailPopup, setEmailPopup] = useState("");
  const [imgPopup, setImgPopup] = useState("");
  const [popUpAdds, setPopUpAdds] = useState(false);
  const [categoryPopup, setCategoryPopup] = useState("")
  const [category, setCategory] = useState("")


  //usestate for changing add
  const [changeAdds, setChangeAdds] = useState(false);
  const [changeTitlePopup, setChangeTitlePopup] = useState(titlePopup)
  const [changeDescriptionPopup, setChangeDescriptionPopup] = useState(descriptionPopup)


  //usestate for settings

  const [newName, setNewName] = useState("")
  const [newEmail, setNewEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")

  const [comparePassword, setComparePassword] = useState("")
  const [message, setMessage] = useState("")

  function showDetail(id) {
    const index = useradds[id];
    if (index == useradds[id]) {
      setTitlePopup(useradds[id].heading);
      setDescriptionPopup(useradds[id].description);
      setImgPopup(useradds[id].img);
      setEmailPopup(useradds[id].email);
      setAddsIdPopup(useradds[id]._id);
      setCategoryPopup(useradds[id].category);

    }
  }

  const handleSubmit = event => {
    event.preventDefault();
  }

  function comparePass() {
    if (newPassword === confirmPassword && message === "success") {
      setComparePassword("ditt lösenord är ändrat!")

    } else if (confirmPassword !== newPassword && confirmPassword !== "" && newPassword !== "") {
      setComparePassword("kunde inte hitta dej!")


    } else if (newPassword == "" || confirmPassword == "" || currentPassword == "")
      setComparePassword("")
  }

  useEffect(() => {
    comparePass()

  }, [message])


  useEffect(() => {
    setMessage("")

  }, [confirmPassword, newPassword, currentPassword])

  useEffect(() => {
    uploadImage()
  }, [img])
  useEffect(() => {
    setChangeTitlePopup(titlePopup)

  }, [titlePopup])
  useEffect(() => {
    setChangeDescriptionPopup(descriptionPopup)

  }, [descriptionPopup])
  useEffect(() => {
    if (props.authorized) {

      get(`/myPage/${props.authorized.user.email}`).then((response) =>
        setUserAdds(response.data))
    }

  }, [popUpAdds])


  useEffect(() => {
    if (props.authorized) {
      get(`/myPage/${props.authorized.user.email}`).then((response) =>
        setUserAdds(response.data))
      console.log(useradds)
    }
  }, [props.authorized])
  useEffect(() => {
    setEmail()
    setUserAdds([])
  }, [props.authorized]);
  //"https://api.cloudinary.com/v1_1/bexryd/image/upload"
  const setEmail = () => {
    if (props.authorized) {
      setUserEmail(props.authorized.user.email)
      console.log(props.authorized.user.email)
    }
  };
  const handlePopUp = () => {
    setPopUp(current => !current); //toggle
  }
  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', img);
    formData.append('upload_preset', "Hantverkare");
    try {
      setLoading(true);
      const res = await Axios.post('https://api.cloudinary.com/v1_1/bexryd/image/upload', formData);
      setImageUrl(res.data.secure_url);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  const navigate = useNavigate()
  function routeBack() {
    navigate('/')
  }
  /* const uploadImage = (files)=>{
  const formData = new formData();
  formData.append("file", files[0])
  formData.append("upload_preset", "Hantverkare")
  Axios.post("https://api.cloudinary.com/v1_1/bexryd/image/
 upload",formData).then((response)=>console.log(response))
  } */
  return (


    <div className='pageContainer'>

      <div className='userOptions'>

        <div className='optionBox_myAdds '
          onClick={() => {
            get(`/myPage/${props.authorized.user.email}`).then((response) =>
              setUserAdds(response.data))

            setMyAdds(true);
            setNewAdd(false);
            setSettings(false);
            setComparePassword("")
          }}

        ><h4 className="myAdds_h4"><span className="myAdds_h4_span">Mina Annonser</span></h4></div>
        <div className='optionBox_settings '
          onClick={() => {
            get(`/myPage/${props.authorized.user.email}`).then((response) =>
              setUserAdds(response.data))
            setMyAdds(false);
            setNewAdd(false);
            setSettings(true);

          }}
        ><h4 className="settings_h4"><span className="settings_h4_span">Inställningar</span></h4></div>
        <div className='optionBox_newAdd '
          onClick={() => {

            setMyAdds(false);
            setNewAdd(true);
            setSettings(false);
            setComparePassword("")

          }}
        ><h4 className="newAdd_h4"><span className="newAdd_h4_span"> Lägg till annons</span></h4></div>
      </div>



      {props.authorized && newAdd ? (
        <div className='uploadAdd-Container'>
          <p className="newAdd--close_form" onClick={() => {
            setNewAdd(false);
            setImg("");
          }}
          >&times;
          </p>
          <h2>Ladda upp en bild</h2>
          <label className="img_label" htmlFor="addImg_input"> </label>
          <input className="img_input" id="addImg_input" type="file" name='file' placeholder="Ladda upp en bild"
            onChange={(e) => { setImg(e.target.files[0]) }}>
          </input>

          <select className='options_list' value={category} onChange={(e) =>
            setCategory(e.target.value)}>
            <option selected value> -- Välj en kategori -- </option>
            <option className='option_item' value="Målare" >Målare </option>
            <option className='option_item' value="Snickare">Snickare</option>
            <option className='option_item' value="Rörmokare">Rörmokare</option>
            <option className='option_item' value="Golvläggare">Golvläggare</option>
          </select>
          <input className='option_rubrik' value={heading} placeholder="Rubrik" onChange={(e) =>
            setHeading(e.target.value)}>
          </input>
          <textarea className='option_message' value={description} placeholder="Beskrivning"
            onChange={(e) => setDescription(e.target.value)} >
          </textarea>
          <button
            className='optionBtn '
            onClick={() => {
              uploadImage();
              handlePopUp();
              setNewAddPopup(true);

            }} >Förhandsgranska
          </button>
        </div>

      ) : null}


      {myAdds ? (
        <div className='userAddsContainer'>
          <h2 className='mina_annonser_h2'>Mina annonser</h2>
          <p className="Adds--close_form" onClick={() => {
            setMyAdds(false);
          }}
          >&times;
          </p>
          {props.authorized && useradds ? (
            useradds.map((add, id) => {
              return (
                <div className="userAdds" key={id}>
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
                      setPopUpAdds(true);
                      setNewAddPopup(false);
                    }}> mer info
                  </button>

                </div>
              );
            })) : <p>Du har inga annonser</p>}
        </div>
      ) : null}






      {props.authorized && settings ? (
        <div className='settingsBox'>
          <p className="Adds--close_form" onClick={() => {
            setSettings(false)
            setComparePassword("")
          }}>&times;
          </p>
          <form onSubmit={handleSubmit} className='test'>
            <h4 className='test_h4'>Ändra Namn och Email</h4>

            <input className='nameInput' required placeholder='Ange nytt namn' onChange={(e) => setNewName(e.target.value)}></input>
            <input className='emailInput' required type="email" placeholder='Ange ny email-adress' onChange={(e) => setNewEmail(e.target.value)}></input>
            <button className="addsBtn"
              onClick={() => {

                patch(`/myPage/${props.authorized.user.email}`, { email: newEmail })
                patch("/updateMe", { name: newName, email: newEmail })
                props.authorized.user.name = newName
                props.authorized.user.email = newEmail

              }}> Spara
            </button>
          </form>




          <form onSubmit={handleSubmit} className='test'>
            <h4 className='test_h4'>Ändra Lösenord</h4>

            <input className='nameInput' pattern="(?=.{8,}" required type="password" placeholder='Ange ditt lösenord ' onChange={(e) => setCurrentPassword(e.target.value)} ></input>
            <input className='nameInput' pattern="(?=.{8,}" required type="password" placeholder='Ange ditt nya lösenord ' onChange={(e) => setNewPassword(e.target.value)} ></input>
            <input className='nameInput' pattern="(?=.{8,}" required type="password" placeholder='Bekräfta ditt nya lösenord ' onChange={(e) => setConfirmPassword(e.target.value)} ></input>
            <button className="addsBtn"
              onClick={() => {
                patch("/updateMyPassword", {
                  password: newPassword,
                  passwordConfirm: confirmPassword,
                  passwordCurrent: currentPassword
                }).then((response) => setMessage(response.status))
                setSettings(true)
              }}> Spara
            </button>
            <p className='passwordError' style={{
              color: comparePassword === "ditt lösenord är ändrat!" ? 'green' : 'green',

            }}>{comparePassword}</p>
          </form>





        </div>
      ) : null}

      {props.authorized && settings ? (
        <button className="addsBtn" onClick={() => {
          erase(`/deleteMe/${props.authorized.user._id}`)
          routeBack()
          get("/logout")
          props.setLogginPage("");
        }}>Ta bort ditt konto</button>

      ) : null}




      <div className='blurr'
        style={{
          opacity: popUp ? '1' : '0',
          visibility: popUp ? 'visible' : 'hidden',
          zIndex: popUp ? '5' : '-5',
        }}>

        {newAddPopup ? (
          <div className='popUp'>
            <div>
              <p className="popUp--close" onClick={handlePopUp} >&times;</p>
              <img className='popUp--img' src={imageUrl}></img>
              <h1 className='popUp--title'>{heading}</h1>
              <p className='popUp--description'>{description}</p>
              <button
                className="addsBtn"
                onClick={() => {
                  post("/myPage", {
                    id: counter,
                    img: imageUrl,
                    heading: heading,
                    description: description,
                    category: category,
                    email: userEmail
                  })
                  setCounter(Date.now())
                  setImageUrl("");
                  handlePopUp();
                  setNewAdd(false)
                }}>Publicera Annons
              </button>
            </div>
          </div>
        ) : null}


        {popUpAdds ? (
          <div className="popUp">
            <div>
              <p className="popUp--close" onClick={() => {
                handlePopUp();
                setPopUpAdds(false);
                setChangeAdds(false);
                setChangeTitlePopup(titlePopup);
                setChangeDescriptionPopup(descriptionPopup);
              }} > &times;{" "}
              </p>

              <div className='update-box'>
                {changeAdds ? (
                  <div className='changeAdd_Container'>
                    <img className="popUp--img change_img" src={imageUrl}></img>
                    <div>
                      <p>{category}</p>
                      <h3 className="popUp--title">{changeTitlePopup}</h3>
                      <p className="popUp--description">{changeDescriptionPopup}</p>
                      <p>{emailPopup}</p>
                    </div>
                  </div>

                )
                  : null}
              </div>


              {changeAdds ? (
                <div className='change-box'>
                  <input className="img_input" id="addImg_input" type="file" name='file' placeholder="Ladda upp en bild" onChange={(e) => { setImg(e.target.files[0]) }}></input>
                  <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option disabled selected value> -- Välj Kategori -- </option>

                    <option value="Snickare">Snickare</option>
                    <option value="Målare">Målare</option>
                    <option value="Rörmokare">Rörmokare</option>
                    <option value="Golvläggare">Golvläggare</option>
                  </select>
                  <input type="text" placeholder="Rubrik" onChange={(e) => { setChangeTitlePopup(e.target.value) }} />
                  <textarea placeholder="Beskrivning" onChange={(e) =>
                    setChangeDescriptionPopup(e.target.value)} >
                  </textarea>
                </div>

              ) : (<div>
                <img className="popUp--img" src={imgPopup}></img>
                <p>{categoryPopup}</p>
                <h1 className="popUp--title">{titlePopup}</h1>
                <p className="popUp--description">{descriptionPopup}</p>
                <p>{emailPopup}</p>
              </div>
              )
              }


              {!changeAdds ? (
                <div>
                  <button
                    className="addsBtn"
                    onClick={() => {
                      erase(`/myAdd/${AddsIdPopup}`)
                      handlePopUp();
                      setPopUpAdds(false);
                    }}>ta bort annons
                  </button>
                  <button
                    className="addsBtn"
                    onClick={() => {
                      setChangeAdds(true)
                      setImageUrl(imgPopup)
                      setCategory(categoryPopup)

                    }}>ändra annons
                  </button>
                </div>
              ) :

                <button onClick={() => {
                  if (imageUrl !== "") {
                    put(`/updateMyAdd/${AddsIdPopup}`, {
                      img: imageUrl,
                      heading: changeTitlePopup,
                      description: changeDescriptionPopup,
                      category: category,
                      email: userEmail
                    }).then(get(`/myPage/${props.authorized.user.email}`)
                      .then((response) => setUserAdds(response.data)))
                  }
                  else {
                    put(`/updateMyAdd/${AddsIdPopup}`, {
                      heading: changeTitlePopup,
                      description: changeDescriptionPopup,
                      category: category,
                      email: userEmail
                    }).then(get(`/myPage/${props.authorized.user.email}`)
                      .then((response) => setUserAdds(response.data)))
                  }
                  handlePopUp();
                  setMyAdds(false);

                }} >Spara
                </button>
              }
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}