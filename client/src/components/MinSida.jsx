import React from 'react'
import { useState, useEffect} from 'react'
import { erase, post, put, get } from "../utility/fetchHealper"
import "./../css/Adds.css"
import "./../css/MinSida.css"
import Axios from "axios"
import {Image} from "cloudinary-react"
/* import UserAdds from './userAdds' */




export default function MinSida(props) {

  const [heading, setHeading] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0)
  const [popUp, setPopUp] = useState(false)
  const [imageUrl, setImageUrl] =useState("");
  const [userEmail, setUserEmail] = useState("");
  const [useradds, setUserAdds] = useState([]);
  const [myAdds, setMyAdds] = useState(false);
  const[newAdd, setNewAdd] = useState(false);
  const [settings, setSettings]= useState(false);
  const [newAddPopup, setNewAddPopup] = useState(false);

  const [AddsIdPopup, setAddsIdPopup] = useState("");
  const [titlePopup, setTitlePopup] = useState("");
  const [descriptionPopup, setDescriptionPopup] = useState("");
  const [emailPopup, setEmailPopup] = useState("");
  const [imgPopup, setImgPopup] = useState("");
  const [popUpAdds, setPopUpAdds] = useState(false);

  //usestate for changing add

  const [changeAdds, setChangeAdds] = useState(false);
  const [changeTitlePopup, setChangeTitlePopup]= useState(titlePopup)
  const [changeDescriptionPopup, setChangeDescriptionPopup]= useState(descriptionPopup)

  


  function showDetail(id) {
    const index = useradds[id];
    if (index == useradds[id]) {
      setTitlePopup(useradds[id].heading);
      setDescriptionPopup(useradds[id].description);
      setImgPopup(useradds[id].img);
      setEmailPopup(useradds[id].email);
      setAddsIdPopup(useradds[id]._id);

    
    }
  }
   

useEffect(()=>{
 
  if(props.authorized){
    
  get(`/myPage/${props.authorized.user.email}`).then((response)=> setUserAdds(response.data))
  console.log(useradds)
  }
  
},[])
useEffect(()=>{
 
setChangeTitlePopup(titlePopup)
  
},[titlePopup])
useEffect(()=>{
 
setChangeDescriptionPopup(descriptionPopup)
  
},[descriptionPopup])

useEffect(()=>{
 
  if(props.authorized){
    
  get(`/myPage/${props.authorized.user.email}`).then((response)=> setUserAdds(response.data))
 
  }
  
},[popUpAdds])

 useEffect(() => {
    setEmail()
    setUserAdds([])
  
  }, [props.authorized]);

//"https://api.cloudinary.com/v1_1/bexryd/image/upload"
const setEmail = ()=>{
  if(props.authorized){
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
       setImageUrl( res.data.secure_url);
    
      setLoading(false);
     
    } catch (err) {
      console.error(err);
    }
  };

