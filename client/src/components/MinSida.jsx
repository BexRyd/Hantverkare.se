import React from 'react'
import { useState } from 'react'
import { erase, post, put, get } from "../utility/fetchHealper"
import "./../css/Adds.css"
import Axios from "axios"
import {Image} from "cloudinary-react"


export default function MinSida() {

  const [heading, setHeading] = useState("")
  const [description, setDescription] = useState("")
  const [img, setImg] = useState("")
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0)
  const [popUp, setPopUp] = useState(false)
  const [imageUrl, setImageUrl] =useState("");
  


 

//"https://api.cloudinary.com/v1_1/bexryd/image/upload"

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
      <div>
        <h1>Upload image</h1>
        <input type="file" name='file'  placeholder="Ladda upp en bild" onChange={(e)=>{setImg(e.target.files[0])}}></input>
        {loading? (<h3>Loading...</h3>):null}
       {/*  <Image style={{width:"300px"}} cloudName="bexryd" publicId="v1661432762/Hantverkare/osttz434t7pbelwvupqc.jpg"/> */}
        <input value={heading} placeholder="Rubrik" onChange={(e) => setHeading(e.target.value)}></input>
        <textarea value={description} placeholder="Beskrivning" onChange={(e) => setDescription(e.target.value)} ></textarea>

        <button onClick={() => {
          uploadImage();
          handlePopUp();
        }} >Förhandsgranska</button>

        <div className='blurr'
          style={{
            opacity: popUp ? '1' : '0',
            visibility: popUp ? 'visible' : 'hidden',
            zIndex: popUp ? '2' : '-2',

          }}

        >
          <div className='popUp'>
            <div>
              <p className="popUp--close" onClick={handlePopUp} >&times; </p>
              <img className='popUp--img' src={imageUrl}></img>
              <h1 className='popUp--title'>{heading}</h1>
              <p className='popUp--description'>{description}</p>

              <button onClick={() => {
                post("http://127.0.0.1:8080/myPage", {
                  id: counter,
                  img: imageUrl,
                  heading: heading,
                  description: description,


                })

                setCounter(Date.now())
                setImageUrl("");
                handlePopUp();
              }}
              >Publicera Annons</button>
            </div>





          </div>
        </div>




      </div>
    </div >
  )
}