/* const uploadImage = (files)=>{
  const formData = new formData();
  formData.append("file", files[0])
  formData.append("upload_preset", "Hantverkare")
 Axios.post("https://api.cloudinary.com/v1_1/bexryd/image/upload",formData).then((response)=>console.log(response))
} */
  return (

    <div>
      
      <div className='pageContainer'>
       
        <div className='userOptions'>
         
         <button className='optionBtn '
         onClick={()=>{
          get(`/myPage/${props.authorized.user.email}`).then((response)=> setUserAdds(response.data))
  
          setMyAdds(true);
          setNewAdd(false);
          setSettings(false);
         }}
       
         >Mina Annonser</button>
         <button className='optionBtn '
         onClick={()=>{
           get(`/myPage/${props.authorized.user.email}`).then((response)=> setUserAdds(response.data))
          setMyAdds(false);
          setNewAdd(false);
          setSettings(true);
         }}
         >Inställningar</button>
         <button className='optionBtn '
         onClick={()=>{
         setMyAdds(false);
          setNewAdd(true);
          setSettings(false);
         }}
         >Lägg till annons</button>
        </div>
        {newAdd?(
        <div className='uploadAdd-Container'>
            <p className="newAdd--close_form" onClick={() => {
                      setNewAdd(false);
                      setImg("");
                    }}
                    >&times; </p>
        <h2>Ladda upp en bild</h2>
        <label className="img_label" htmlFor="addImg_input">   </label>
        <input className="img_input" id="addImg_input"  type="file" name='file'  placeholder="Ladda upp en bild" onChange={(e)=>{setImg(e.target.files[0])}}></input>
       
        {loading? (<h3>Loading...</h3>):null}
       {/*  <Image style={{width:"300px"}} cloudName="bexryd" publicId="v1661432762/Hantverkare/osttz434t7pbelwvupqc.jpg"/> */}
        <input   value={heading} placeholder="Rubrik" onChange={(e) => setHeading(e.target.value)}></input>
        <textarea value={description} placeholder="Beskrivning" onChange={(e) => setDescription(e.target.value)} ></textarea>

        <button 
        
          className='optionBtn '
          onClick={() => {
          uploadImage();
          handlePopUp();
          setNewAddPopup(true);
        }} >Förhandsgranska</button>
        </div>
        ):null}
     {myAdds?(
      <div className='userAddsContainer'>
        <p className="Adds--close_form" onClick={() => {
                      setMyAdds(false);
                    }}
                    >&times; </p>
      {
      props.authorized?
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
                }}
              >
                mer info
              </button>
             
            </div>
          
        );
      }):null}
      {/* <UserAdds useradds={useradds} authorized={props.authorized}/> */}
      </div>
):null}
      



        <div className='blurr'
          style={{
            opacity: popUp ? '1' : '0',
            visibility: popUp ? 'visible' : 'hidden',
            zIndex: popUp ? '2' : '-2',

          }}

        >
          {newAddPopup?(
          <div className='popUp'>
            <div>
              <p className="popUp--close" onClick={handlePopUp} >&times; </p>
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
                  
                  email:userEmail


                })

                setCounter(Date.now())
                setImageUrl("");
                handlePopUp();
              }}
              >Publicera Annons</button>
            </div>

           
          </div>
          ):null}


        
        {popUpAdds?(
        <div className="popUp">
          <div>
            <p className="popUp--close" onClick={()=>{
              handlePopUp();
              setPopUpAdds(false);
              setChangeAdds(false);
              setChangeTitlePopup(titlePopup);
              setChangeDescriptionPopup(descriptionPopup);
               
            
            }}
              >
              &times;{" "}
            </p>
              <div className='update-box'>
            <img className="popUp--img" src={imgPopup}></img>
            {changeAdds?(
              <div>
            <h3 className="popUp--title">{changeTitlePopup}</h3>
             <p className="popUp--description">{changeDescriptionPopup}</p>
             <p>{emailPopup}</p>  
        
            
            </div>
            
            )
          :null}
          </div>
           
          
            {changeAdds?(
              <div className='change-box'>
           
            <input type="text"  placeholder="Rubrik" onChange={(e)=>setChangeTitlePopup(e.target.value)} />
            
                <textarea
                placeholder="Beskrivning" onChange={(e) => setChangeDescriptionPopup(e.target.value)} ></textarea>
                
             
            </div>
              
            ):

            (<div>
            <h1 className="popUp--title">{titlePopup}</h1>
             <p className="popUp--description">{descriptionPopup}</p>
             <p>{emailPopup}</p>  
        
             </div>
            )
             }
          
             
           {!changeAdds?(
             <div>
              <button
              className="addsBtn"

              onClick={()=>{
                 
                erase(`/myAdd/${AddsIdPopup}`)
  
                handlePopUp();
                setPopUpAdds(false);
               
                
                
              }}
              
              >ta bort annons</button>
              <button
              className="addsBtn"
              onClick={()=>setChangeAdds(true)}
              
              >ändra annons</button>
              </div>
           ):
           <button>Spara</button>

            }
            
          </div>

         
        </div>
        ):null}

        </div>




      </div>
    </div >
  )
}
